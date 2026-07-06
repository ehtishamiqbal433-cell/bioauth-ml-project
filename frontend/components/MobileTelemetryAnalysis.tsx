import React from 'react';
import { MotionMetrics, TouchMetrics } from '../types';
import { Smartphone, Fingerprint, Cpu, Activity } from 'lucide-react';

interface MobileTelemetryAnalysisProps {
  motion: MotionMetrics;
  touch: TouchMetrics;
}

export const MobileTelemetryAnalysis: React.FC<MobileTelemetryAnalysisProps> = ({ motion, touch }) => {
  return (
    <div className="bg-cyber-panel border border-cyber-border rounded-xl p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h2 className="text-sm font-mono text-cyber-muted uppercase tracking-widest flex items-center gap-2">
          <Smartphone size={16} className="text-purple-400" />
          Mobile Telemetry
        </h2>
        <div className="flex items-center gap-2">
          {motion.isSimulated && (
            <span className="text-[9px] text-cyber-muted border border-cyber-border px-1.5 py-0.5 rounded hidden sm:block">SIMULATED</span>
          )}
          <div className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-1 rounded border border-purple-500/30 flex items-center gap-1">
            <Activity size={10} className="animate-pulse" /> 20Hz
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 flex-1 min-h-0 overflow-y-auto overscroll-contain pr-1">
        
        {/* Gyroscope & Accelerometer */}
        <div className="bg-cyber-bg border border-cyber-border/50 rounded-lg p-3 flex flex-col relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-bl-full blur-xl"></div>
          <h3 className="text-xs font-mono text-cyber-muted mb-2 flex items-center gap-1">
            <Activity size={12} /> Kinematic Vectors
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-[10px] font-mono text-cyber-muted mb-1">
                <span>Accel</span>
                <span className="text-purple-400">{motion.accelX.toFixed(2)}g</span>
              </div>
              <div className="w-full h-1.5 bg-cyber-panel rounded overflow-hidden flex">
                <div className="h-full bg-purple-500/50" style={{ width: `${Math.min(100, Math.abs(motion.accelX) * 10)}%` }}></div>
                <div className="h-full bg-blue-500/50" style={{ width: `${Math.min(100, Math.abs(motion.accelY) * 10)}%` }}></div>
                <div className="h-full bg-emerald-500/50" style={{ width: `${Math.min(100, Math.abs(motion.accelZ) * 10)}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-mono text-cyber-muted mb-1">
                <span>Gyro</span>
                <span className="text-purple-400">{motion.gyroAlpha.toFixed(1)}°/s</span>
              </div>
              <div className="w-full h-1.5 bg-cyber-panel rounded overflow-hidden flex">
                <div className="h-full bg-purple-400" style={{ width: `${Math.min(100, Math.abs(motion.gyroAlpha) / 3)}%` }}></div>
                <div className="h-full bg-blue-400" style={{ width: `${Math.min(100, Math.abs(motion.gyroBeta) / 3)}%` }}></div>
                <div className="h-full bg-emerald-400" style={{ width: `${Math.min(100, Math.abs(motion.gyroGamma) / 3)}%` }}></div>
              </div>
            </div>
          </div>
          <div className="text-[9px] text-cyber-muted mt-2 font-mono leading-tight">
            Tracks dominant-hand thumb swipe radius and micro-tremors.
          </div>
        </div>

        {/* Touch Pressure */}
        <div className="bg-cyber-bg border border-cyber-border/50 rounded-lg p-3 flex items-center justify-between relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-full blur-xl"></div>
          <div className="flex-1 pr-2">
            <h3 className="text-xs font-mono text-cyber-muted mb-1 flex items-center gap-1">
              <Fingerprint size={12} /> Surface Profiling
            </h3>
            <div className="text-[9px] text-cyber-muted font-mono leading-tight">
              Flags synthetic click events lacking surface-area distribution.
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex flex-col items-end gap-1">
              <div className="text-[10px] font-mono text-blue-400">F: {touch.force.toFixed(2)}</div>
              <div className="text-[10px] font-mono text-blue-400">R: {touch.radius.toFixed(1)}px</div>
            </div>
            <div className="relative w-10 h-10 rounded-full border border-cyber-border/50 flex items-center justify-center bg-cyber-panel">
              <div 
                className="absolute bg-blue-500/30 rounded-full transition-all duration-75"
                style={{ 
                  width: `${Math.min(38, Math.max(10, touch.radius))}px`, 
                  height: `${Math.min(38, Math.max(10, touch.radius))}px`,
                  transform: `scale(${1 + touch.force * 0.5})`
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* TinyML Execution */}
        <div className="bg-cyber-bg border border-cyber-border/50 rounded-lg p-3 flex items-center justify-between relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full blur-xl"></div>
          <div className="flex-1 pr-2">
            <h3 className="text-xs font-mono text-cyber-muted mb-1 flex items-center gap-1">
              <Cpu size={12} /> On-Device TinyML
            </h3>
            <div className="text-[9px] text-cyber-muted font-mono leading-tight">
              Zero network streaming. 100% local evaluation.
            </div>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <div className="flex items-end gap-1 mb-1">
              <span className="text-2xl font-bold text-emerald-400 font-mono leading-none">3.2</span>
              <span className="text-[10px] text-cyber-muted font-mono mb-0.5">ms</span>
            </div>
            <div className="text-[9px] font-mono text-emerald-500/70">
              Inference Latency
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
