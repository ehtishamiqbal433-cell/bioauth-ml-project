import React from 'react';
import { Brain, ShieldAlert, Ghost, Sparkles, Fingerprint, Network } from 'lucide-react';

export const AdvancedAIModules: React.FC = () => {
  return (
    <div className="mt-12 space-y-6">
      <div className="border-l-4 border-pink-500 pl-6 py-2 bg-gradient-to-r from-pink-500/10 to-transparent">
        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Advanced AI & Machine Learning Features</h2>
        <p className="text-cyber-muted max-w-4xl leading-relaxed">
          State-of-the-art neural network integrations operating directly within the client-side sandbox.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feature 1 */}
        <div className="bg-cyber-panel border border-cyber-border/50 rounded-xl p-6 shadow-lg relative overflow-hidden group hover:border-pink-500/50 transition-colors">
          <div className="absolute top-0 right-0 bg-pink-500/10 w-24 h-24 rounded-bl-full blur-2xl"></div>
          <Brain className="text-pink-400 mb-4" size={32} />
          <h3 className="text-lg font-bold text-white mb-2">Cognitive Load Biometric Attestation</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Utilizes a lightweight recurrent neural network (RNN) to analyze the micro-hesitations between keystrokes and mouse movements. It mathematically proves whether the user is experiencing natural cognitive load (thinking) or if a script is executing pre-computed actions.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-cyber-panel border border-cyber-border/50 rounded-xl p-6 shadow-lg relative overflow-hidden group hover:border-blue-500/50 transition-colors">
          <div className="absolute top-0 right-0 bg-blue-500/10 w-24 h-24 rounded-bl-full blur-2xl"></div>
          <ShieldAlert className="text-blue-400 mb-4" size={32} />
          <h3 className="text-lg font-bold text-white mb-2">Polymorphic Dynamic API Shielding</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            The frontend dynamically mutates its own API endpoint structures and payload schemas every 60 seconds using a synchronized cryptographic seed shared with the backend. Automated scrapers and credential stuffers instantly break as the API surface constantly shifts.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-cyber-panel border border-cyber-border/50 rounded-xl p-6 shadow-lg relative overflow-hidden group hover:border-purple-500/50 transition-colors">
          <div className="absolute top-0 right-0 bg-purple-500/10 w-24 h-24 rounded-bl-full blur-2xl"></div>
          <Ghost className="text-purple-400 mb-4" size={32} />
          <h3 className="text-lg font-bold text-white mb-2">Generative Honey-Pot UI</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Adversarial Frontend Morphing: The DOM actively generates invisible, structurally perfect decoy login forms and buttons using generative AI. When headless browsers or malicious extensions interact with these decoys, their session is instantly blacklisted.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-cyber-panel border border-cyber-border/50 rounded-xl p-6 shadow-lg relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
          <div className="absolute top-0 right-0 bg-emerald-500/10 w-24 h-24 rounded-bl-full blur-2xl"></div>
          <Fingerprint className="text-emerald-400 mb-4" size={32} />
          <h3 className="text-lg font-bold text-white mb-2">Continuous Identity Verification</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            A background process that continuously evaluates the user's biometric signature against their historical profile. If the confidence score drops below a critical threshold, the system seamlessly triggers a step-up authentication challenge without interrupting the user's workflow.
          </p>
        </div>

        {/* Feature 5 */}
        <div className="bg-cyber-panel border border-cyber-border/50 rounded-xl p-6 shadow-lg relative overflow-hidden group hover:border-yellow-500/50 transition-colors md:col-span-2">
          <div className="absolute top-0 right-0 bg-yellow-500/10 w-24 h-24 rounded-bl-full blur-2xl"></div>
          <Network className="text-yellow-400 mb-4" size={32} />
          <h3 className="text-lg font-bold text-white mb-2">Federated Threat Intelligence Network</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Zetalyon nodes communicate anonymously to share emerging threat vectors. When a novel attack pattern is detected on one device, the mathematical signature is instantly propagated to the global mesh, immunizing all other active sessions against the new threat in real-time.
          </p>
        </div>
      </div>
    </div>
  );
};
