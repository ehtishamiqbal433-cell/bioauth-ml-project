import React, { useState } from 'react';
import { Sliders, AlertTriangle, Shield, Activity, Zap, Target, Crosshair } from 'lucide-react';
import { MouseMetrics } from '../types';

interface SandboxEngineProps {
  metrics: MouseMetrics;
}

export const SandboxEngine: React.FC<SandboxEngineProps> = ({ metrics }) => {
  const [velThreshold, setVelThreshold] = useState(5);
  const [jerkThreshold, setJerkThreshold] = useState(0.5);
  const [curvatureThreshold, setCurvatureThreshold] = useState(0.8);

  const velAlert = metrics.velocity > velThreshold;
  const jerkAlert = metrics.jerk > jerkThreshold;
  const curvatureAlert = metrics.curvature > curvatureThreshold;

  return (
    <div className="mt-12">
      <div className="mb-6 border-l-4 border-cyber-secondary pl-6 py-2 bg-gradient-to-r from-cyber-secondary/10 to-transparent">
        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Behavioral Sandbox Engine</h2>
        <p className="text-cyber-muted max-w-4xl leading-relaxed">
          To understand how these mathematical vectors translate into a real-time security score, play with the structural parameters below to simulate how threshold adjustments instantly trigger security responses.
        </p>
      </div>

      <div className="bg-cyber-panel border border-cyber-border rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-mono text-white mb-6 flex items-center gap-3">
          <Sliders className="text-cyber-secondary" />
          Security Intelligence Console
          <span className="text-[10px] bg-cyber-secondary/20 text-cyber-secondary px-2 py-0.5 rounded border border-cyber-secondary/30 animate-pulse">
            INTERACTIVE
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Velocity Control */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-sm font-mono text-cyber-muted flex items-center gap-2"><Zap size={14} className="text-cyber-primary"/> Velocity Anomaly (px/ms)</label>
              <span className="text-cyber-primary font-mono font-bold">{velThreshold.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="0.1"
              value={velThreshold}
              onChange={(e) => setVelThreshold(parseFloat(e.target.value))}
              className="w-full h-2 bg-cyber-bg rounded-lg appearance-none cursor-pointer accent-cyber-primary"
            />
            <div className={`p-3 rounded border flex items-center justify-between transition-colors ${velAlert ? 'bg-cyber-alert/10 border-cyber-alert text-cyber-alert' : 'bg-cyber-bg border-cyber-border/50 text-cyber-accent'}`}>
              <div className="flex items-center gap-2">
                <Activity size={16} />
                <span className="text-xs font-mono">Live Input: {metrics.velocity.toFixed(2)}</span>
              </div>
              {velAlert ? <AlertTriangle size={16} className="animate-pulse" /> : <Shield size={16} />}
            </div>
          </div>

          {/* Jerk Control */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-sm font-mono text-cyber-muted flex items-center gap-2"><Target size={14} className="text-cyber-secondary"/> Jerk Sensitivity (Δa)</label>
              <span className="text-cyber-secondary font-mono font-bold">{jerkThreshold.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.05"
              value={jerkThreshold}
              onChange={(e) => setJerkThreshold(parseFloat(e.target.value))}
              className="w-full h-2 bg-cyber-bg rounded-lg appearance-none cursor-pointer accent-cyber-secondary"
            />
            <div className={`p-3 rounded border flex items-center justify-between transition-colors ${jerkAlert ? 'bg-cyber-alert/10 border-cyber-alert text-cyber-alert' : 'bg-cyber-bg border-cyber-border/50 text-cyber-accent'}`}>
              <div className="flex items-center gap-2">
                <Activity size={16} />
                <span className="text-xs font-mono">Live Input: {metrics.jerk.toFixed(3)}</span>
              </div>
              {jerkAlert ? <AlertTriangle size={16} className="animate-pulse" /> : <Shield size={16} />}
            </div>
          </div>

          {/* Curvature Control */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-sm font-mono text-cyber-muted flex items-center gap-2"><Crosshair size={14} className="text-purple-400"/> Curvature Profile (σ)</label>
              <span className="text-purple-400 font-mono font-bold">{curvatureThreshold.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.05"
              value={curvatureThreshold}
              onChange={(e) => setCurvatureThreshold(parseFloat(e.target.value))}
              className="w-full h-2 bg-cyber-bg rounded-lg appearance-none cursor-pointer accent-purple-400"
            />
            <div className={`p-3 rounded border flex items-center justify-between transition-colors ${curvatureAlert ? 'bg-cyber-alert/10 border-cyber-alert text-cyber-alert' : 'bg-cyber-bg border-cyber-border/50 text-cyber-accent'}`}>
              <div className="flex items-center gap-2">
                <Activity size={16} />
                <span className="text-xs font-mono">Live Input: {metrics.curvature.toFixed(3)}</span>
              </div>
              {curvatureAlert ? <AlertTriangle size={16} className="animate-pulse" /> : <Shield size={16} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
