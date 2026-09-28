import React, { useState, useRef } from 'react';
import { Terminal, Send, CheckCircle2, Radio, Mail, Github, Linkedin, Users } from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';

export const Beat4Terminal: React.FC = () => {
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'HADRON TRIAD TRANSMISSION TERMINAL v4.5.0 [ACTIVE]',
    'COLLECTIVE NODES: KUNAL (BUILD) • ANIMESH (IDEA) • RAJANI (DEV)',
    'TYPE "help" OR "team" TO QUERY COLLECTIVE PROTOCOLS.',
  ]);
  const [commandInput, setCommandInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [pastCommands, setPastCommands] = useState<string[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmitSuccess, setTransmitSuccess] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [senderEmail, setSenderEmail] = useState('');

  const terminalContainerRef = useRef<HTMLDivElement>(null);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rawCmd = commandInput.trim();
    if (!rawCmd) return;

    soundEngine.playClickBeep();
    const cmd = rawCmd.toLowerCase();
    setPastCommands((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const newLogs = [...terminalHistory, `> ${rawCmd}`];

    if (cmd === 'help') {
      newLogs.push(
        'AVAILABLE TRANSMISSION COMMANDS:',
        '  team       - Overview of the 3 triad collective members',
        '  kunal      - Dossier on Kunal Sabale (Chief Builder & Architect)',
        '  animesh    - Dossier on Animesh Dabhade (Ideation & Creative Lead)',
        '  rajani     - Dossier on Rajani Mourya (Presentation & Developer)',
        '  repos      - List all 9 GitHub repositories with links',
        '  status     - Query collective status and cryogenic temperature',
        '  specs      - Display runtime graphics and engineering specs',
        '  ping       - Test network transmission latency to core',
        '  contact    - Print verified contact conduits',
        '  clear/cls  - Clear terminal history buffer'
      );
    } else if (cmd === 'team') {
      newLogs.push(
        'TRIAD COLLECTIVE ROSTER:',
        '  [01] KUNAL SABALE    - Chief Systems Architect & Builder (WebGL/Systems)',
        '  [02] ANIMESH DABHADE - Ideation Lead & Creative Strategist (Vision/UX)',
        '  [03] RAJANI MOURYA   - Presentation Director & UI Developer (Motion/Design)'
      );
    } else if (cmd === 'kunal') {
      newLogs.push(
        'NODE 01: KUNAL SABALE',
        '  FUNCTION: The Build / Systems Architecture',
        '  STACK: Three.js, WebGL 2.0, React, TypeScript, Rust WASM, Next.js',
        '  GITHUB: https://github.com/Kunal-sabale10'
      );
    } else if (cmd === 'animesh') {
      newLogs.push(
        'NODE 02: ANIMESH DABHADE',
        '  FUNCTION: The Idea / Concept & Creative Direction',
        '  FOCUS: Worldbuilding, Spatial Scripting, Disruptive UX Narratives',
        '  STATUS: SYNCHRONIZED'
      );
    } else if (cmd === 'rajani') {
      newLogs.push(
        'NODE 03: RAJANI MOURYA',
        '  FUNCTION: Presentation & UI Developer',
        '  FOCUS: High-Craft Motion, Design Systems, Typography, Responsive UX',
        '  STATUS: SYNCHRONIZED'
      );
    } else if (cmd === 'repos' || cmd === 'projects') {
      newLogs.push(
        'GITHUB REPOSITORIES (github.com/Kunal-sabale10):',
        '  • maison-rk       - Premium E-Commerce Platform (TypeScript)',
        '  • Portfolio       - 3D WebGL Spatial Portfolio (TypeScript/Next.js)',
        '  • genchat         - Real-time Generative AI Engine (TypeScript)',
        '  • consultancy     - Full-stack Financial Advisory Platform (HTML/JS)',
        '  • urban-bites     - Dynamic Culinary Ordering System (TypeScript)',
        '  • anti-tweet      - Minimalist Social Protocol Stream (TypeScript)',
        '  • Anagh-consulting- Advisory Process Application',
        '  • team-portfolio- - Collaborative Matrix Platform',
        '  • app             - Progressive Mobile Application'
      );
    } else if (cmd === 'status') {
      newLogs.push(
        'TRIAD COLLECTIVE STATUS: ALL 3 NODES ACTIVE',
        'BEAM VACUUM: 10⁻¹⁰ TORR // MAGNET: 1.9 K (NOMINAL)',
        'GITHUB SYNC: 9 REPOSITORIES INDEXED',
        'AUDIO ENGINE: DSP 48Hz SUB-BASS ACTIVE'
      );
    } else if (cmd === 'specs') {
      newLogs.push(
        'ENGINE PIPELINE: THREE.JS + R3F + CUSTOM GLSL SHADERS',
        'PHYSICS: LENIS INERTIAL TIMEBASE + GSAP SCROLLTRIGGER',
        'FRAME TARGET: 60/120 FPS ADAPTIVE DEGRADATION TIER'
      );
    } else if (cmd === 'contact') {
      newLogs.push(
        'DIRECT CONDUITS:',
        '  EMAIL: kunal.sabale@gmail.com',
        '  GITHUB: https://github.com/Kunal-sabale10',
        '  LINKEDIN: https://linkedin.com'
      );
    } else if (cmd === 'ping') {
      newLogs.push('TRANSMISSION PING: 0.12 ms [0% PACKET LOSS, QUIC STREAM OPEN]');
    } else if (cmd === 'clear' || cmd === 'cls') {
      setTerminalHistory([]);
      setCommandInput('');
      return;
    } else {
      newLogs.push(`COMMAND NOT RECOGNIZED: "${rawCmd}". TYPE "help" OR "team".`);
    }

    setTerminalHistory(newLogs);
    setCommandInput('');
    setTimeout(() => {
      if (terminalContainerRef.current) {
        terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
      }
    }, 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (pastCommands.length === 0) return;
      const nextIdx = historyIndex === -1 ? pastCommands.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setCommandInput(pastCommands[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= pastCommands.length) {
        setHistoryIndex(-1);
        setCommandInput('');
      } else {
        setHistoryIndex(nextIdx);
        setCommandInput(pastCommands[nextIdx]);
      }
    }
  };

  const handleCopyEmail = () => {
    soundEngine.playClickBeep();
    navigator.clipboard.writeText('kunal.sabale@gmail.com');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleTransmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !senderEmail.trim()) return;

    soundEngine.playSubImpact();
    setIsTransmitting(true);

    setTimeout(() => {
      setIsTransmitting(false);
      setTransmitSuccess(true);
      setMessageText('');
      setSenderEmail('');
      setTimeout(() => setTransmitSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className="relative min-h-[90vh] w-full px-6 sm:px-12 md:px-20 py-16 sm:py-24">
      {/* Header */}
      <div className="max-w-4xl space-y-4 mb-14">
        <div className="flex items-center space-x-3 text-xs font-mono text-titanium">
          <span className="w-2 h-2 rounded-full bg-cherenkov-glow animate-ping" />
          <span className="text-offwhite font-bold tracking-widest">BEAT 04 // TERMINAL CONTACT</span>
          <span className="text-cherenkov-glow">| OUTGOING TRANSMISSION PROTOCOL</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-offwhite tracking-tight">
          ENGAGE THE<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cherenkov-glow to-cherenkov-blue">
            TRIAD.
          </span>
        </h2>
        <p className="text-sm sm:text-base font-mono text-titanium max-w-xl">
          Initiate direct communication conduits with Kunal Sabale, Animesh Dabhade &amp; Rajani Mourya. Open for high-craft creative engineering and collaborative projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl">
        {/* Left: Interactive CLI Console */}
        <div className="lg:col-span-6 bg-graphite-900/90 border border-graphite-800 rounded-lg p-5 font-mono text-xs flex flex-col justify-between h-[440px] shadow-2xl backdrop-blur-md">
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between border-b border-graphite-800 pb-3 text-titanium text-[11px]">
            <div className="flex items-center space-x-2">
              <Terminal className="w-3.5 h-3.5 text-cherenkov-glow" />
              <span className="text-offwhite font-semibold">HADRON_TRIAD_CLI // SHELL_TTY_0</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-graphite-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-graphite-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-cherenkov-blue animate-pulse" />
            </div>
          </div>

          {/* Terminal Output Stream */}
          <div
            ref={terminalContainerRef}
            className="flex-1 overflow-y-auto py-3 space-y-1.5 text-titanium text-[11px] selection:bg-cherenkov-blue selection:text-white"
          >
            {terminalHistory.map((line, idx) => (
              <div
                key={idx}
                className={line.startsWith('>') ? 'text-cherenkov-glow font-bold' : ''}
              >
                {line}
              </div>
            ))}
          </div>

          {/* Command Prompt Input */}
          <form onSubmit={handleCommandSubmit} className="pt-3 border-t border-graphite-800 flex items-center gap-2">
            <span className="text-cherenkov-glow font-bold">{'>'}</span>
            <input
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type team, kunal, animesh, rajani, repos..."
              className="flex-1 bg-transparent text-offwhite outline-none placeholder-titanium/50 font-mono text-xs"
            />
          </form>
        </div>

        {/* Right: Direct Transmission Dispatch Form */}
        <div className="lg:col-span-6 bg-graphite-900/80 border border-graphite-800 rounded-lg p-6 sm:p-8 backdrop-blur-md space-y-6">
          <div className="flex items-center justify-between border-b border-graphite-800 pb-3 font-mono text-xs text-titanium">
            <span className="font-bold text-offwhite uppercase">TRANSMIT TO TRIAD COLLECTIVE</span>
            <span className="flex items-center gap-1.5 text-isotope text-[11px]">
              <Radio className="w-3 h-3 animate-pulse" />
              PORTAL ACTIVE
            </span>
          </div>

          {transmitSuccess ? (
            <div className="bg-graphite-950 p-6 rounded border border-isotope/40 space-y-3 font-mono text-center">
              <CheckCircle2 className="w-8 h-8 text-isotope mx-auto animate-bounce" />
              <div className="text-sm font-bold text-offwhite">TRANSMISSION DISPATCHED</div>
              <p className="text-xs text-titanium">
                Encrypted packet ingested into Kunal, Animesh &amp; Rajani queue. Turnaround within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleTransmitMessage} className="space-y-4 font-mono text-xs">
              <div className="space-y-1.5">
                <label className="text-[10px] text-titanium uppercase">CALLSIGN / SENDER EMAIL</label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="partner@studio.com"
                  className="w-full px-3.5 py-2.5 bg-graphite-950 border border-graphite-800 rounded text-offwhite focus:border-cherenkov-glow outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-titanium uppercase">PROJECT PROPOSAL / MESSAGE</label>
                <textarea
                  required
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Discuss project requirements, system build, ideation, or frontend presentation..."
                  className="w-full px-3.5 py-2.5 bg-graphite-950 border border-graphite-800 rounded text-offwhite focus:border-cherenkov-glow outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isTransmitting}
                onMouseEnter={() => soundEngine.playHoverBlip(1500)}
                className="w-full py-3.5 bg-cherenkov-blue hover:bg-cherenkov-glow hover:text-graphite-950 text-white font-bold uppercase tracking-wider rounded transition-all shadow-lg shadow-cherenkov-blue/20 cursor-pointer flex items-center justify-center space-x-2"
              >
                {isTransmitting ? (
                  <span>DISPATCHING WAVEFORM...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>TRANSMIT PACKET TO TRIAD</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Quick Conduits */}
          <div className="pt-4 border-t border-graphite-800 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <button
              onClick={handleCopyEmail}
              onMouseEnter={() => soundEngine.playHoverBlip(1400)}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded bg-graphite-950 hover:bg-graphite-800 text-titanium hover:text-white transition-colors cursor-pointer border border-graphite-800"
            >
              <Mail className="w-3.5 h-3.5 text-cherenkov-glow" />
              <span>{isCopied ? 'EMAIL COPIED!' : 'COPY EMAIL'}</span>
            </button>

            <div className="flex items-center space-x-3">
              <a
                href="https://github.com/Kunal-sabale10?tab=repositories"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundEngine.playHoverBlip(1400)}
                className="p-2 rounded bg-graphite-950 hover:bg-graphite-800 text-titanium hover:text-white transition-colors border border-graphite-800 flex items-center gap-1.5 text-[11px]"
                title="Kunal's GitHub Repositories"
              >
                <Github className="w-4 h-4 text-cherenkov-glow" />
                <span>GITHUB</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundEngine.playHoverBlip(1400)}
                className="p-2 rounded bg-graphite-950 hover:bg-graphite-800 text-titanium hover:text-white transition-colors border border-graphite-800"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
