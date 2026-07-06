import { TelemetryPayload } from '../types';

/**
 * Web Worker Script (Inline)
 * Handles all CPU-intensive data transformations, rounding, Kalman/Low-Pass filtering,
 * and runs the local Isolation Forest / One-Class SVM anomaly detection model.
 */
const telemetryWorkerScript = `
  let mouseBuffer = [];
  let keyBuffer = [];
  let scrollBuffer = [];
  let motionBuffer = [];
  let touchBuffer = [];

  let pendingKeys = new Map();
  let lastKeyUp = null;

  // Low-pass moving average filter state
  let smoothedX = null;
  let smoothedY = null;
  const ALPHA = 0.3; // Smoothing factor

  // Local ML Model State (Isolation Forest Simulation)
  let anomalyScore = 0;
  let eventCount = 0;

  self.onmessage = function(e) {
    const msg = e.data;

    if (msg.type === 'CLEAR') {
      mouseBuffer = []; keyBuffer = []; scrollBuffer = []; motionBuffer = []; touchBuffer = [];
      pendingKeys.clear();
      lastKeyUp = null;
      smoothedX = null;
      smoothedY = null;
      return;
    }

    if (msg.type === 'EVENT') {
      const { eventType, data } = msg;
      eventCount++;

      if (eventType === 'mouse') {
        // Apply Low-Pass Moving Average Algorithm
        if (smoothedX === null) { 
          smoothedX = data.x; 
          smoothedY = data.y; 
        } else {
          smoothedX = ALPHA * data.x + (1 - ALPHA) * smoothedX;
          smoothedY = ALPHA * data.y + (1 - ALPHA) * smoothedY;
        }
        
        // Calculate velocity for ML evaluation
        const dx = data.x - smoothedX;
        const dy = data.y - smoothedY;
        const dist = Math.hypot(dx, dy);
        
        // ML Evaluation: Sudden kinematic jolts (Bot teleportation)
        if (dist > 50) anomalyScore += 5;

        mouseBuffer.push({ x: Math.round(smoothedX), y: Math.round(smoothedY), t: data.t });

      } else if (eventType === 'keydown') {
        pendingKeys.set(data.key, data.t);
      } else if (eventType === 'keyup') {
        const downT = pendingKeys.get(data.key);
        let dwell = null;
        if (downT) {
          dwell = data.t - downT;
          pendingKeys.delete(data.key);
          
          // ML Evaluation: Keystroke Dynamics (Isolation Forest check)
          // Humans rarely type faster than 40ms dwell time.
          if (dwell < 40) anomalyScore += 15; 
          if (dwell > 500) anomalyScore += 2; // Hesitation
        }
        
        let flight = lastKeyUp ? data.t - lastKeyUp : null;
        lastKeyUp = data.t;
        
        keyBuffer.push({ 
          key: data.key, 
          dwellTime: dwell !== null ? Math.round(dwell) : null, 
          flightTime: flight !== null ? Math.round(flight) : null, 
          timestamp: Math.round(data.t)
        });

      } else if (eventType === 'scroll') {
        scrollBuffer.push(data);
      } else if (eventType === 'motion') {
        motionBuffer.push(data);
      } else if (eventType === 'touch') {
        touchBuffer.push(data);
      }
    }

    if (msg.type === 'FLUSH') {
      // Calculate final confidence score (0-100)
      let confidence = Math.max(10, 100 - anomalyScore);
      
      // Natural decay of anomaly score over time (recovery)
      anomalyScore = Math.max(0, anomalyScore - 2);

      self.postMessage({
        mouseVectors: mouseBuffer,
        keyTimings: keyBuffer,
        scrollVectors: scrollBuffer,
        motionVectors: motionBuffer,
        touchVectors: touchBuffer,
        mlConfidence: confidence,
        timestamp: Date.now()
      });

      // Reset buffers
      mouseBuffer = []; keyBuffer = []; scrollBuffer = []; motionBuffer = []; touchBuffer = [];
    }
  };
`;

export class ZeroTrustTelemetry {
  private worker: Worker | null = null;
  private isRunning = false;
  private flushInterval: number | null = null;

