import React, { useState } from 'react';
import { Activity, Cpu, Database, ShieldAlert, Info, Code, ArrowRight, CheckCircle2, Terminal } from 'lucide-react';

export const ImplementationBlueprint: React.FC = () => {
  const [activePhase, setActivePhase] = useState<number>(1);

  const steps = [
    {
      id: 1,
      title: "Telemetry Capture",
      phase: "Phase 1: Instrumentation",
      icon: <Activity className="text-cyber-primary" size={20} />,
      color: "cyber-primary",
      desc: "Attach global passive listeners to the DOM container. Capture mouse vectors and key timings into high-resolution microsecond arrays, optimizing buffer flushing to prevent DOM thrashing."
    },
    {
      id: 2,
      title: "Wasm Vector Standardization",
      phase: "Phase 2: Local Feature Engineering",
      icon: <Cpu className="text-cyber-secondary" size={20} />,
      color: "cyber-secondary",
      desc: "Compile Rust or C++ mathematical pipelines into WebAssembly. Pass raw JSON coordinate arrays into Wasm to compute jerk vectors, polynomial path curves, and millisecond timing deltas client-side."
    },
    {
      id: 3,
      title: "Model Training & Profiling",
      phase: "Phase 3: Enrollment Zone",
      icon: <Database className="text-cyber-accent" size={20} />,
      color: "cyber-accent",
      desc: "During the first 200 interactions, train a local Isolation Forest or lightweight clustering model inside the browser or an isolated microservice to establish the unique 'User Signature'."
    },
    {
      id: 4,
      title: "Enforce Gateway Policy",
      phase: "Phase 4: Zero-Trust Interception",
      icon: <ShieldAlert className="text-cyber-alert" size={20} />,
      color: "cyber-alert",
      desc: "Intercept out-bound API requests using an administrative middleware layer. Attach the real-time telemetry verification score token to request headers, forcing step-up authentication if anomalies cross the established threshold."
    }
  ];

  const renderPhaseDetails = () => {
    switch (activePhase) {
      case 1:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-2 text-cyber-primary mb-2">
              <Code size={16} />
              <span className="font-mono text-sm uppercase tracking-wider">Client-Side Listener Implementation</span>
            </div>
            <div className="bg-[#02040a] rounded-lg p-4 border border-cyber-border/50 font-mono text-xs overflow-x-auto">
              <pre className="text-gray-300">
<span className="text-cyber-secondary">class</span> <span className="text-cyber-primary">ZeroTrustTelemetry</span> {'{'}
  <span className="text-cyber-secondary">private</span> buffer = [];
  <span className="text-cyber-secondary">private readonly</span> FLUSH_THRESHOLD = <span className="text-cyber-accent">50</span>;

  <span className="text-cyber-primary">start</span>() {'{'}
    window.<span className="text-cyber-primary">addEventListener</span>(<span className="text-cyber-accent">'mousemove'</span>, <span className="text-cyber-secondary">this</span>.onMouseMove, {'{'} passive: <span className="text-cyber-secondary">true</span> {'}'});
    window.<span className="text-cyber-primary">addEventListener</span>(<span className="text-cyber-accent">'keydown'</span>, <span className="text-cyber-secondary">this</span>.onKeyDown, {'{'} passive: <span className="text-cyber-secondary">true</span> {'}'});
  {'}'}

  <span className="text-cyber-secondary">private</span> onMouseMove = (e) =&gt; {'{'}
    <span className="text-cyber-secondary">this</span>.buffer.<span className="text-cyber-primary">push</span>({'{'} x: e.clientX, y: e.clientY, t: performance.<span className="text-cyber-primary">now</span>() {'}'});
    <span className="text-cyber-secondary">if</span> (<span className="text-cyber-secondary">this</span>.buffer.length &gt;= <span className="text-cyber-secondary">this</span>.FLUSH_THRESHOLD) <span className="text-cyber-secondary">this</span>.<span className="text-cyber-primary">flush</span>();
  {'}'}
  
  <span className="text-cyber-secondary">private</span> <span className="text-cyber-primary">flush</span>() {'{'}
    <span className="text-cyber-muted">// Dispatch to Wasm Engine or Backend</span>
    window.<span className="text-cyber-primary">dispatchEvent</span>(<span className="text-cyber-secondary">new</span> <span className="text-cyber-primary">CustomEvent</span>(<span className="text-cyber-accent">'telemetry-flush'</span>, {'{'} detail: <span className="text-cyber-secondary">this</span>.buffer {'}'}));
    <span className="text-cyber-secondary">this</span>.buffer = [];
  {'}'}
{'}'}
              </pre>
            </div>
            <div className="bg-cyber-primary/10 border border-cyber-primary/20 rounded p-3 text-sm text-cyber-muted">
              <strong className="text-cyber-primary">Critical:</strong> Use <code className="bg-cyber-bg px-1 rounded">passive: true</code> to ensure the main thread is not blocked during high-frequency mouse movements.
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-2 text-cyber-secondary mb-2">
              <Cpu size={16} />
              <span className="font-mono text-sm uppercase tracking-wider">Data Transformation Pipeline</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 bg-[#02040a] rounded-lg p-4 border border-cyber-border/50 font-mono text-xs w-full">
                <div className="text-cyber-muted mb-2">// Raw Input Array</div>
                <div className="text-gray-300">
                  [{'{'}x: <span className="text-cyber-accent">412</span>, y: <span className="text-cyber-accent">108</span>, t: <span className="text-cyber-accent">1024.5</span>{'}'},<br/>
                   {'{'}x: <span className="text-cyber-accent">415</span>, y: <span className="text-cyber-accent">110</span>, t: <span className="text-cyber-accent">1040.2</span>{'}'},<br/>
                   <span className="text-cyber-muted">...48 more items</span>]
                </div>
              </div>
              
              <ArrowRight className="text-cyber-secondary hidden md:block" size={24} />
              
              <div className="flex-1 bg-cyber-secondary/10 rounded-lg p-4 border border-cyber-secondary/30 font-mono text-xs w-full relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-cyber-secondary text-cyber-bg px-2 py-0.5 text-[10px] font-bold">WASM</div>
                <div className="text-cyber-secondary mb-2">// Extracted Features</div>
                <div className="text-white">
                  Velocity: <span className="text-cyber-accent">5.24</span> px/ms<br/>
                  Jerk (Δa): <span className="text-cyber-accent">0.12</span><br/>
                  Curvature: <span className="text-cyber-accent">0.89</span> σ<br/>
                  Flight Avg: <span className="text-cyber-accent">112</span> ms
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-2 text-cyber-accent mb-2">
              <Database size={16} />
              <span className="font-mono text-sm uppercase tracking-wider">Baseline Calibration Status</span>
            </div>
            
            <div className="bg-cyber-panel border border-cyber-border/50 rounded-lg p-6">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm text-cyber-muted font-mono">Enrollment Progress</span>
                <span className="text-cyber-accent font-mono font-bold">85%</span>
              </div>
              <div className="w-full h-2 bg-cyber-bg rounded-full overflow-hidden mb-4">
                <div className="h-full bg-cyber-accent w-[85%] relative">
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-cyber-bg p-3 rounded border border-cyber-border/30">
                  <div className="text-xs text-cyber-muted mb-1">Events Captured</div>
                  <div className="text-lg font-mono text-white">170 / 200</div>
                </div>
                <div className="bg-cyber-bg p-3 rounded border border-cyber-border/30">
                  <div className="text-xs text-cyber-muted mb-1">Model Confidence</div>
                  <div className="text-lg font-mono text-cyber-accent">High (0.92)</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-2 text-cyber-alert mb-2">
              <Terminal size={16} />
              <span className="font-mono text-sm uppercase tracking-wider">Middleware Interceptor</span>
            </div>
            <div className="bg-[#02040a] rounded-lg p-4 border border-cyber-border/50 font-mono text-xs overflow-x-auto">
              <pre className="text-gray-300">
<span className="text-cyber-secondary">async function</span> <span className="text-cyber-primary">secureFetch</span>(url, options) {'{'}
  <span className="text-cyber-secondary">const</span> trustScore = <span className="text-cyber-secondary">await</span> Zetalyon.<span className="text-cyber-primary">getCurrentScore</span>();
  
  <span className="text-cyber-secondary">if</span> (trustScore &lt; <span className="text-cyber-accent">60.0</span>) {'{'}
    <span className="text-cyber-muted">// Step-up authentication required</span>
    <span className="text-cyber-secondary">await</span> <span className="text-cyber-primary">triggerWebAuthn</span>();
  {'}'}

  <span className="text-cyber-muted">// Inject telemetry token into headers</span>
  <span className="text-cyber-secondary">const</span> secureHeaders = {'{'}
    ...options.headers,
    <span className="text-cyber-accent">'X-Zetalyon-Trust-Score'</span>: trustScore,
    <span className="text-cyber-accent">'X-Zetalyon-Session'</span>: Zetalyon.sessionId
  {'}'};

  <span className="text-cyber-secondary">return</span> <span className="text-cyber-primary">fetch</span>(url, {'{'} ...options, headers: secureHeaders {'}'});
{'}'}
              </pre>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-12 mb-12">
      <div className="mb-6 border-l-4 border-cyber-accent pl-6 py-2 bg-gradient-to-r from-cyber-accent/10 to-transparent">
        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">4. Implementation Blueprint</h2>
        <p className="text-cyber-muted max-w-4xl leading-relaxed">
          Building this system requires a strict sequence of engineering tasks. Skipping the calibration phase will lead to false positives that lock out legitimate users. Select a phase below to view implementation details.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Phase Selector */}
        <div className="lg:col-span-5 space-y-3">
          {steps.map((step) => {
            const isActive = activePhase === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActivePhase(step.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-4 group ${
                  isActive 
                    ? `bg-cyber-panel border-${step.color} shadow-[0_0_15px_rgba(0,0,0,0.2)] shadow-${step.color}/20` 
                    : 'bg-cyber-bg border-cyber-border/50 hover:border-cyber-border hover:bg-cyber-panel/50'
                }`}
              >
                <div className={`p-2 rounded-lg border transition-colors ${
                  isActive ? `bg-${step.color}/10 border-${step.color}/50` : 'bg-cyber-bg border-cyber-border/50 group-hover:border-cyber-border'
                }`}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-mono text-cyber-muted mb-1 uppercase tracking-wider">{step.phase}</div>
                  <h3 className={`text-sm font-bold mb-1 transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-xs line-clamp-2 transition-colors ${isActive ? 'text-gray-400' : 'text-cyber-muted'}`}>
                    {step.desc}
                  </p>
                </div>
                {isActive && (
                  <div className={`self-center text-${step.color}`}>
                    <ArrowRight size={20} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Column: Phase Details */}
        <div className="lg:col-span-7">
          <div className="bg-cyber-panel border border-cyber-border rounded-xl p-6 h-full min-h-[350px] shadow-lg relative overflow-hidden">
            {/* Decorative background element based on active phase */}
            <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none transition-colors duration-700 ${
              activePhase === 1 ? 'bg-cyber-primary' :
              activePhase === 2 ? 'bg-cyber-secondary' :
              activePhase === 3 ? 'bg-cyber-accent' : 'bg-cyber-alert'
            }`}></div>
            
            {renderPhaseDetails()}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-cyber-primary/5 border border-cyber-primary/20 rounded-xl p-6 flex gap-4 items-start shadow-lg">
        <Info className="text-cyber-primary shrink-0 mt-1" size={24} />
        <div>
          <h4 className="text-white font-bold mb-1">NIST Compliance Note</h4>
          <p className="text-sm text-cyber-muted leading-relaxed">
            Continuous evaluation satisfies the Rule 1 requirement of Zero Trust: all data sources and computing services are considered resources, and access is strictly dynamic based on the context of the immediate session.
          </p>
        </div>
      </div>
    </div>
  );
};
