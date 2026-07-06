import React, { useEffect, useRef } from 'react';
import { MouseMetrics, MousePoint } from '../types';
import { MousePointer2, Activity } from 'lucide-react';

interface MouseAnalysisProps {
  metrics: MouseMetrics;
  history: MousePoint[];
}

export const MouseAnalysis: React.FC<MouseAnalysisProps> = ({ metrics, history }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (history.length < 2) return;

    // Draw trajectory
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.8)'; // cyber-primary
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Scale coordinates to fit canvas (simple mapping for demo)
    // Assuming screen is roughly 1920x1080, canvas is 300x150
    const scaleX = canvas.width / window.innerWidth;
    const scaleY = canvas.height / window.innerHeight;

    ctx.moveTo(history[0].x * scaleX, history[0].y * scaleY);
    
    for (let i = 1; i < history.length; i++) {
      // Fade out older points
      const opacity = i / history.length;
      ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
      
      ctx.lineTo(history[i].x * scaleX, history[i].y * scaleY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(history[i].x * scaleX, history[i].y * scaleY);
    }

    // Draw current position dot
    const lastPoint = history[history.length - 1];
    ctx.beginPath();
    ctx.arc(lastPoint.x * scaleX, lastPoint.y * scaleY, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#06b6d4';
    ctx.fill();
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#06b6d4';

  }, [history]);

  return (
    <div className="bg-cyber-panel border border-cyber-border rounded-xl p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h2 className="text-sm font-mono text-cyber-muted uppercase tracking-widest flex items-center gap-2">
          <MousePointer2 size={16} className="text-cyber-secondary" />
          Mouse Trajectory Analysis
        </h2>
        <div className="flex items-center gap-1 text-xs text-cyber-accent bg-cyber-accent/10 px-2 py-1 rounded border border-cyber-accent/20">
          <Activity size={12} /> Live
        </div>
      </div>

      {/* 4-Column Grid for Wide Layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 shrink-0">
        <div className="bg-cyber-bg border border-cyber-border/50 rounded p-3">
          <div className="text-xs text-cyber-muted mb-1 font-mono">Velocity Vector</div>
          <div className="text-xl font-bold text-white font-mono">
            {metrics.velocity.toFixed(2)} <span className="text-xs text-cyber-muted">px/ms</span>
          </div>
        </div>
        <div className="bg-cyber-bg border border-cyber-border/50 rounded p-3">
          <div className="text-xs text-cyber-muted mb-1 font-mono">Jerk Analysis</div>
          <div className="text-xl font-bold text-cyber-secondary font-mono">
            {metrics.jerk.toFixed(3)} <span className="text-xs text-cyber-muted">Δa</span>
          </div>
        </div>
        <div className="bg-cyber-bg border border-cyber-border/50 rounded p-3">
          <div className="text-xs text-cyber-muted mb-1 font-mono">Curvature Profile (σ)</div>
          <div className="text-xl font-bold text-white font-mono">
            {metrics.curvature.toFixed(4)}
          </div>
        </div>
        <div className="bg-cyber-bg border border-cyber-border/50 rounded p-3 flex flex-col justify-center">
          <div className="text-xs text-cyber-muted mb-1 font-mono">Coordinates</div>
          <div className="text-lg text-cyber-primary font-mono font-bold">
            X:{Math.round(metrics.currentX)} Y:{Math.round(metrics.currentY)}
          </div>
        </div>
      </div>

      <div className="flex-1 relative bg-cyber-bg border border-cyber-border/30 rounded-lg overflow-hidden min-h-0">
        {/* Grid background for canvas */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={200} 
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute bottom-2 right-2 text-[10px] text-cyber-muted font-mono bg-cyber-bg/80 px-2 py-1 rounded border border-cyber-border/50 backdrop-blur-sm">
          Spatial Mapping Active
        </div>
      </div>
    </div>
  );
};