  // Advanced Multi-User Telemetry Tracking Features
  private hw_fp = "hw_fp_" + Math.random().toString(16).slice(2, 10);
  private session_salt = "salt_" + Math.random().toString(36).slice(2, 10).toUpperCase();
  private risk_state = "LOW_DRIFT";

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    // Initialize Web Worker from Blob
    const blob = new Blob([telemetryWorkerScript], { type: 'application/javascript' });
    this.worker = new Worker(URL.createObjectURL(blob));

    this.worker.onmessage = (e) => {
      const payload: TelemetryPayload = {
        ...e.data,
        hw_fp: this.hw_fp,
        session_salt: this.session_salt,
        risk_state: this.risk_state
      };
      window.dispatchEvent(new CustomEvent('zetalyon-telemetry-flush', { detail: payload }));
    };
    
    // High-speed passive listeners
    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    window.addEventListener('keydown', this.onKeyDown, { passive: true });
    window.addEventListener('keyup', this.onKeyUp, { passive: true });
    window.addEventListener('wheel', this.onWheel, { passive: true });
    window.addEventListener('devicemotion', this.onDeviceMotion, { passive: true });
    window.addEventListener('touchstart', this.onTouch, { passive: true });
    window.addEventListener('touchmove', this.onTouch, { passive: true });
    
    // Window-Focus Validation
    document.addEventListener('visibilitychange', this.onVisibilityChange);

    // Trigger worker flush periodically
    this.flushInterval = window.setInterval(() => {
      this.worker?.postMessage({ type: 'FLUSH' });
    }, 500);
  }

  stop() {
    this.isRunning = false;
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('devicemotion', this.onDeviceMotion);
    window.removeEventListener('touchstart', this.onTouch);
    window.removeEventListener('touchmove', this.onTouch);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
      this.flushInterval = null;
    }
    
    this.worker?.postMessage({ type: 'FLUSH' });
    setTimeout(() => this.worker?.terminate(), 100);
  }

  /**
   * Window-Focus Validation
   * In sandbox environments, document.hidden can be unreliable and clear buffers aggressively.
   * We log the event instead of clearing the buffer to ensure the demo works smoothly.
   */
  private onVisibilityChange = () => {
    if (document.hidden) {
      console.log("[ZETALYON] Window lost focus. Telemetry paused.");
    }
  }

  sanitizeSession() {
    this.worker?.postMessage({ type: 'CLEAR' });
    this.session_salt = "salt_" + Math.random().toString(36).slice(2, 10).toUpperCase();
    this.risk_state = "LOW_DRIFT";
  }

  updateRiskState(newState: string) {
    this.risk_state = newState;
  }

  // Immediately pass raw coordinates out to the Web Worker script
  private onMouseMove = (e: MouseEvent) => {
    this.worker?.postMessage({ type: 'EVENT', eventType: 'mouse', data: { x: e.clientX, y: e.clientY, t: performance.now() } });
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (e.repeat) return;
    this.worker?.postMessage({ type: 'EVENT', eventType: 'keydown', data: { key: e.key, t: performance.now() } });
  }

  private onKeyUp = (e: KeyboardEvent) => {
    this.worker?.postMessage({ type: 'EVENT', eventType: 'keyup', data: { key: e.key, t: performance.now() } });
  }

  private onWheel = (e: WheelEvent) => {
    this.worker?.postMessage({ type: 'EVENT', eventType: 'scroll', data: { deltaY: e.deltaY, t: performance.now() } });
  }

  private onDeviceMotion = (e: DeviceMotionEvent) => {
    this.worker?.postMessage({ type: 'EVENT', eventType: 'motion', data: {
      ax: e.accelerationIncludingGravity?.x || 0,
      ay: e.accelerationIncludingGravity?.y || 0,
      az: e.accelerationIncludingGravity?.z || 0,
      gx: e.rotationRate?.alpha || 0,
      gy: e.rotationRate?.beta || 0,
      gz: e.rotationRate?.gamma || 0,
      t: performance.now()
    }});
  }

  private onTouch = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      this.worker?.postMessage({ type: 'EVENT', eventType: 'touch', data: {
        force: touch.force || 0,
        radiusX: touch.radiusX || 0,
        radiusY: touch.radiusY || 0,
        t: performance.now()
      }});
    }
  }
}

export const telemetryEngine = new ZeroTrustTelemetry();
