import React from 'react';
import { KeyMetrics } from '../types';
import { Keyboard, Clock, Activity } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from 'recharts';

interface KeystrokeAnalysisProps {
  metrics: KeyMetrics[];
}

export const KeystrokeAnalysis: React.FC<KeystrokeAnalysisProps> = ({ metrics }) => {
  // Calculate averages
  const validDwells = metrics.filter(m => m.dwellTime !== null).map(m => m.dwellTime as number);
  const validFlights = metrics.filter(m => m.flightTime !== null).map(m => m.flightTime as number);
  
  const avgDwell = validDwells.length ? validDwells.reduce((a, b) => a + b, 0) / validDwells.length : 0;
  const avgFlight = validFlights.length ? validFlights.reduce((a, b) => a + b, 0) / validFlights.length : 0;

  // Prepare data for the chart (reverse so newest is on the right)
  const chartData = [...metrics].reverse().map((m, i) => ({
    index: i,
    key: m.key === ' ' ? 'SPC' : m.key?.length > 1 ? m.key.substring(0,3).toUpperCase() : m.key?.toUpperCase(),
    dwell: m.dwellTime || 0,
    flight: m.flightTime || 0
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-cyber-panel border border-cyber-border p-2 rounded shadow-lg text-[10px] font-mono z-50">
          <div className="text-white mb-1 border-b border-cyber-border/50 pb-1">Key: {payload[0].payload.key}</div>
          <div className="text-cyber-primary">Dwell: {payload[0].value.toFixed(0)}ms</div>
          {payload[1] && <div className="text-cyber-secondary">Flight: {payload[1].value.toFixed(0)}ms</div>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-cyber-panel border border-cyber-border rounded-xl p-5 flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between mb-3 shrink-0">
        <h2 className="text-sm font-mono text-cyber-muted uppercase tracking-widest flex items-center gap-2">
          <Keyboard size={16} className="text-cyber-primary" />
          Keystroke Dynamics
        </h2>
        <div className="flex items-center gap-1 text-xs text-cyber-primary bg-cyber-primary/10 px-2 py-1 rounded border border-cyber-primary/20">
          <Activity size={12} className="animate-pulse" /> Live
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3 shrink-0">
        <div className="bg-cyber-bg border border-cyber-border/50 rounded p-3 relative overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-1 bg-cyber-primary opacity-50"></div>
          <div className="text-xs text-cyber-muted mb-1 font-mono flex items-center gap-1">
            <Clock size={12} /> Avg Dwell
          </div>
          <div className="text-xl font-bold text-white font-mono">
            {avgDwell.toFixed(0)} <span className="text-xs text-cyber-muted">ms</span>
          </div>
        </div>
        <div className="bg-cyber-bg border border-cyber-border/50 rounded p-3 relative overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-1 bg-cyber-secondary opacity-50"></div>
          <div className="text-xs text-cyber-muted mb-1 font-mono flex items-center gap-1">
            <Clock size={12} /> Avg Flight
          </div>
          <div className="text-xl font-bold text-white font-mono">
            {avgFlight.toFixed(0)} <span className="text-xs text-cyber-muted">ms</span>
          </div>
        </div>
      </div>

      {/* Full Row Graph */}
      <div className="w-full h-20 mb-3 shrink-0 bg-cyber-bg border border-cyber-border/30 rounded-lg p-2 relative overflow-hidden">
        <div className="absolute top-1 left-2 text-[9px] font-mono text-cyber-muted z-10">TIMING GRAPH (ms)</div>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 15, right: 5, left: 5, bottom: 0 }}>
              <YAxis hide domain={['dataMin - 20', 'dataMax + 20']} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#1e3a8a', strokeWidth: 1, strokeDasharray: '3 3' }} />
              <Line type="monotone" dataKey="dwell" stroke="#06b6d4" strokeWidth={2} dot={{ r: 2, fill: '#06b6d4', strokeWidth: 0 }} activeDot={{ r: 4 }} isAnimationActive={false} />
              <Line type="monotone" dataKey="flight" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 2, fill: '#8b5cf6', strokeWidth: 0 }} activeDot={{ r: 4 }} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-cyber-muted text-xs font-mono italic">
            Awaiting keystrokes...
          </div>
        )}
      </div>

      {/* Bulletproof scrolling container */}
      <div className="flex-1 bg-cyber-bg border border-cyber-border/30 rounded-lg flex flex-col min-h-0 overflow-hidden relative">
        <div className="grid grid-cols-4 gap-2 p-2 border-b border-cyber-border/50 bg-cyber-panel/50 text-[10px] font-mono text-cyber-muted uppercase shrink-0 z-10">
          <div>Key</div>
          <div>Event</div>
          <div className="text-right">Dwell</div>
          <div className="text-right">Flight</div>
        </div>
        
        {/* Absolute inset-0 forces the scroll area to exactly fit the remaining space */}
        <div className="flex-1 relative min-h-0">
          <div className="absolute inset-0 overflow-y-auto overscroll-contain p-2 space-y-1">
            {metrics.length === 0 ? (
              <div className="h-full flex items-center justify-center text-cyber-muted text-sm font-mono italic">
                Awaiting input...
              </div>
            ) : (
              metrics.map((m, i) => (
                <div key={`${m.timestamp}-${i}`} className="grid grid-cols-4 gap-2 text-[10px] font-mono items-center p-1 hover:bg-cyber-panel rounded transition-colors">
                  <div className="text-white bg-cyber-border/30 px-1.5 py-0.5 rounded inline-block w-max text-center min-w-[20px]">
                    {m.key === ' ' ? 'SPC' : m.key?.length > 1 ? m.key.substring(0,3).toUpperCase() : m.key?.toUpperCase()}
                  </div>
                  <div className="text-cyber-primary">Captured</div>
                  <div className="text-right text-cyber-accent">{m.dwellTime !== null ? `${m.dwellTime.toFixed(0)}` : '-'}</div>
                  <div className="text-right text-cyber-secondary">{m.flightTime !== null ? `${m.flightTime.toFixed(0)}` : '-'}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
