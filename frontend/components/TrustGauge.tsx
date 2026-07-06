import React from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

interface TrustGaugeProps {
  score: number;
}

export const TrustGauge: React.FC<TrustGaugeProps> = ({ score }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  const isHighRisk = score < 60;
  const colorClass = isHighRisk ? 'text-cyber-alert' : 'text-cyber-accent';
  const glowClass = isHighRisk ? 'shadow-neon-alert' : 'shadow-neon';

  return (
    <div className="bg-cyber-panel border border-cyber-border rounded-xl p-6 relative overflow-hidden h-full flex flex-col justify-between">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-primary to-transparent opacity-30"></div>
      
      <h2 className="text-sm font-mono text-cyber-muted uppercase tracking-widest flex items-center gap-2 shrink-0">
        Identity Confidence
      </h2>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        <svg className="transform -rotate-90 w-40 h-40">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-cyber-bg"
          />
          {/* Progress circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`${colorClass} transition-all duration-500 ease-out`}
            style={{ filter: `drop-shadow(0 0 8px ${isHighRisk ? '#ef4444' : '#10b981'})` }}
          />
        </svg>
        
        <div className="absolute flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold font-mono ${colorClass}`}>
            {score.toFixed(1)}<span className="text-lg">%</span>
          </span>
          <span className="text-xs text-cyber-muted mt-1">TRUST SCORE</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center shrink-0">
        <div className="bg-cyber-bg rounded p-2 border border-cyber-border/50">
          <div className="text-xs text-cyber-muted mb-1">Status</div>
          <div className={`text-sm font-bold flex items-center justify-center gap-1 ${colorClass}`}>
            {isHighRisk ? <ShieldAlert size={14} /> : <ShieldCheck size={14} />}
            {isHighRisk ? 'ELEVATED RISK' : 'VERIFIED'}
          </div>
        </div>
        <div className="bg-cyber-bg rounded p-2 border border-cyber-border/50">
          <div className="text-xs text-cyber-muted mb-1">Action</div>
          <div className="text-sm font-bold text-cyber-primary">MONITORING</div>
        </div>
      </div>
    </div>
  );
};
