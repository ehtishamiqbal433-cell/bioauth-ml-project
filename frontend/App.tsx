import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { TrustGauge } from './components/TrustGauge';
import { MouseAnalysis } from './components/MouseAnalysis';
import { KeystrokeAnalysis } from './components/KeystrokeAnalysis';
import { ScrollAnalysis } from './components/ScrollAnalysis';
import { MobileTelemetryAnalysis } from './components/MobileTelemetryAnalysis';
import { KinematicHoneypot } from './components/KinematicHoneypot';
import { ZeroTrustGateway } from './components/ZeroTrustGateway';
import { LiveTerminal } from './components/LiveTerminal';
import { SandboxEngine } from './components/SandboxEngine';
import { ImplementationBlueprint } from './components/ImplementationBlueprint';
import { FutureModules } from './components/FutureModules';
import { EnterpriseArchitecture } from './components/EnterpriseArchitecture';
import { Glossary } from './components/Glossary';
import { MousePoint, MouseMetrics, KeyStroke, KeyMetrics, ScrollMetrics, MotionMetrics, TouchMetrics, LogEntry } from './types';
import { telemetryEngine, TelemetryPayload } from './services/ZeroTrustTelemetry';
import { RUNTIME_AUTH_CONFIG } from './securityConfig';
import { Lock, ShieldAlert, Database } from 'lucide-react';

const MAX_HISTORY = 50;
const MAX_LOGS = 100;

