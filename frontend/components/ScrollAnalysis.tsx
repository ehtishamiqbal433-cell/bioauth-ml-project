import React from 'react';
import { ScrollMetrics } from '../types';
import { Mouse, ArrowDownUp } from 'lucide-react';

interface ScrollAnalysisProps {
  metrics: ScrollMetrics;
}

export const ScrollAnalysis: React.FC<ScrollAnalysisProps> = ({ metrics }) => {
  return (
    <div className="bg-cyber-panel border border-cyber-border rounded-xl p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h2 className="text-sm font-mono text-cyber-muted uppercase tracking-widest flex items-center gap-2">
          <Mouse size={16} className="text-cyber-accent" />
          Inertial Scroll-Print
        </h2>
        <div className="text-[10px] bg-cyber-accent/10 text-cyber-accent px-2 py-1 rounded border border-cyber-accent/20">
          NEW
        </div>
      </div>

      <p className="text-xs text-cyber-muted mb-6 shrink-0">
        Analyzes the physical friction and momentum decay of the user's scroll wheel or trackpad to generate a unique hardware signature.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4 shrink-0">
        <div className="bg-cyber-bg border border-cyber-border/50 rounded p-3 relative overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-1 bg-cyber-accent opacity-50"></div>
          <div className="text-xs text-cyber-muted mb-1 font-mono">Momentum Peak</div>
          <div className="text-2xl font-bold text-white font-mono">
            {metrics.momentum.toFixed(1)} <span className="text-sm text-cyber-muted">px/s</span>
          </div>
        </div>
        <div className="bg-cyber-bg border border-cyber-border/50 rounded p-3 relative overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-1 bg-cyber-secondary opacity-50"></div>
          <div className="text-xs text-cyber-muted mb-1 font-mono">Friction Coeff (μ)</div>
          <div className="text-2xl font-bold text-white font-mono">
            {metrics.friction.toFixed(3)}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-cyber-bg border border-cyber-border/30 rounded-lg p-4 flex items-center justify-center relative overflow-hidden min-h-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="flex flex-col items-center gap-2 z-10">
          <ArrowDownUp 
            size={32} 
            className={`transition-all duration-300 ${
              metrics.direction === 'up' ? 'text-cyber-primary -translate-y-2' : 
              metrics.direction === 'down' ? 'text-cyber-secondary translate-y-2' : 
              'text-cyber-muted'
            }`} 
          />
          <span className="text-xs font-mono text-cyber-muted uppercase tracking-widest">
            {metrics.direction === 'idle' ? 'Awaiting Scroll' : `Scrolling ${metrics.direction}`}
          </span>
        </div>
      </div>
    </div>
  );
};
