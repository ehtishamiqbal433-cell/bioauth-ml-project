import React, { useState, useEffect } from 'react';
import { Network, BrainCircuit, LockKeyhole, MonitorSmartphone, Server, Laptop, ArrowRight, Zap, EyeOff, LayoutDashboard, Activity, ShieldCheck, Wifi, Database, SplitSquareHorizontal, Sliders, MonitorPlay, ChevronLeft, Play, Layers, SlidersHorizontal, Key } from 'lucide-react';
import { MouseMetrics } from '../types';
import { AdvancedAIModules } from './AdvancedAIModules';
import { SystemResources } from './SystemResources';

interface FutureModulesProps {
  metrics: MouseMetrics;
}

export const FutureModules: React.FC<FutureModulesProps> = ({ metrics }) => {
  // State for P2P Mesh
  const [peers, setPeers] = useState(1);
  const serverLoad = peers === 1 ? 100 : Math.max(5, 100 - (peers * 2.5));
  const localLoad = peers === 1 ? 0 : Math.min(95, peers * 2.5);

  // State for Cognitive UI
  const [isFrustrated, setIsFrustrated] = useState(false);
  
  useEffect(() => {
    if (metrics.jerk > 1.2 || metrics.velocity > 8) {
      setIsFrustrated(true);
      const timer = setTimeout(() => setIsFrustrated(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [metrics]);

  // State for Context-Aware Tokens
  const [isGenerating, setIsGenerating] = useState(false);
  const [tokenString, setTokenString] = useState<string>('Awaiting generation...');
  const [decodedPayload, setDecodedPayload] = useState<string>('// Decoded payload will appear here');

  const handleGenerateToken = () => {
    setIsGenerating(true);
    setTokenString('ENCRYPTING CONTEXT...');
    setDecodedPayload('// Decrypting...');
    
    setTimeout(() => {
      const epk = Math.floor(Math.random() * 9000) + 1000;
      const blob = Array.from({length: 24}, () => Math.floor(Math.random()*16).toString(16)).join('');
      setTokenString(`ZETA-v2-${epk}-${blob}`);
      
      const payloadObj = {
        "alg": "EdDSA",
        "typ": "ZETA+JWT",
        "payload": {
          "iss": "zetalyon-auth-engine",
          "sub": "usr_01J2K9AX8R",
          "sid": "8F9A3E7B2C1D0F4A",
          "device_fingerprint": "8a3cf82d1",
          "risk_baseline_version": "v2.4.1-alpha",
          "auth_level": "LOA3"
        }
      };
      setDecodedPayload(JSON.stringify(payloadObj, null, 2));
      setIsGenerating(false);
    }, 1200);
  };

  // State for Multi-Tab
  const [monitors, setMonitors] = useState(1);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  
  const [wsColor, setWsColor] = useState<'purple' | 'blue' | 'emerald'>('purple');
  const [wsEffect, setWsEffect] = useState<'none' | 'pulse' | 'sepia' | 'invert'>('none');

  const toggleMonitors = () => {
    if (monitors === 1) {
      setMonitors(3);
    } else {
      setMonitors(1);
      setActiveTab(null);
    }
  };

  const cycleColor = () => {
    const colors: ('purple' | 'blue' | 'emerald')[] = ['purple', 'blue', 'emerald'];
    setWsColor(colors[(colors.indexOf(wsColor) + 1) % colors.length]);
  };

  const cycleEffect = () => {
    const effects: ('none' | 'pulse' | 'sepia' | 'invert')[] = ['none', 'pulse', 'sepia', 'invert'];
    setWsEffect(effects[(effects.indexOf(wsEffect) + 1) % effects.length]);
  };

  const themeMap = {
    purple: { border: 'border-purple-500/50', text: 'text-purple-400', bg: 'bg-purple-500/10', shadow: 'shadow-[0_0_10px_rgba(168,85,247,0.1)]', hover: 'hover:border-purple-400 hover:bg-purple-500/10' },
    blue: { border: 'border-blue-500/50', text: 'text-blue-400', bg: 'bg-blue-500/10', shadow: 'shadow-[0_0_10px_rgba(59,130,246,0.1)]', hover: 'hover:border-blue-400 hover:bg-blue-500/10' },
    emerald: { border: 'border-emerald-500/50', text: 'text-emerald-400', bg: 'bg-emerald-500/10', shadow: 'shadow-[0_0_10px_rgba(16,185,129,0.1)]', hover: 'hover:border-emerald-400 hover:bg-emerald-500/10' },
  };

  const currentTheme = themeMap[wsColor];
  const effectClass = wsEffect === 'pulse' ? 'animate-pulse' : wsEffect === 'sepia' ? 'sepia' : wsEffect === 'invert' ? 'invert' : '';

  return (
    <div className="mt-16 space-y-12">
      <div className="border-l-4 border-cyber-primary pl-6 py-2 bg-gradient-to-r from-cyber-primary/10 to-transparent">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Next-Generation Web Capabilities</h2>
        <p className="text-cyber-muted max-w-4xl leading-relaxed">
          Experimental modules pushing the boundaries of browser architecture, cryptography, and empathetic design.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          {/* 1. Local Network P2P */}
          <div className="bg-cyber-panel border border-cyber-border rounded-xl p-6 shadow-lg relative overflow-hidden group h-full">
            <div className="absolute top-0 right-0 bg-cyber-primary/20 text-cyber-primary text-[10px] font-bold px-3 py-1 rounded-bl-lg border-b border-l border-cyber-primary/30">
              MODULE 01
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <Network className="text-cyber-primary" />
                  Local Network P2P Asset Streaming
                </h3>
                <h4 className="text-sm font-mono text-cyber-primary mb-4">The "Zero-Bandwidth" Multi-User Sync</h4>
                <p className="text-sm text-cyber-muted leading-relaxed mb-4">
                  Currently, if 50 people in the exact same office building open the same media-heavy website, all 50 devices individually fetch the exact same heavy assets over the building's internet gateway.
                </p>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  <strong className="text-white">The Feature:</strong> A website that detects local network proximity via WebRTC/WebTransport to orchestrate an automatic localized peer-to-peer mesh network. When User 2-50 open the site, the service worker fetches 90% of assets directly from User 1 over local LAN at gigabit speed.
                </p>
                <p className="text-sm text-cyber-accent leading-relaxed">
                  <strong className="text-white">Why it's revolutionary:</strong> Slashes global CDN costs, allows instant loading in crowded venues, and keeps web apps functional locally even if the building loses outbound internet.
                </p>
              </div>
              
              {/* Interactive Demo */}
              <div className="w-full lg:w-96 bg-[#02040a] border border-cyber-border/50 rounded-lg p-5 flex flex-col">
                <div className="text-xs font-mono text-cyber-muted mb-4 flex justify-between items-center">
                  <span>Active Local Nodes: {peers} <span className="text-[9px] text-cyber-primary ml-2 opacity-70">(Drag slider to adjust)</span></span>
                  <Wifi size={14} className={peers > 1 ? 'text-cyber-accent animate-pulse' : 'text-cyber-muted'} />
                </div>
                <input 
                  type="range" min="1" max="50" value={peers} 
                  onChange={(e) => setPeers(parseInt(e.target.value))}
                  className="w-full h-1 bg-cyber-bg rounded-lg appearance-none cursor-pointer accent-cyber-primary mb-4"
                />
                
                {/* Node Visualization */}
                <div className="flex flex-wrap gap-1 mb-4 p-2 bg-cyber-bg rounded border border-cyber-border/30 min-h-[40px] content-start">
                  {Array.from({ length: peers }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyber-accent" style={{ opacity: Math.random() * 0.5 + 0.5, animation: `pulse ${1 + Math.random()}s infinite` }}></div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4 text-xs font-mono">
                  <div className="bg-cyber-bg p-2 rounded border border-cyber-border/50">
                    <div className="text-cyber-muted mb-1">Bandwidth Saved</div>
                    <div className="text-cyber-accent">{((peers - 1) * 4.2).toFixed(1)} GB</div>
                  </div>
                  <div className="bg-cyber-bg p-2 rounded border border-cyber-border/50">
                    <div className="text-cyber-muted mb-1">Mesh Latency</div>
                    <div className="text-cyber-accent">{Math.max(2, 15 - peers * 0.2).toFixed(1)} ms</div>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-center gap-4">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-cyber-alert flex items-center gap-1"><Server size={12}/> Cloud Egress Load</span>
                      <span className="text-cyber-alert">{serverLoad.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 bg-cyber-bg rounded-full overflow-hidden">
                      <div className="h-full bg-cyber-alert transition-all duration-500" style={{ width: `${serverLoad}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-cyber-accent flex items-center gap-1"><Network size={12}/> Local Mesh Transfer</span>
                      <span className="text-cyber-accent">{localLoad.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 bg-cyber-bg rounded-full overflow-hidden">
                      <div className="h-full bg-cyber-accent transition-all duration-500" style={{ width: `${localLoad}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4">
          <SystemResources />
        </div>
      </div>

      {/* 2. Ephemeral Cognitive UI */}
      <div className="bg-cyber-panel border border-cyber-border rounded-xl p-6 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 bg-cyber-secondary/20 text-cyber-secondary text-[10px] font-bold px-3 py-1 rounded-bl-lg border-b border-l border-cyber-secondary/30">
          MODULE 02
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <BrainCircuit className="text-cyber-secondary" />
              Ephemeral Cognitive UI
            </h3>
            <h4 className="text-sm font-mono text-cyber-secondary mb-4">Frustration-Based Interface Morphing</h4>
            <p className="text-sm text-cyber-muted leading-relaxed mb-4">
              Most current UX layouts adapt statically to screen sizes. This feature introduces a fluid layout engine governed entirely by real-time behavioral user stress or hesitation.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              <strong className="text-white">The Feature:</strong> A dynamic layout engine running via WebAssembly that monitors friction signals: rapid micro-mouse loops, erratic scrolling, or repeated unsuccessful taps. If high friction is detected, the website actively strips out secondary elements and morphs into a singular conversational layout.
            </p>
            <p className="text-sm text-cyber-accent leading-relaxed">
              <strong className="text-white">Why it's revolutionary:</strong> Shifts web design from a passive layout to an empathetic, active system that lowers cognitive load when it senses human frustration.
            </p>
          </div>
          
          {/* Interactive Demo */}
          <div className="w-full lg:w-96 bg-[#02040a] border border-cyber-border/50 rounded-lg p-5 relative overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4 z-10">
              <span className="text-xs font-mono text-cyber-muted">Live UI State</span>
              <button 
                onClick={() => setIsFrustrated(!isFrustrated)}
                className={`text-[10px] font-mono px-2 py-1 rounded border transition-colors ${isFrustrated ? 'bg-cyber-alert/20 text-cyber-alert border-cyber-alert/50' : 'bg-cyber-bg text-cyber-muted border-cyber-border'}`}
              >
                {isFrustrated ? 'FRUSTRATION DETECTED' : 'SIMULATE FRUSTRATION'}
              </button>
            </div>
            
            <div className="flex-1 bg-cyber-bg border border-cyber-border/30 rounded relative overflow-hidden min-h-[220px] transition-all duration-500">
              {/* Complex UI Elements (Fade out when frustrated) */}
              <div className={`absolute inset-0 p-4 flex flex-col gap-2 transition-all duration-500 ${isFrustrated ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
                <div className="flex gap-2">
                  <div className="h-6 bg-cyber-panel rounded flex-1"></div>
                  <div className="h-6 bg-cyber-panel rounded flex-1"></div>
                </div>
                <div className="h-20 bg-cyber-panel rounded w-full mt-2"></div>
                <div className="flex gap-2 mt-2">
                  <div className="h-4 w-4 bg-cyber-panel rounded"></div>
                  <div className="h-4 bg-cyber-panel rounded w-24"></div>
                </div>
                <div className="flex gap-2 mt-auto">
                  <div className="h-8 bg-cyber-border/50 rounded flex-1"></div>
                  <div className="h-8 bg-cyber-secondary/50 rounded flex-1"></div>
                </div>
              </div>

              {/* Simple UI Element (Scales up when frustrated) */}
              <div className={`absolute inset-0 p-4 flex flex-col items-center justify-center z-10 transition-all duration-700 ${isFrustrated ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}>
                <div className="text-cyber-secondary mb-4"><BrainCircuit size={32} className="animate-pulse" /></div>
                <div className="text-sm font-bold text-white mb-2 text-center">Let's simplify this.</div>
                <div className="text-xs text-cyber-muted text-center mb-4">What exactly are you trying to find?</div>
                <input type="text" placeholder="Type here..." className="w-full bg-[#02040a] border border-cyber-secondary/50 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-cyber-secondary" disabled={!isFrustrated} />
              </div>
            </div>
            <div className="text-[9px] text-cyber-muted mt-3 text-center font-mono">
              *Try shaking your mouse rapidly to trigger auto-morph.
            </div>
          </div>
        </div>
      </div>

      {/* 4. Multi-Tab Core Orchestration */}
      <div className="bg-cyber-panel border border-cyber-border rounded-xl p-6 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 bg-purple-500/20 text-purple-400 text-[10px] font-bold px-3 py-1 rounded-bl-lg border-b border-l border-purple-500/30">
          MODULE 04
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <SplitSquareHorizontal className={currentTheme.text} />
              Multi-Tab Core Orchestration
            </h3>
            <h4 className={`text-sm font-mono mb-4 ${currentTheme.text}`}>The Multi-Display Web Engine</h4>
            <p className="text-sm text-cyber-muted leading-relaxed mb-4">
              Web browsers strictly isolate tabs from each other. If you open a web app across three different monitor tabs, they run as three isolated, clunky instances competing for your system memory.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              <strong className="text-white">The Feature:</strong> An active orchestration layer utilizing SharedWorkers and BroadcastChannel APIs that merges independent browser tabs into a single unified multi-monitor console.
            </p>
            <p className={`text-sm leading-relaxed ${currentTheme.text}`}>
              <strong className="text-white">Why it's revolutionary:</strong> When you pull a tab onto a second monitor, Tab 1 transforms into a timeline, Tab 2 becomes a preview monitor, and Tab 3 assumes control as a tools panel. It treats the web browser as an advanced multi-display desktop application environment.
            </p>
          </div>
          
          {/* Interactive Demo */}
          <div className={`w-full lg:w-96 bg-[#02040a] border border-cyber-border/50 rounded-lg p-5 flex flex-col min-h-[250px] transition-all duration-500 ${effectClass}`}>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono text-cyber-muted">Workspace Topology</span>
              <button 
                onClick={toggleMonitors}
                className={`text-[10px] font-mono px-3 py-1.5 rounded border transition-colors flex items-center gap-2 ${currentTheme.border} ${currentTheme.text} ${currentTheme.hover}`}
              >
                <MonitorSmartphone size={12} />
                {monitors === 1 ? 'DETECT DISPLAYS' : 'MERGE TO SINGLE'}
              </button>
            </div>
            
            <div className="flex-1 relative overflow-hidden">
              {/* Single Monitor View */}
              <div className={`absolute inset-0 bg-cyber-bg border border-cyber-border/50 rounded flex flex-col items-center justify-center transition-all duration-500 ${monitors === 3 ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
                <div className="flex gap-1 mb-3">
                  <div className={`w-8 h-1 rounded ${currentTheme.bg}`}></div>
                  <div className={`w-8 h-1 rounded ${currentTheme.bg}`}></div>
                  <div className={`w-8 h-1 rounded ${currentTheme.bg}`}></div>
                </div>
                <LayoutDashboard size={24} className={`${currentTheme.text} mb-2`} />
                <span className="text-[10px] font-mono text-center px-2 text-cyber-muted">
                  Unified Workspace (Cluttered)
                </span>
              </div>
              
              {/* Multi Monitor View (Overview) */}
              <div className={`absolute inset-0 flex gap-2 transition-all duration-500 ${monitors === 3 && activeTab === null ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}>
                {/* Tab 1 Button */}
                <button 
                  onClick={() => setActiveTab(1)}
                  className={`flex-1 bg-cyber-bg border rounded flex flex-col items-center justify-center p-2 transition-all group cursor-pointer ${currentTheme.border} ${currentTheme.shadow} ${currentTheme.hover}`}
                >
                  <SplitSquareHorizontal size={18} className={`${currentTheme.text} mb-2 group-hover:scale-110 transition-transform`} />
                  <span className={`text-[9px] font-mono text-center leading-tight ${currentTheme.text}`}>Timeline<br/>Orchestrator</span>
                  <span className={`text-[8px] mt-2 opacity-0 group-hover:opacity-100 transition-opacity ${currentTheme.text}`}>CLICK TO VIEW</span>
                </button>
                
                {/* Tab 2 Button */}
                <button 
                  onClick={() => setActiveTab(2)}
                  className={`flex-1 bg-cyber-bg border rounded flex flex-col items-center justify-center p-2 transition-all group cursor-pointer ${currentTheme.border} ${currentTheme.shadow} ${currentTheme.hover}`}
                >
                  <MonitorPlay size={18} className={`${currentTheme.text} mb-2 group-hover:scale-110 transition-transform`} />
                  <span className={`text-[9px] font-mono text-center leading-tight ${currentTheme.text}`}>Dedicated<br/>Preview</span>
                  <span className={`text-[8px] mt-2 opacity-0 group-hover:opacity-100 transition-opacity ${currentTheme.text}`}>CLICK TO VIEW</span>
                </button>
                
                {/* Tab 3 Button */}
                <button 
                  onClick={() => setActiveTab(3)}
                  className={`flex-1 bg-cyber-bg border rounded flex flex-col items-center justify-center p-2 transition-all group cursor-pointer ${currentTheme.border} ${currentTheme.shadow} ${currentTheme.hover}`}
                >
                  <SlidersHorizontal size={18} className={`${currentTheme.text} mb-2 group-hover:scale-110 transition-transform`} />
                  <span className={`text-[9px] font-mono text-center leading-tight ${currentTheme.text}`}>Tools &<br/>Settings</span>
                  <span className={`text-[8px] mt-2 opacity-0 group-hover:opacity-100 transition-opacity ${currentTheme.text}`}>CLICK TO VIEW</span>
                </button>
              </div>

              {/* Detailed Views */}
              
              {/* Tab 1 Detail: Timeline */}
              <div className={`absolute inset-0 bg-cyber-bg border rounded p-3 flex flex-col transition-all duration-300 ${currentTheme.border} ${activeTab === 1 ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'}`}>
                <div className={`flex justify-between items-center mb-3 border-b pb-2 ${currentTheme.border}`}>
                  <button onClick={() => setActiveTab(null)} className={`hover:opacity-80 flex items-center gap-1 text-[10px] font-mono ${currentTheme.text}`}>
                    <ChevronLeft size={14}/> Back
                  </button>
                  <span className={`text-[10px] font-mono flex items-center gap-1 ${currentTheme.text}`}><SplitSquareHorizontal size={12}/> Tab 1: Timeline</span>
                </div>
                <div className="flex-1 flex flex-col gap-2 justify-center relative">
                  <div className={`w-full h-4 rounded relative overflow-hidden ${currentTheme.bg}`}>
                    <div className={`absolute left-4 top-0 bottom-0 w-24 rounded opacity-50 ${currentTheme.bg.replace('/10', '')}`}></div>
                  </div>
                  <div className={`w-full h-4 rounded relative overflow-hidden ${currentTheme.bg}`}>
                    <div className={`absolute left-12 top-0 bottom-0 w-32 rounded opacity-50 ${currentTheme.bg.replace('/10', '')}`}></div>
                  </div>
                  <div className={`w-full h-4 rounded relative overflow-hidden ${currentTheme.bg}`}>
                    <div className={`absolute left-2 top-0 bottom-0 w-16 rounded opacity-50 ${currentTheme.bg.replace('/10', '')}`}></div>
                  </div>
                  {/* Animated Playhead */}
                  <div className="absolute top-0 bottom-0 w-px bg-red-500 shadow-[0_0_5px_red] animate-playhead z-20"></div>
                </div>
              </div>

              {/* Tab 2 Detail: Preview */}
              <div className={`absolute inset-0 bg-cyber-bg border rounded p-3 flex flex-col transition-all duration-300 ${currentTheme.border} ${activeTab === 2 ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'}`}>
                <div className={`flex justify-between items-center mb-3 border-b pb-2 ${currentTheme.border}`}>
                  <button onClick={() => setActiveTab(null)} className={`hover:opacity-80 flex items-center gap-1 text-[10px] font-mono ${currentTheme.text}`}>
                    <ChevronLeft size={14}/> Back
                  </button>
                  <span className={`text-[10px] font-mono flex items-center gap-1 ${currentTheme.text}`}><MonitorPlay size={12}/> Tab 2: Preview</span>
                </div>
                <div className="flex-1 bg-black rounded border border-cyber-border flex items-center justify-center relative overflow-hidden">
                  {/* Actual Video Element */}
                  <video
                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-black/50`}></div>
                </div>
              </div>

              {/* Tab 3 Detail: Tools */}
              <div className={`absolute inset-0 bg-cyber-bg border rounded p-3 flex flex-col transition-all duration-300 ${currentTheme.border} ${activeTab === 3 ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'}`}>
                <div className={`flex justify-between items-center mb-3 border-b pb-2 ${currentTheme.border}`}>
                  <button onClick={() => setActiveTab(null)} className={`hover:opacity-80 flex items-center gap-1 text-[10px] font-mono ${currentTheme.text}`}>
                    <ChevronLeft size={14}/> Back
                  </button>
                  <span className={`text-[10px] font-mono flex items-center gap-1 ${currentTheme.text}`}><SlidersHorizontal size={12}/> Tab 3: Tools</span>
                </div>
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Layers size={14} className="text-cyber-muted" />
                    <div className="flex-1 h-2 bg-cyber-panel rounded-full overflow-hidden">
                      <div className={`w-3/4 h-full opacity-80 ${currentTheme.bg.replace('/10', '')}`}></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-cyber-muted" />
                    <div className="flex-1 h-2 bg-cyber-panel rounded-full overflow-hidden">
                      <div className={`w-1/2 h-full opacity-80 ${currentTheme.bg.replace('/10', '')}`}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <button 
                      onClick={cycleColor}
                      className={`h-8 rounded border flex items-center justify-center text-[10px] transition-colors cursor-pointer bg-cyber-panel border-cyber-border/50 text-cyber-muted ${currentTheme.hover}`}
                    >
                      Color: {wsColor}
                    </button>
                    <button 
                      onClick={cycleEffect}
                      className={`h-8 rounded border flex items-center justify-center text-[10px] transition-colors cursor-pointer bg-cyber-panel border-cyber-border/50 text-cyber-muted ${currentTheme.hover}`}
                    >
                      Effect: {wsEffect}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <AdvancedAIModules />
    </div>
  );
};
