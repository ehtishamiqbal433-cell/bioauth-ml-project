import React from 'react';
import { BookOpen, Shield, Activity, Cpu, Network } from 'lucide-react';

export const Glossary: React.FC = () => {
  const terms = [
    {
      term: "Zero-Trust Architecture",
      icon: <Shield size={18} className="text-cyber-primary" />,
      def: "A security framework requiring all users, whether in or outside the organization's network, to be authenticated, authorized, and continuously validated for security configuration and posture before being granted or keeping access to applications and data."
    },
    {
      term: "Behavioral Biometrics",
      icon: <Activity size={18} className="text-cyber-secondary" />,
      def: "The field of study related to the measure of uniquely identifying and measurable patterns in human activities. This includes keystroke dynamics, gait analysis, mouse use characteristics, and cognitive load indicators."
    },
    {
      term: "Kinematic Honeypot",
      icon: <Cpu size={18} className="text-cyber-alert" />,
      def: "A defensive mechanism that injects micro-perturbations (tiny shifts) into UI elements to measure the user's subconscious neurological correction latency. Bots fail to correct naturally, exposing their synthetic nature."
    },
    {
      term: "WebAssembly (Wasm)",
      icon: <Network size={18} className="text-emerald-400" />,
      def: "A binary instruction format for a stack-based virtual machine. Wasm is designed as a portable compilation target for programming languages, enabling deployment on the web for client and server applications with near-native performance."
    },
    {
      term: "Isolation Forest",
      icon: <Activity size={18} className="text-purple-400" />,
      def: "An unsupervised machine learning algorithm for anomaly detection that works on the principle of isolating anomalies, instead of the most common techniques of profiling normal points."
    }
  ];

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="mb-8 border-l-4 border-cyber-primary pl-6 py-2 bg-gradient-to-r from-cyber-primary/10 to-transparent">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight flex items-center gap-3">
          <BookOpen className="text-cyber-primary" />
          System Terminology & Documentation
        </h2>
        <p className="text-cyber-muted leading-relaxed">
          A comprehensive guide to the advanced security concepts and architectural patterns utilized within the Zetalyon platform.
        </p>
      </div>

      <div className="space-y-6">
        {terms.map((t, i) => (
          <div key={i} className="bg-cyber-panel border border-cyber-border/50 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-cyber-bg rounded border border-cyber-border/30">
                {t.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{t.term}</h3>
            </div>
            <p className="text-gray-400 leading-relaxed ml-14">
              {t.def}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
