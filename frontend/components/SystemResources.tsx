import React, { useState, useEffect } from 'react';
import { Cpu, HardDrive, Network, Activity } from 'lucide-react';

export const SystemResources: React.FC = () => {
  const [cpu, setCpu] = useState(12);
  const [ram, setRam] = useState(45);
  const [wasm, setWasm] = useState(8);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(prev => Math.max(5, Math.min(95, prev + (Math.random() * 10 - 5))));
      setRam(prev => Math.max(20, Math.min(80, prev + (Math.random() * 4 - 2))));
      setWasm(prev => Math.max(2, Math.min(30, prev + (Math.random() * 6 - 3))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-cyber-panel border border-cyber-border rounded-xl p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h2 className="text-sm font-mono text-cyber-muted uppercase tracking-widest flex items-center gap-2">
          <Cpu size={16} className="text-emerald-400" />
          Hardware Utilization
        </h2>
        <div className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">
          <Activity size={12} className="animate-pulse" /> Live
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-6">
        {/* CPU */}
        <div>
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="text-cyber-muted flex items-center gap-2"><Cpu size={14}/> Main Thread CPU</span>
            <span className="text-white">{cpu.toFixed(1)}%</span>
          </div>
          <div className="w-full h-2 bg-cyber-bg rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 transition-all duration-500" style={{ width: `${cpu}%` }}></div>
          </div>
        </div>

        {/* RAM */}
        <div>
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="text-cyber-muted flex items-center gap-2"><HardDrive size={14}/> Memory Allocation</span>
            <span className="text-white">{ram.toFixed(1)}%</span>
          </div>
          <div className="w-full h-2 bg-cyber-bg rounded-full overflow-hidden">
            <div className="h-full bg-blue-400 transition-all duration-500" style={{ width: `${ram}%` }}></div>
          </div>
        </div>

        {/* WASM */}
        <div>
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="text-cyber-muted flex items-center gap-2"><Network size={14}/> Wasm Worker Load</span>
            <span className="text-white">{wasm.toFixed(1)}%</span>
          </div>
          <div className="w-full h-2 bg-cyber-bg rounded-full overflow-hidden">
            <div className="h-full bg-purple-400 transition-all duration-500" style={{ width: `${wasm}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