export default function App() {
  // Routing State
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');

  // State for UI rendering
  const [telemetryEnabled, setTelemetryEnabled] = useState(true);
  const [isOwner, setIsOwner] = useState(false); // Owner mode toggle
  const [trustScore, setTrustScore] = useState(98.5);
  const [mouseMetrics, setMouseMetrics] = useState<MouseMetrics>({ currentX: 0, currentY: 0, velocity: 0, jerk: 0, curvature: 0 });
  const [mouseHistory, setMouseHistory] = useState<MousePoint[]>([]);
  const [keyMetrics, setKeyMetrics] = useState<KeyMetrics[]>([]);
  const [scrollMetrics, setScrollMetrics] = useState<ScrollMetrics>({ momentum: 0, friction: 0, direction: 'idle' });
  const [motionMetrics, setMotionMetrics] = useState<MotionMetrics>({ accelX: 0, accelY: 0, accelZ: 0, gyroAlpha: 0, gyroBeta: 0, gyroGamma: 0, isSimulated: true });
  const [touchMetrics, setTouchMetrics] = useState<TouchMetrics>({ force: 0, radius: 0, isSynthetic: false });
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Refs for high-frequency data collection
  const rawMouseHistory = useRef<MousePoint[]>([]);
  const rawKeyMetrics = useRef<KeyMetrics[]>([]);
  const rawLogs = useRef<LogEntry[]>([]);
  
  // Biometric Half-Life tracking
  const lastActivityTime = useRef<number>(Date.now());

  // --- Routing Listener ---
  useEffect(() => {
    const onHashChange = () => setCurrentPath(window.location.hash || '#/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const addLog = useCallback((level: LogEntry['level'], source: LogEntry['source'], message: string) => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date(),
      level,
      source,
      message
    };
    rawLogs.current = [...rawLogs.current, newLog].slice(-MAX_LOGS);
  }, []);

  const handleScoreImpact = useCallback((impact: number) => {
    if (!telemetryEnabled) return;
    setTrustScore(prev => Math.min(99.9, Math.max(10, prev + impact)));
  }, [telemetryEnabled]);

  // --- Telemetry Engine Integration ---

  useEffect(() => {
    if (telemetryEnabled) {
      addLog('info', 'System', 'Initializing Zero-Trust Behavioral Biometrics Engine...');
      addLog('info', 'System', 'Establishing baseline interaction profile.');
      addLog('warn', 'System', 'Biometric Half-Life active: Trust decays without continuous input.');
      telemetryEngine.start();
      lastActivityTime.current = Date.now(); // Reset activity timer on start
    } else {
      addLog('critical', 'System', 'Bio-Telemetry Engine OFFLINE. Zero-Trust verification paused.');
      telemetryEngine.stop();
    }

    const handleTelemetryFlush = (e: Event) => {
      if (!telemetryEnabled) return;
      
      const customEvent = e as CustomEvent<TelemetryPayload>;
      const { mouseVectors, keyTimings, scrollVectors, motionVectors, touchVectors, mlConfidence } = customEvent.detail;

      // Update activity timestamp for Half-Life decay
      if (mouseVectors.length > 0 || keyTimings.length > 0 || scrollVectors.length > 0 || motionVectors.length > 0 || touchVectors.length > 0) {
        lastActivityTime.current = Date.now();
      }

      // Apply ML Confidence Score from Web Worker
      if (mlConfidence < 90) {
        setTrustScore(prev => {
          const newScore = prev * 0.9 + mlConfidence * 0.1; // Blend current score with ML confidence
          if (newScore < 75 && prev >= 75) {
            addLog('critical', 'Auth', `Local ML Model detected severe behavioral drift. Confidence dropped to ${newScore.toFixed(1)}%.`);
          }
          return Math.max(10, newScore);
        });
      }

      // Process Mouse Vectors
      if (mouseVectors.length > 0) {
        mouseVectors.forEach(v => {
          rawMouseHistory.current.push({ x: v.x, y: v.y, timestamp: v.t });
        });
        if (rawMouseHistory.current.length > MAX_HISTORY) {
          rawMouseHistory.current = rawMouseHistory.current.slice(-MAX_HISTORY);
        }
      }

      // Process Key Timings
      if (keyTimings.length > 0) {
        keyTimings.forEach(k => {
          if (k.dwellTime !== null) {
            addLog('info', 'Keyboard', `Key: ${k.key} | Dwell: ${k.dwellTime}ms | Flight: ${k.flightTime ? k.flightTime + 'ms' : 'N/A'}`);
          }
        });
        
        // Map to ensure strict type compliance and increase history limit to 50 to show scrolling
        const formattedKeys = keyTimings.map((k: any) => ({
          key: k.key,
          dwellTime: k.dwellTime,
          flightTime: k.flightTime,
          timestamp: k.timestamp || Date.now()
        }));
        
        // Prepend new keys to the history array
        rawKeyMetrics.current = [...formattedKeys.reverse(), ...rawKeyMetrics.current].slice(0, 50);
      }

      // Process Scroll Vectors
      if (scrollVectors.length > 0) {
        const totalDelta = scrollVectors.reduce((sum, v) => sum + v.deltaY, 0);
        const direction = totalDelta > 0 ? 'down' : 'up';
        const momentum = Math.abs(totalDelta) / (scrollVectors.length * 10); // Simplified momentum
        const friction = Math.random() * 0.05 + 0.01; // Simulated friction coeff

        setScrollMetrics({ momentum, friction, direction });
        addLog('info', 'Scroll', `Inertial Scroll: ${direction.toUpperCase()} | Momentum: ${momentum.toFixed(2)}`);
        
        // Reset scroll UI after a delay
        setTimeout(() => setScrollMetrics(prev => ({ ...prev, direction: 'idle' })), 500);
      }

      // Process Motion Vectors (Real device data)
      if (motionVectors.length > 0) {
        const latest = motionVectors[motionVectors.length - 1];
        setMotionMetrics({
          accelX: latest.ax, accelY: latest.ay, accelZ: latest.az,
          gyroAlpha: latest.gx, gyroBeta: latest.gy, gyroGamma: latest.gz,
          isSimulated: false
        });
      }

      // Process Touch Vectors (Real device data)
      if (touchVectors.length > 0) {
        const latest = touchVectors[touchVectors.length - 1];
        setTouchMetrics({
          force: latest.force || Math.random() * 0.5 + 0.5,
          radius: Math.max(latest.radiusX, latest.radiusY) || Math.random() * 10 + 15,
          isSynthetic: false
        });
      }
    };

    window.addEventListener('zetalyon-telemetry-flush', handleTelemetryFlush);

    return () => {
      telemetryEngine.stop();
      window.removeEventListener('zetalyon-telemetry-flush', handleTelemetryFlush);
    };
  }, [telemetryEnabled, addLog]);

  // --- UI Update & Biometric Half-Life Loop ---
  useEffect(() => {
    if (!telemetryEnabled) return; // Pause the loop entirely if telemetry is off

    const updateInterval = setInterval(() => {
      // Update Mouse Metrics
      const history = rawMouseHistory.current;
      setMouseHistory([...history]);

      if (history.length >= 2) {
        const current = history[history.length - 1];
        const prev = history[history.length - 2];
        
        const dx = current.x - prev.x;
        const dy = current.y - prev.y;
        const dt = current.timestamp - prev.timestamp;
        
        const velocity = dt > 0 ? Math.sqrt(dx*dx + dy*dy) / dt : 0;
        const jerk = Math.random() * velocity * 0.1; 
        const curvature = Math.random() * 0.5 + (velocity > 2 ? 0.5 : 0);

        setMouseMetrics({
          currentX: current.x,
          currentY: current.y,
          velocity,
          jerk,
          curvature
        });

        if (velocity > 5) {
           addLog('warn', 'Mouse', `High velocity vector detected: ${velocity.toFixed(2)} px/ms`);
        }

        // Simulate Mobile Telemetry if on desktop (based on mouse movement)
        setMotionMetrics(prev => {
          if (!prev.isSimulated) return prev;
          return {
            accelX: (dx / 10) + (Math.random() * 0.1 - 0.05),
            accelY: (dy / 10) + (Math.random() * 0.1 - 0.05),
            accelZ: 9.81 + (Math.random() * 0.2 - 0.1),
            gyroAlpha: (dx * 2) + (Math.random() * 5 - 2.5),
            gyroBeta: (dy * 2) + (Math.random() * 5 - 2.5),
            gyroGamma: Math.random() * 10 - 5,
            isSimulated: true
          };
        });

        setTouchMetrics(prev => {
          // Simulate touch pressure changes when mouse moves fast
          const targetForce = Math.min(1, 0.3 + (velocity / 20));
          return {
            force: prev.force + (targetForce - prev.force) * 0.1,
            radius: 20 + (velocity * 2),
            isSynthetic: false
          };
        });
      } else {
        // Idle simulation for mobile metrics
        setMotionMetrics(prev => {
          if (!prev.isSimulated) return prev;
          return {
            accelX: Math.random() * 0.02 - 0.01,
            accelY: Math.random() * 0.02 - 0.01,
            accelZ: 9.81 + (Math.random() * 0.05 - 0.025),
            gyroAlpha: Math.random() * 1 - 0.5,
            gyroBeta: Math.random() * 1 - 0.5,
            gyroGamma: Math.random() * 1 - 0.5,
            isSimulated: true
          };
        });
      }

      setKeyMetrics([...rawKeyMetrics.current]);
      setLogs([...rawLogs.current]);

      // --- Biometric Half-Life (Volatile Trust Decay) ---
      const idleTime = Date.now() - lastActivityTime.current;
      if (idleTime > 3000) {
        // Decay trust if idle for more than 3 seconds
        const decayRate = (idleTime / 100000); // Exponentially worse over time
        setTrustScore(prev => {
          const newScore = Math.max(10, prev - decayRate);
          if (Math.floor(prev) > Math.floor(newScore) && newScore < 80) {
            addLog('warn', 'Auth', `Biometric Half-Life decay. Trust dropping due to inactivity.`);
          }
          return newScore;
        });
      } else {
        // Recover slowly if active
        setTrustScore(prev => Math.min(99.9, prev + 0.02));
      }

    }, 100);

    return () => clearInterval(updateInterval);
  }, [telemetryEnabled, addLog]);


  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-cyber-bg text-cyber-text font-sans flex flex-col relative">
      <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
      <div className="fixed inset-0 bg-radial-glow pointer-events-none"></div>

      <Header 
        telemetryEnabled={telemetryEnabled} 
        onToggleTelemetry={() => setTelemetryEnabled(!telemetryEnabled)} 
        isOwner={isOwner}
        onToggleOwner={() => {
          setIsOwner(!isOwner);
          // If turning off owner mode while on docs page, redirect to dashboard
          if (isOwner && currentPath === '#/architecture-docs') {
            window.location.hash = '#/';
          }
        }}
        currentPath={currentPath}
      />

      {/* Added pt-24 to account for the fixed header height (h-16) + padding */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 relative z-10">
        
        {/* ROUTE: Dashboard */}
        {currentPath === '#/' && (
          <div className="animate-in fade-in duration-500 flex flex-col gap-6">
            {/* Hero Section */}
            <div className={`mb-2 border-l-4 pl-6 py-2 transition-colors duration-500 ${telemetryEnabled ? 'border-cyber-primary bg-gradient-to-r from-cyber-primary/10 to-transparent' : 'border-cyber-alert bg-gradient-to-r from-cyber-alert/10 to-transparent'}`}>
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                {telemetryEnabled ? 'Continuous Authentication Active' : 'Authentication Paused'}
              </h2>
              <p className="text-cyber-muted max-w-3xl leading-relaxed">
                Instead of checking identity once at a login portal, Zetalyon actively monitors interaction metrics to defend high-value sessions in real time. Powered by Zero-Trust principles and Behavioral Biometrics.
              </p>
            </div>

            <div className={`flex flex-col gap-6 transition-opacity duration-500 ${telemetryEnabled ? 'opacity-100' : 'opacity-50 grayscale-[50%]'}`}>
              {/* Row 1: Mouse Analysis & Trust Gauge */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 h-[350px]">
                  <MouseAnalysis metrics={mouseMetrics} history={mouseHistory} />
                </div>
                <div className="lg:col-span-4 h-[350px]">
                  <TrustGauge score={trustScore} />
                </div>
              </div>

              {/* Row 2: Scroll, Mobile, and Keystrokes */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4 h-[400px]">
                  <ScrollAnalysis metrics={scrollMetrics} />
                </div>
                <div className="lg:col-span-4 h-[400px]">
                  <MobileTelemetryAnalysis motion={motionMetrics} touch={touchMetrics} />
                </div>
                <div className="lg:col-span-4 h-[400px]">
                  <KeystrokeAnalysis metrics={keyMetrics} />
                </div>
              </div>

              {/* Row 3: Full Width Terminal */}
              <div className="w-full h-[400px]">
                <LiveTerminal 
                  logs={logs} 
                  onInjectLog={(msg) => addLog('info', 'System', msg)} 
                />
              </div>
            </div>

            {/* Advanced Features */}
            <div className={`transition-opacity duration-500 ${telemetryEnabled ? 'opacity-100' : 'opacity-50 grayscale-[50%] pointer-events-none'}`}>
              <ZeroTrustGateway trustScore={trustScore} onLog={addLog} />
              <KinematicHoneypot onLog={addLog} onScoreImpact={handleScoreImpact} />
              <SandboxEngine metrics={mouseMetrics} />
            </div>
            
            {/* New Futuristic Modules */}
            <FutureModules metrics={mouseMetrics} isOwner={isOwner} />
          </div>
        )}

        {/* ROUTE: Glossary */}
        {currentPath === '#/glossary' && (
          <Glossary />
        )}

        {/* ROUTE: Architecture Docs */}
        {currentPath === '#/architecture-docs' && (
          isOwner ? (
            <div className="animate-in fade-in duration-500">
              <ImplementationBlueprint />
              <EnterpriseArchitecture isOwner={isOwner} />
            </div>
          ) : (
            <div className="mt-12 bg-cyber-panel/50 border border-cyber-alert/50 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <ShieldAlert size={48} className="text-cyber-alert mb-4 relative z-10 animate-pulse" />
              <h3 className="text-2xl font-bold text-white mb-2 relative z-10">403: Access Denied</h3>
              <p className="text-sm text-cyber-muted max-w-lg relative z-10 mb-8">
                You have attempted to access a restricted route (<code>/architecture-docs</code>). 
                While the UI link is hidden, direct URL navigation is blocked at the routing layer.
              </p>
              
              <div className="bg-[#02040a] border border-cyber-border/50 rounded-lg p-6 text-left w-full max-w-3xl relative z-10 shadow-lg">
                <div className="flex items-center gap-2 mb-4 border-b border-cyber-border/50 pb-2">
                  <Database size={16} className="text-cyber-primary" />
                  <span className="text-xs font-mono text-cyber-primary uppercase tracking-widest">Backend Enforcement (Firestore Security Rules)</span>
                </div>
                <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                  To securely back up UI changes, unauthorized users are blocked at the database layer. A specific owner identity profile is configured inside the runtime parameters, ensuring the backend has an immutable reference point to verify requests against.
                </p>
                <pre className="text-[10px] font-mono text-emerald-400 overflow-x-auto bg-[#0d1117] p-4 rounded border border-cyber-border/30">
                  {RUNTIME_AUTH_CONFIG.firestoreRules}
                </pre>
                
                <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-cyber-muted">
                  <Lock size={12} /> Required Identity Profile: <code className="text-purple-400 bg-purple-400/10 px-1 rounded">{RUNTIME_AUTH_CONFIG.ownerIdentityProfile.role}</code> | <code className="text-blue-400 bg-blue-400/10 px-1 rounded">{RUNTIME_AUTH_CONFIG.ownerIdentityProfile.uid}</code>
                </div>
              </div>
            </div>
          )
        )}

      </main>
    </div>
  );
}
