import React, { useState } from 'react';
import { ShieldAlert, Fingerprint, CheckCircle2, Server, ArrowRight, Lock } from 'lucide-react';

interface ZeroTrustGatewayProps {
  trustScore: number;
  onLog: (level: 'info'|'warn'|'critical', source: 'Gateway', msg: string) => void;
}

export const ZeroTrustGateway: React.FC<ZeroTrustGatewayProps> = ({ trustScore, onLog }) => {
  const [status, setStatus] = useState<'idle' | 'intercepted' | 'authenticating' | 'success'>('idle');

  const executeSecureFetch = async () => {
    onLog('info', 'Gateway', 'Initiating outbound API request: POST /api/v1/financial/transfer');
    
    // Interceptor Logic
    if (trustScore < 75) {
      setStatus('intercepted');
      onLog('warn', 'Gateway', `Request intercepted. Behavioral trust score (${trustScore.toFixed(1)}%) is below the 75% confidence threshold.`);
      
      setTimeout(() => {
        triggerWebAuthn();
      }, 1500);
      return;
    }

    // Normal execution
    setStatus('success');
    onLog('info', 'Gateway', 'Trust score verified. Request authorized and dispatched.');
    setTimeout(() => setStatus('idle'), 3000);
  };

  const triggerWebAuthn = async () => {
    setStatus('authenticating');
    onLog('info', 'Gateway', 'Dynamically invoking WebAuthn (FIDO2/Passkeys) for hardware-backed biometric verification...');
    
    try {
      // Mocking the WebAuthn API call
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);
      
      // In a real environment, this triggers the native FaceID/TouchID prompt
      // We wrap it in a try/catch because sandboxes often block this API
      if (window.PublicKeyCredential) {
        await navigator.credentials.get({
          publicKey: {
            challenge,
            rpId: window.location.hostname || 'localhost',
            userVerification: 'required',
            timeout: 60000
          }
        }).catch(() => {
          // Fallback for sandbox environments that block the actual prompt
          console.log("Sandbox blocked WebAuthn, simulating success.");
        });
      }

      // Simulate success after prompt
      setTimeout(() => {
        setStatus('success');
        onLog('info', 'Gateway', 'Hardware biometric challenge succeeded. Resuming pending data transaction.');
        setTimeout(() => setStatus('idle'), 4000);
      }, 2000);

    } catch (err) {
      onLog('critical', 'Gateway', 'Hardware biometric challenge failed or was canceled. Request blocked.');
      setStatus('idle');
    }
  };

  return (
    <div className="mt-6 bg-cyber-panel border border-cyber-border rounded-xl p-6 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-cyber-alert text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg z-20">
        NETWORK INTERCEPTOR
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h3 className="text-lg font-mono text-white mb-2 flex items-center gap-2">
            <Server className="text-cyber-alert" />
            Zero-Trust API Gateway
          </h3>
          <p className="text-sm text-cyber-muted leading-relaxed mb-4">
            If the local behavioral score falls below the confidence threshold (75%), the interceptor pauses outbound network requests, dynamically invokes WebAuthn (FIDO2 / Passkeys) to prompt a native fingerprint or face scan, and seamlessly resumes the transaction only after the hardware challenge succeeds.
          </p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={executeSecureFetch}
              disabled={status !== 'idle'}
              className="bg-cyber-primary/20 hover:bg-cyber-primary/30 border border-cyber-primary text-cyber-primary font-mono text-sm px-6 py-3 rounded transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Lock size={16} />
              Execute Secure API Request
            </button>
            
            <div className="text-xs font-mono text-cyber-muted flex items-center gap-2">
              Current Score: <span className={trustScore >= 75 ? 'text-cyber-accent' : 'text-cyber-alert'}>{trustScore.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-80 h-40 bg-[#02040a] border border-cyber-border/30 rounded-lg relative flex flex-col items-center justify-center overflow-hidden p-4">
          <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
          
          {status === 'idle' && (
            <div className="text-cyber-muted font-mono text-xs flex flex-col items-center gap-2 z-10">
              <Server size={24} />
              <span>Gateway Standby</span>
            </div>
          )}

          {status === 'intercepted' && (
            <div className="text-cyber-alert font-mono text-xs flex flex-col items-center gap-2 z-10 animate-in zoom-in duration-300">
              <ShieldAlert size={32} className="animate-pulse" />
              <span className="text-center">ANOMALY DETECTED<br/>Request Paused</span>
            </div>
          )}

          {status === 'authenticating' && (
            <div className="text-cyber-primary font-mono text-xs flex flex-col items-center gap-2 z-10 animate-in zoom-in duration-300">
              <Fingerprint size={32} className="animate-pulse" />
              <span className="text-center">Awaiting Hardware Biometrics<br/>(TouchID / FaceID)</span>
            </div>
          )}

          {status === 'success' && (
            <div className="text-cyber-accent font-mono text-xs flex flex-col items-center gap-2 z-10 animate-in zoom-in duration-300">
              <CheckCircle2 size={32} />
              <span className="text-center">VERIFIED<br/>Transaction Resumed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
