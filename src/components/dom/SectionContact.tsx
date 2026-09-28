import React, { useState, useRef } from 'react';
import { Terminal, Send, CheckCircle2, Mail, Github, Linkedin, Radio, Copy, Check } from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';

export const SectionContact: React.FC = () => {
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    '404 REBELS TERMINAL v5.0.0 [ONLINE]',
    'SECTIONS: 1 HERO • 2 ABOUT • 3 TEAM • 4 PROJECTS • 5 SKILLS • 6 CONTACT',
    'TYPE "help" OR "team" FOR PROTOCOL COMMANDS.',
  ]);
  const [commandInput, setCommandInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [pastCommands, setPastCommands] = useState<string[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmitSuccess, setTransmitSuccess] = useState(false);

  // Form states
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [messageSubject, setMessageSubject] = useState('New Project Collaboration');
  const [messageText, setMessageText] = useState('');

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
        'AVAILABLE COMMANDS:',
        '  team       - Overview of the 3 team members',
        '  kunal      - Profile of Kunal Sabale (Full-Stack Developer)',
        '  animesh    - Profile of Animesh Dabhade (Product & Strategy Lead)',
        '  rajani     - Profile of Rajani Mourya (Frontend & UI Specialist)',
        '  projects   - Summary of live team projects',
        '  skills     - List of core frontend and full-stack technologies',
        '  status     - Query current telemetry and team availability',
        '  contact    - Display direct contact channels',
        '  ping       - Test network transmission latency',
        '  clear/cls  - Clear terminal stream'
      );
    } else if (cmd === 'team') {
      newLogs.push(
        '404 REBELS TEAM:',
        '  [1] KUNAL SABALE    - Full-Stack Lead (React, TypeScript, Node, 3D)',
        '  [2] ANIMESH DABHADE - Product Lead (Strategy, UX, Brand Identity)',
        '  [3] RAJANI MOURYA   - Frontend Lead (UI/UX, Responsive Layouts)'
      );
    } else if (cmd === 'kunal') {
      newLogs.push('KUNAL SABALE // Full-Stack Developer & Systems Architect. GitHub: github.com/Kunal-sabale10');
    } else if (cmd === 'animesh') {
      newLogs.push('ANIMESH DABHADE // Creative Strategist & Product Lead.');
    } else if (cmd === 'rajani') {
      newLogs.push('RAJANI MOURYA // Frontend Developer & UI/UX Specialist.');
    } else if (cmd === 'projects' || cmd === 'repos') {
      newLogs.push('PROJECTS: GenChat AI, Urban Bite, Consultancy Website, Maison RK');
    } else if (cmd === 'skills') {
      newLogs.push('TECH STACK: Three.js, R3F, GLSL Shaders, GSAP, Lenis, Web Audio API, React 18, TypeScript, Tailwind');
    } else if (cmd === 'contact') {
      newLogs.push('CONTACT: kunalsabale10@gmail.com | github.com/Kunal-sabale10');
    } else if (cmd === 'ping') {
      newLogs.push('PING: 0.12 ms [QUIC stream open, zero packet loss]');
    } else if (cmd === 'clear' || cmd === 'cls') {
      setTerminalHistory([]);
      setCommandInput('');
      return;
    } else {
      newLogs.push(`COMMAND NOT RECOGNIZED: "${rawCmd}". TYPE "help".`);
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
    navigator.clipboard.writeText('kunalsabale10@gmail.com');
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
      setSenderName('');
      setSenderEmail('');
      setMessageText('');
      setTimeout(() => setTransmitSuccess(false), 6000);
    }, 1000);
  };

  return (
    <section id="section-contact" className="relative min-h-screen w-full px-6 sm:px-12 md:px-20 py-20 sm:py-28 flex flex-col justify-center">
      {/* Header */}
      <div className="max-w-4xl space-y-4 mb-14 relative p-4 sm:p-6 -m-4 sm:-m-6 rounded-3xl bg-gradient-to-r from-[#F4F1EA]/92 via-[#F4F1EA]/65 to-transparent dark:from-theme-base/80 dark:via-theme-base/40 dark:to-transparent">
        <div className="flex items-center space-x-3 text-xs font-mono text-[#3A4258] dark:text-[#8A91A6]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0B4DFF] dark:bg-cherenkov-glow animate-ping" />
          <span className="text-[#0E1220] dark:text-[#F2F4F8] font-bold tracking-widest">06 // DIRECT CONTACT</span>
          <span className="text-[#007C8C] dark:text-cherenkov-glow font-bold">| TRANSMISSION CONDUITS</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-[#0E1220] dark:text-[#F2F4F8] tracking-tight">
          CONNECT WITH<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0E1220] via-[#003299] to-[#0B4DFF] dark:from-sky-300 dark:via-white dark:to-blue-500">
            404 REBELS.
          </span>
        </h2>
        <p className="text-base sm:text-lg font-sans text-[#3A4258] dark:text-[#B8BED0] max-w-xl leading-relaxed">
          Open for full-stack engineering, web applications, UI/UX design, and ambitious collaborative projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl font-mono">
        {/* Left: Interactive CLI Console */}
        <div className="lg:col-span-6 bg-theme-surface border border-theme-border-subtle dark:border-white/10 rounded-xl p-5 text-xs flex flex-col justify-between h-[450px] shadow-ambient">
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between border-b border-theme-border-subtle dark:border-white/10 pb-3 text-[#5B6478] dark:text-[#8A91A6] text-[11px]">
            <div className="flex items-center space-x-2">
              <Terminal className="w-3.5 h-3.5 text-[#007C8C] dark:text-cherenkov-glow" />
              <span className="text-[#0E1220] dark:text-[#F2F4F8] font-bold">404_REBELS_CLI // TTY_0</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#0B4DFF] dark:bg-cherenkov-blue animate-pulse" />
            </div>
          </div>

          {/* Terminal Output Stream */}
          <div
            ref={terminalContainerRef}
            className="flex-1 overflow-y-auto py-3 space-y-1.5 text-[#0E1220] dark:text-[#F2F4F8] text-[11px] font-medium"
          >
            {terminalHistory.map((line, idx) => (
              <div
                key={idx}
                className={line.startsWith('>') ? 'text-[#0B4DFF] dark:text-cherenkov-glow font-bold' : ''}
              >
                {line}
              </div>
            ))}
          </div>

          {/* Command Prompt Input */}
          <form onSubmit={handleCommandSubmit} className="pt-3 border-t border-theme-border-subtle dark:border-white/10 flex items-center gap-2">
            <span className="text-[#0B4DFF] dark:text-cherenkov-glow font-bold">{'>'}</span>
            <input
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type help, team, kunal, projects..."
              className="flex-1 bg-transparent text-[#0E1220] dark:text-[#F2F4F8] outline-none placeholder-[#6B7386] dark:placeholder-[#8A91A6] font-mono text-xs font-medium"
            />
          </form>
        </div>

        {/* Right: Direct Transmission Form */}
        <div className="lg:col-span-6 bg-theme-surface border border-theme-border-subtle dark:border-white/10 rounded-xl p-6 sm:p-8 space-y-5 shadow-ambient flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-theme-border-subtle dark:border-white/10 pb-3 text-xs text-[#5B6478] dark:text-[#8A91A6]">
              <span className="font-bold text-[#0E1220] dark:text-[#F2F4F8] uppercase">DIRECT TRANSMISSION DISPATCH</span>
              <span className="flex items-center gap-1.5 text-emerald-700 dark:text-isotope text-[11px] font-semibold">
                <Radio className="w-3 h-3 animate-pulse" />
                CONDUIT OPEN
              </span>
            </div>

            {transmitSuccess ? (
              <div className="my-6 p-6 rounded-lg bg-emerald-50 dark:bg-graphite-950 border border-emerald-300 dark:border-isotope/40 space-y-2 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-isotope mx-auto animate-bounce" />
                <div className="text-sm font-bold text-theme-text-main">TRANSMISSION RECEIVED</div>
                <p className="text-xs text-theme-text-muted">
                  Packet queued for Kunal, Animesh, and Rajani. Response within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTransmitMessage} className="space-y-3.5 pt-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-[#3A4258] dark:text-[#8A91A6] uppercase font-bold">NAME / CALLSIGN</label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Alex Mercer"
                      className="w-full px-3 py-2 bg-white/90 dark:bg-theme-surface-subtle border border-[rgba(14,18,32,0.18)] dark:border-white/10 rounded-md text-[#0E1220] dark:text-[#F2F4F8] placeholder-[#6B7386] dark:placeholder-[#8A91A6] focus:border-[#0B4DFF] dark:focus:border-cherenkov-glow focus:ring-1 focus:ring-[#0B4DFF] outline-none transition-all shadow-sm font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-[#3A4258] dark:text-[#8A91A6] uppercase font-bold">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="alex@studio.com"
                      className="w-full px-3 py-2 bg-white/90 dark:bg-theme-surface-subtle border border-[rgba(14,18,32,0.18)] dark:border-white/10 rounded-md text-[#0E1220] dark:text-[#F2F4F8] placeholder-[#6B7386] dark:placeholder-[#8A91A6] focus:border-[#0B4DFF] dark:focus:border-cherenkov-glow focus:ring-1 focus:ring-[#0B4DFF] outline-none transition-all shadow-sm font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-[#3A4258] dark:text-[#8A91A6] uppercase font-bold">MESSAGE PAYLOAD</label>
                  <textarea
                    required
                    rows={3}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Describe your project, engineering inquiry, or creative vision..."
                    className="w-full px-3 py-2 bg-white/90 dark:bg-theme-surface-subtle border border-[rgba(14,18,32,0.18)] dark:border-white/10 rounded-md text-[#0E1220] dark:text-[#F2F4F8] placeholder-[#6B7386] dark:placeholder-[#8A91A6] focus:border-[#0B4DFF] dark:focus:border-cherenkov-glow focus:ring-1 focus:ring-[#0B4DFF] outline-none transition-all shadow-sm font-medium resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isTransmitting}
                  onMouseEnter={() => soundEngine.playHoverBlip(1500)}
                  className="w-full py-3 bg-[#0B4DFF] hover:bg-[#0037A8] dark:bg-cherenkov-blue dark:hover:bg-cherenkov-glow text-white dark:hover:text-graphite-950 font-bold uppercase tracking-wider rounded-md transition-all shadow-md shadow-blue-500/25 cursor-pointer flex items-center justify-center space-x-2"
                >
                  {isTransmitting ? (
                    <span>DISPATCHING...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>TRANSMIT MESSAGE</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Social Conduits, Direct Mailto & Email Copy */}
          <div className="pt-3 border-t border-theme-border-subtle dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <a
                href="mailto:kunalsabale10@gmail.com?subject=Collaboration%20with%20404%20Rebels"
                onMouseEnter={() => soundEngine.playHoverBlip(1400)}
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-md bg-theme-surface-subtle hover:bg-theme-surface text-[#0B4DFF] dark:text-cherenkov-glow hover:underline transition-colors border border-theme-border-subtle dark:border-white/10 font-bold"
                title="Send Email via Mail client"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>kunalsabale10@gmail.com</span>
              </a>

              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => soundEngine.playHoverBlip(1400)}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md bg-theme-surface-subtle hover:bg-theme-surface text-[#0E1220] dark:text-[#B8BED0] hover:text-[#0B4DFF] dark:hover:text-[#F2F4F8] transition-colors cursor-pointer border border-theme-border-subtle dark:border-white/10 text-[11px] font-semibold"
                title="Copy email to clipboard"
              >
                {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{isCopied ? 'COPIED!' : 'COPY'}</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href="https://github.com/Kunal-sabale10?tab=repositories"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundEngine.playHoverBlip(1400)}
                className="p-2 rounded-md bg-theme-surface-subtle hover:bg-theme-surface text-[#0E1220] dark:text-[#B8BED0] hover:text-[#0B4DFF] dark:hover:text-[#F2F4F8] transition-colors border border-theme-border-subtle dark:border-white/10 flex items-center gap-1.5 text-[11px] font-semibold"
                title="GitHub Repositories"
              >
                <Github className="w-4 h-4 text-[#007C8C] dark:text-cherenkov-glow" />
                <span>GITHUB</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundEngine.playHoverBlip(1400)}
                className="p-2 rounded-md bg-theme-surface-subtle hover:bg-theme-surface text-[#0E1220] dark:text-[#B8BED0] hover:text-[#0B4DFF] dark:hover:text-[#F2F4F8] transition-colors border border-theme-border-subtle dark:border-white/10"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-[#007C8C] dark:text-cherenkov-glow" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
