import React from 'react';
import { AlertTriangle, Shield, Activity } from 'lucide-react';

export const ThreatFeed: React.FC = () => {
  return (
    <div className="bg-[#02040a] border-y border-cyber-border/50 py-2 overflow-hidden flex items-center relative z-20">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#02040a] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#02040a] to-transparent z-10"></div>
      
      <div className="flex whitespace-nowrap animate-marquee gap-12 text-xs font-mono">
        <span className="text-cyber-alert flex items-center gap-2">
          <AlertTriangle size={12} /> 
          OWASP: Critical CVE-2024-XYZ detected in wild. Zero-Trust Gateway blocking anomalous payloads.
        </span>
        <span className="text-cyber-primary flex items-center gap-2">
          <Activity size={12} /> 
          SPLUNK: 4,201 anomalous auth attempts blocked globally in the last 60 seconds.
        </span>
        <span className="text-cyber-secondary flex items-center gap-2">
          <Shield size={12} /> 
          MITRE LABS: APT29 lateral movement signatures updated. Behavioral models retrained.
        </span>
        <span className="text-emerald-400 flex items-center gap-2">
          <Activity size={12} /> 
          ZETALYON: Global mesh network latency stable at 12ms.
        </span>
      </div>
    </div>
  );
};
