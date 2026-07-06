import React, { useState, useRef, useEffect } from 'react';
import { Target, Crosshair, ShieldAlert } from 'lucide-react';

interface KinematicHoneypotProps {
  onLog: (level: 'info'|'warn'|'critical', source: 'Decoy', msg: string) => void;
  onScoreImpact: (impact: number) => void;
}

export const KinematicHoneypot: React.FC<KinematicHoneypotProps> = ({ onLog, onScoreImpact }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPerturbed, setIsPerturbed] = useState(false);
  const [metrics, setMetrics] = useState({ latency: 0, botProb: 0 });
  
  const perturbationTime = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPerturbed || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

    // If mouse gets within 100px, trigger perturbation (micro-shift)
    if (dist < 100 && dist > 20) {
      const shiftX = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 15 + 10);
      const shiftY = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 15 + 10);
      
      setOffset({ x: shiftX, y: shiftY });
      setIsPerturbed(true);
      perturbationTime.current = performance.now();
      onLog('info', 'Decoy', `Injected kinematic perturbation: Δx:${shiftX.toFixed(0)} Δy:${shiftY.toFixed(0)}`);
    }
  };

  const handleClick = () => {
    if (!isPerturbed) return;

    const latency = performance.now() - perturbationTime.current;
    let botProb = 0;

    // Humans take 150ms - 600ms to subconsciously correct a 20px shift.
    // Bots/Scripts click instantly or fail to correct.
    if (latency < 80) {
      botProb = 99; // Superhuman speed = Bot
      onLog('critical', 'Decoy', `Superhuman correction latency (${latency.toFixed(0)}ms). Bot detected.`);
      onScoreImpact(-30);
    } else if (latency > 1000) {
      botProb = 40; // Very slow = Confused human or bad script
      onLog('warn', 'Decoy', `High correction latency (${latency.toFixed(0)}ms).`);
      onScoreImpact(-5);
    } else {
      botProb = 2; // Normal human
      onLog('info', 'Decoy', `Human kinematic correction verified (${latency.toFixed(0)}ms).`);
      onScoreImpact(5);
    }

    setMetrics({ latency, botProb });
    
    // Reset after a delay
    setTimeout(() => {
      setOffset({ x: 0, y: 0 });
      setIsPerturbed(false);
    }, 2000);
  };

  return (
    <div className="mt-6 bg-cyber-panel border border-cyber-border rounded-xl p-6 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-cyber-alert text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg z-20">
        ADVANCED FEATURE
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h3 className="text-lg font-mono text-white mb-2 flex items-center gap-2">
            <Target className="text-cyber-alert" />
            Kinematic Perturbation Decoy
          </h3>
          <p className="text-sm text-cyber-muted leading-relaxed mb-4">
            This module injects invisible micro-shifts (10-20px) into UI elements just before interaction. 
            It measures the user's subconscious neurological correction latency. Static bot scripts fail to correct, 
            while humans exhibit a specific, verifiable motor-correction curve.
          </p>
          
          <div className="flex gap-4">
            <div className="bg-cyber-bg border border-cyber-border/50 rounded p-3 flex-1">
              <div className="text-xs text-cyber-muted mb-1 font-mono">Correction Latency</div>
              <div className="text-xl font-bold text-white font-mono">
                {metrics.latency > 0 ? metrics.latency.toFixed(0) : '--'} <span className="text-xs text-cyber-muted">ms</span>
              </div>
            </div>
            <div className="bg-cyber-bg border border-cyber-border/50 rounded p-3 flex-1">
              <div className="text-xs text-cyber-muted mb-1 font-mono">Bot Probability</div>
              <div className={`text-xl font-bold font-mono ${metrics.botProb > 50 ? 'text-cyber-alert' : 'text-cyber-accent'}`}>
                {metrics.latency > 0 ? metrics.botProb : '--'} <span className="text-xs text-cyber-muted">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-72 h-48 bg-[#02040a] border border-cyber-border/30 rounded-lg relative flex items-center justify-center overflow-hidden" onMouseMove={handleMouseMove}>
          <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
          
          {/* The Decoy Button */}
          <button
            ref={containerRef}
            onClick={handleClick}
            style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
            className="relative z-10 bg-cyber-primary/20 hover:bg-cyber-primary/30 border border-cyber-primary text-cyber-primary font-mono text-sm px-6 py-3 rounded transition-transform duration-75 flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          >
            <Crosshair size={16} />
            AUTHORIZE
          </button>

          {isPerturbed && (
            <div className="absolute top-2 left-2 text-[9px] font-mono text-cyber-alert animate-pulse flex items-center gap-1">
              <ShieldAlert size={10} /> PERTURBATION ACTIVE
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
