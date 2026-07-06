import React, { useEffect, useRef, useState } from 'react';
import { LogEntry } from '../types';
import { Terminal, Activity, ArrowDown, Info } from 'lucide-react';

interface LiveTerminalProps {
  logs: LogEntry[];
  onInjectLog?: (msg: string) => void;
}

export const LiveTerminal: React.FC<LiveTerminalProps> = ({ logs, onInjectLog }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  useEffect(() => {
    if (scrollContainerRef.current && autoScroll) {
      // Reliably scroll to the bottom of the container if autoScroll is enabled
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [logs, autoScroll]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    // If user scrolls up more than 50px from the bottom, pause auto-scrolling
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    setAutoScroll(isAtBottom);
  };

  const scrollToBottom = () => {
    setAutoScroll(true);
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onInjectLog?.(`> ${inputValue.trim()}`);
      setInputValue('');
      scrollToBottom();
    }
  };

  const getLevelStyles = (level: string) => {
    switch (level) {
      case 'critical': 
        return 'bg-cyber-alert/20 text-cyber-alert border-cyber-alert/30';
      case 'warn': 
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: 
        return 'bg-cyber-primary/20 text-cyber-primary border-cyber-primary/30';
    }
  };

  const getLogExplanation = (msg: string): string => {
    if (msg.includes('Initializing Zero-Trust')) {
      return "BOOTSTRAP SEQUENCE: Instantiating WebAssembly (Wasm) memory buffers and attaching passive DOM event listeners (passive: true) to bypass the main UI thread. This ensures high-frequency telemetry capture (up to 120Hz) without inducing layout thrashing or frame drops.";
    }
    if (msg.includes('Establishing baseline')) {
      return "CALIBRATION PHASE: The local Isolation Forest ML model is in 'Enrollment Mode'. It requires a minimum threshold of ~200 interaction vectors (mouse trajectories, key flight times) to compute a statistically significant cryptographic signature of the current user's physical behavior.";
    }
    if (msg.includes('High velocity vector')) {
      return "KINEMATIC ANOMALY: Detected a cursor velocity exceeding the human physiological limit (typically > 5-8 px/ms depending on DPI). This is a primary indicator of programmatic cursor teleportation often utilized by Selenium, Puppeteer, or malicious overlay scripts.";
    }
    if (msg.includes('Anomalous typing speed')) {
      return "TEMPORAL ANOMALY: Key compression (Dwell Time) registered below 30ms. Human motor function rarely achieves dwell times under 50ms. This strongly correlates with automated credential stuffing or rapid payload injection via synthetic keyboard events.";
    }
    if (msg.includes('Inertial Scroll')) {
      return "HARDWARE FINGERPRINTING: Analyzing the decay curve of scroll momentum. Trackpads, physical mouse wheels, and touchscreens exhibit distinct friction coefficients (μ). Sudden changes in this coefficient during a session indicate a potential device handoff or remote access trojan (RAT) intervention.";
    }
    if (msg.includes('Biometric Half-Life')) {
      return "VOLATILE TRUST DECAY: The session trust token is degrading exponentially due to a lack of continuous biometric input. This mitigates 'walk-away' risks where an authenticated session is hijacked by a physically proximate threat actor.";
    }
    if (msg.includes('KeyDown')) {
      return "EVENT CAPTURE: Registered the initial compression phase of a keystroke. The timestamp is cached in a high-resolution Map to calculate the subsequent Dwell Time upon the KeyUp event.";
    }
    if (msg.includes('KeyUp')) {
      return "METRIC COMPUTATION: Registered key release. The engine computes Dwell Time (KeyDown to KeyUp) and Flight Time (previous KeyUp to current KeyDown). These temporal deltas are fed into the local ML model to verify the user's unique typing cadence.";
    }
    if (msg.includes('OFFLINE')) {
      return "SYSTEM OVERRIDE: The telemetry pipeline has been manually suspended. The Zero-Trust verification loop is halted, and the session trust score will remain static. Warning: This exposes the session to undetected hijacking.";
    }
    if (msg.includes('Injected kinematic perturbation')) {
      return "ACTIVE DEFENSE: A micro-shift (10-20px) was injected into the DOM element's transform matrix just prior to interaction. The system is now measuring the user's subconscious neurological correction latency to verify biological motor function.";
    }
    if (msg.includes('Superhuman correction latency')) {
      return "BOT DETECTION: The kinematic correction occurred in under 80ms. Human visual processing and motor response cannot physically react this quickly. This confirms the presence of a programmatic script executing pre-calculated coordinate clicks.";
    }
    if (msg.includes('High correction latency')) {
      return "FRICTION DETECTED: The kinematic correction took over 1000ms. This indicates either a confused human user experiencing high cognitive load, or a poorly written automation script struggling to locate the dynamically shifted target element.";
    }
    if (msg.includes('Human kinematic correction verified')) {
      return "BIOLOGICAL VERIFICATION: The kinematic correction occurred within the standard human neurological response window (150ms - 600ms). The motor-correction curve matches expected biological patterns, successfully verifying human presence.";
    }
    return "STANDARD TELEMETRY: Event captured and buffered. Data will be flushed to the local Wasm evaluation engine in the next batch cycle to continuously verify session integrity against the established biometric baseline.";
  };

  return (
    <div className="bg-[#030712] border border-cyber-border/60 rounded-xl flex flex-col h-full shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden relative group">
      {/* Terminal Header */}
      <div className="px-4 py-3 border-b border-cyber-border/40 bg-[#0a1128]/80 flex items-center justify-between backdrop-blur-sm z-10 shrink-0 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex gap-1.5 shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-600"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-600"></div>
          </div>
          <div className="h-4 w-px bg-cyber-border/50 mx-1 shrink-0"></div>
          <h2 className="text-xs font-mono text-cyber-muted flex items-center gap-2 truncate">
            <Terminal size={14} className="text-cyber-primary shrink-0" />
            <span className="truncate">/var/log/zetalyon/telemetry.log</span>
          </h2>
        </div>
        
        {autoScroll ? (
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyber-primary bg-cyber-primary/10 px-2 py-1 rounded border border-cyber-primary/20 shrink-0">
            <Activity size={10} className="animate-pulse" />
            STREAMING
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyber-muted bg-cyber-panel px-2 py-1 rounded border border-cyber-border/50 shrink-0">
            PAUSED
          </div>
        )}
      </div>
      
      {/* Terminal Body */}
      <div className="relative flex-1 overflow-hidden flex flex-col">
        {/* CRT Scanline Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10 opacity-20"></div>
        
        <div 
          ref={scrollContainerRef} 
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto overscroll-contain p-4 font-mono text-xs leading-relaxed space-y-2 z-0"
        >
          {logs.length === 0 ? (
            <div className="text-cyber-muted italic flex items-center gap-2">
              <span className="animate-pulse">_</span> Awaiting telemetry data...
            </div>
          ) : (
            logs.map((log) => {
              const explanation = getLogExplanation(log.message);
              const isExpanded = expandedLogId === log.id;
              
              return (
                <div 
                  key={log.id} 
                  onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                  className="flex flex-col p-1.5 rounded transition-colors cursor-pointer hover:bg-white/10"
                >
                  <div className="flex items-start gap-3">
                    {/* Timestamp */}
                    <span className="text-cyber-muted/70 shrink-0 mt-0.5">
                      [{log.timestamp.toISOString().substring(11, 23)}]
                    </span>
                    
                    {/* Level Badge */}
                    <span className={`shrink-0 w-16 text-center px-1 py-0.5 rounded text-[10px] font-bold tracking-wider border ${getLevelStyles(log.level)} mt-0.5`}>
                      {log.level.toUpperCase()}
                    </span>
                    
                    {/* Source */}
                    <span className="text-cyber-secondary shrink-0 w-16 mt-0.5">
                      {log.source}
                    </span>
                    
                    {/* Message */}
                    <span className={`flex-1 break-words ${isExpanded ? 'text-white font-semibold' : 'text-gray-300'}`}>
                      <span className="text-cyber-primary/50 mr-2">&gt;</span>
                      {log.message}
                      <span className="inline-block ml-2 text-cyber-primary opacity-70">
                        (Click to {isExpanded ? 'hide' : 'explain'})
                      </span>
                    </span>
                  </div>
                  
                  {/* Explanation Box */}
                  {isExpanded && (
                    <div className="mt-2 ml-[140px] p-3 bg-cyber-primary/10 border border-cyber-primary/30 rounded-lg text-cyber-primary text-[11px] animate-in fade-in slide-in-from-top-1 flex gap-2 items-start shadow-lg">
                      <Info size={14} className="shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block mb-1 text-white">SYSTEM DIAGNOSTIC:</span>
                        <span className="leading-relaxed">{explanation}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Resume Auto-scroll Button */}
        {!autoScroll && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-12 right-4 bg-cyber-bg/90 text-cyber-primary border border-cyber-primary/50 px-3 py-1.5 rounded text-xs backdrop-blur-md hover:bg-cyber-primary/20 transition-colors z-20 flex items-center gap-2 shadow-lg animate-in fade-in slide-in-from-bottom-2"
          >
            <ArrowDown size={12} />
            Resume Stream
          </button>
        )}

        {/* Terminal Input */}
        <div className="px-4 py-2 border-t border-cyber-border/40 bg-[#0a1128]/90 flex items-center gap-2 shrink-0 z-10">
          <span className="text-cyber-primary font-mono text-xs">root@zetalyon:/var/log#</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="echo 'custom event' >> telemetry.log"
            className="flex-1 bg-transparent border-none outline-none text-cyber-text font-mono text-xs placeholder-cyber-muted/50"
          />
        </div>
      </div>
    </div>
  );
};
