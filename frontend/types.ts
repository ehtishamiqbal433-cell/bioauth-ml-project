export interface MousePoint {
  x: number;
  y: number;
  timestamp: number;
}

export interface MouseMetrics {
  currentX: number;
  currentY: number;
  velocity: number; // px/ms
  jerk: number; // rate of acceleration change
  curvature: number; // deviation from straight line
}

export interface KeyStroke {
  key: string;
  type: 'down' | 'up';
  timestamp: number;
}

export interface KeyMetrics {
  key: string;
  dwellTime: number | null; // ms key was held
  flightTime: number | null; // ms since last key release
  timestamp: number;
}

export interface ScrollPoint {
  deltaY: number;
  timestamp: number;
}

export interface ScrollMetrics {
  momentum: number;
  friction: number;
  direction: 'up' | 'down' | 'idle';
}

export interface MotionMetrics {
  accelX: number;
  accelY: number;
  accelZ: number;
  gyroAlpha: number;
  gyroBeta: number;
  gyroGamma: number;
  isSimulated: boolean;
}

export interface TouchMetrics {
  force: number;
  radius: number;
  isSynthetic: boolean;
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'info' | 'warn' | 'critical';
  source: 'System' | 'Mouse' | 'Keyboard' | 'Auth' | 'Scroll' | 'Decoy' | 'Mobile' | 'Gateway';
  message: string;
}

export interface TelemetryPayload {
  mouseVectors: any[];
  keyTimings: any[];
  scrollVectors: any[];
  motionVectors: any[];
  touchVectors: any[];
  mlConfidence: number;
  timestamp: number;
  hw_fp: string;
  session_salt: string;
  risk_state: string;
}
