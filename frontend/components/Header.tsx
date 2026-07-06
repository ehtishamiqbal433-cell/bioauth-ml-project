import React, { useState, useEffect, useRef } from 'react';
import { Shield, Activity, Lock, Fingerprint, PowerOff, Download, Unlock, FileCode2, LayoutDashboard, BookOpen } from 'lucide-react';

interface HeaderProps {
  telemetryEnabled: boolean;
  onToggleTelemetry: () => void;
  isOwner: boolean;
  onToggleOwner: () => void;
  currentPath: string;
}

export const Header: React.FC<HeaderProps> = ({ telemetryEnabled, onToggleTelemetry, isOwner, onToggleOwner, currentPath }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const lastClickTime = useRef(0);
  const clickCount = useRef(0);

  useEffect(() => {
    // Listen for the event that allows triggering the mobile install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  // Hidden trigger to enable Owner Mode (Click shield 5 times rapidly)
  const handleSecretClick = () => {
    const now = Date.now();
    if (now - lastClickTime.current > 1000) {
      clickCount.current = 0;
    }
    lastClickTime.current = now;
    clickCount.current += 1;

    if (clickCount.current === 5) {
      onToggleOwner();
      clickCount.current = 0;
    }
  };

  return (
    <header className="border-b border-cyber-border bg-cyber-panel/80 backdrop-blur-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            className="relative cursor-pointer select-none" 
            onClick={handleSecretClick}
            title="System Core"
          >
            <Shield className={`w-8 h-8 transition-colors ${telemetryEnabled ? 'text-cyber-primary' : 'text-cyber-muted'}`} />
            {telemetryEnabled && <div className="absolute inset-0 bg-cyber-primary blur-md opacity-50 rounded-full"></div>}
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-wider text-white flex items-center gap-2">
              ZETALYON <span className="text-cyber-primary font-mono text-xs border border-cyber-primary/30 px-1.5 py-0.5 rounded bg-cyber-primary/10 hidden sm:inline-block">v2.4.1</span>
            </h1>
            <p className="text-[10px] text-cyber-primary font-mono uppercase tracking-widest opacity-80 hidden sm:block">
              Continuous Security Intelligence
            </p>
          </div>

          {/* Main Layout Navigation */}
          <nav className="hidden lg:flex items-center gap-6 ml-8 border-l border-cyber-border pl-8">
            <a 
              href="#/" 
              className={`text-sm font-mono transition-colors flex items-center gap-2 ${currentPath === '#/' ? 'text-cyber-primary' : 'text-cyber-muted hover:text-white'}`}
            >
              <LayoutDashboard size={16} /> Dashboard
            </a>
            
            <a 
              href="#/glossary" 
              className={`text-sm font-mono transition-colors flex items-center gap-2 ${currentPath === '#/glossary' ? 'text-cyber-primary' : 'text-cyber-muted hover:text-white'}`}
            >
              <BookOpen size={16} /> Terminology
            </a>
            
            {/* Conditionally rendered link based on verified user session context (isOwner) */}
            {isOwner && (
              <a 
                href="#/architecture-docs" 
                className={`text-sm font-mono transition-colors flex items-center gap-2 animate-in fade-in slide-in-from-left-2 ${currentPath === '#/architecture-docs' ? 'text-purple-400' : 'text-cyber-muted hover:text-white'}`}
              >
                <FileCode2 size={16} /> Architecture Docs
              </a>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 sm:gap-4 text-sm font-mono">
            <div className={`hidden xl:flex items-center gap-2 ${telemetryEnabled ? 'text-cyber-accent' : 'text-cyber-muted'}`}>
              <Activity size={14} className={telemetryEnabled ? 'animate-pulse' : ''} />
              <span>Zero-Trust {telemetryEnabled ? 'Active' : 'Paused'}</span>
            </div>
            
            {deferredPrompt && (
              <button 
                onClick={handleInstallClick}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded border text-cyber-primary border-cyber-primary/30 bg-cyber-primary/10 hover:bg-cyber-primary/20 transition-all duration-300"
              >
                <Download size={14} />
                <span>Install App</span>
              </button>
            )}

            {/* Only visible when Owner Mode is active, allowing the owner to disable it */}
            {isOwner && (
              <button
                onClick={onToggleOwner}
                title="Disable Owner Mode"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded border transition-all duration-300 text-purple-400 border-purple-400/30 bg-purple-400/10 hover:bg-purple-400/20 shadow-[0_0_10px_rgba(168,85,247,0.2)] animate-in fade-in zoom-in"
              >
                <Unlock size={14} />
                <span>Owner Mode</span>
              </button>
            )}
            
            <button 
              onClick={onToggleTelemetry}
              className={`flex items-center gap-2 px-3 py-1.5 rounded border transition-all duration-300 ${
                telemetryEnabled 
                  ? 'text-cyber-accent border-cyber-accent/30 bg-cyber-accent/10 hover:bg-cyber-accent/20' 
                  : 'text-cyber-alert border-cyber-alert/30 bg-cyber-alert/10 hover:bg-cyber-alert/20'
              }`}
            >
              {telemetryEnabled ? <Fingerprint size={14} /> : <PowerOff size={14} />}
              <span className="hidden sm:inline">Bio-Telemetry: {telemetryEnabled ? 'ON' : 'OFF'}</span>
              <span className="sm:hidden">{telemetryEnabled ? 'ON' : 'OFF'}</span>
            </button>
          </div>
          
          <div className="flex items-center gap-3 pl-4 sm:pl-6 border-l border-cyber-border">
            <div className="text-right hidden lg:block">
              <div className="text-sm font-medium text-white">Session ID: <span className="text-cyber-secondary font-mono">0x8F9A...2B</span></div>
              <div className="text-xs text-cyber-muted">Risk Level: {telemetryEnabled ? 'Low' : 'Unknown'}</div>
            </div>
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyber-bg border flex items-center justify-center transition-colors ${telemetryEnabled ? 'border-cyber-border text-cyber-primary shadow-neon' : 'border-cyber-alert/50 text-cyber-alert shadow-neon-alert'}`}>
              <Lock size={16} className="sm:w-[18px] sm:h-[18px]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
