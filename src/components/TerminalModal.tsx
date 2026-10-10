import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Minimize2, Maximize2 } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, SKILLS_LIST } from '../data/portfolioData';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleTheme?: () => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose, onToggleTheme }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 'welcome',
      command: 'welcome',
      output: (
        <div className="space-y-1 text-zinc-200">
          <p className="font-bold text-white">Deepesh Reddy [asyncbuild] Interactive Terminal v2.4.0</p>
          <p className="text-zinc-400">Type <span className="text-white font-semibold">help</span> to see available commands.</p>
        </div>
      ),
    },
  ]);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const executeCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    const parts = raw.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    setHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-zinc-300 text-xs">
            <p className="text-zinc-200 font-bold mb-1">Available Commands:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-1 gap-x-4">
              <div><span className="text-white font-mono font-medium">about</span> - Who is Deepesh?</div>
              <div><span className="text-white font-mono font-medium">skills</span> - List skill matrix</div>
              <div><span className="text-white font-mono font-medium">projects</span> - View shipped apps</div>
              <div><span className="text-white font-mono font-medium">exp</span> - Work experience</div>
              <div><span className="text-white font-mono font-medium">contact</span> - Email & contact</div>
              <div><span className="text-white font-mono font-medium">socials</span> - GitHub, Twitter, etc.</div>
              <div><span className="text-white font-mono font-medium">matrix</span> - Digital rain mode</div>
              <div><span className="text-white font-mono font-medium">sudo hire</span> - Direct hire shortcut</div>
              <div><span className="text-white font-mono font-medium">theme</span> - Toggle light/dark</div>
              <div><span className="text-white font-mono font-medium">clear</span> - Clear screen</div>
              <div><span className="text-white font-mono font-medium">exit</span> - Close terminal</div>
            </div>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="space-y-1 text-zinc-300 text-xs">
            <p className="font-bold text-white">{PERSONAL_INFO.name} ({PERSONAL_INFO.title})</p>
            <p className="text-zinc-400">{PERSONAL_INFO.tagline}</p>
            <p className="text-zinc-300 mt-1">Status: {PERSONAL_INFO.statusText} • Location: {PERSONAL_INFO.location}</p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-zinc-200 font-semibold">Technical Stack Matrix:</p>
            <div className="flex flex-wrap gap-1.5">
              {SKILLS_LIST.map((s, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[11px] border border-zinc-700">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-zinc-200 font-semibold">Selected Projects:</p>
            {PROJECTS.map((p) => (
              <div key={p.id} className="p-2 rounded bg-zinc-900 border border-zinc-800">
                <p className="font-bold text-white flex items-center justify-between">
                  <span>{p.title}</span>
                  <span className="text-[10px] text-zinc-400 font-mono">{p.status}</span>
                </p>
                <p className="text-zinc-400 text-[11px] mt-0.5">{p.tagline}</p>
                <p className="text-zinc-400 font-mono text-[10px] mt-1">{p.tags.join(' • ')}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'exp':
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-zinc-200 font-semibold">Work Experience:</p>
            {EXPERIENCES.map((e) => (
              <div key={e.id} className="p-2 rounded bg-zinc-900 border border-zinc-800">
                <p className="font-bold text-white">{e.role} @ {e.company}</p>
                <p className="text-zinc-500 font-mono text-[10px]">{e.period} • {e.location}</p>
                <p className="text-zinc-300 text-[11px] mt-1">{e.bulletPoints[0]}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="text-xs space-y-1 text-zinc-300">
            <p>📧 Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-zinc-200 underline">{PERSONAL_INFO.email}</a></p>
            <p>📅 Schedule: <a href={PERSONAL_INFO.calComLink} target="_blank" rel="noopener noreferrer" className="text-zinc-200 underline">{PERSONAL_INFO.calComLink}</a></p>
          </div>
        );
        break;

      case 'socials':
        output = (
          <div className="text-xs space-y-1 text-zinc-300 font-mono">
            <p>GitHub:   <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:underline">{PERSONAL_INFO.socials.github}</a></p>
            <p>Twitter:  <a href={PERSONAL_INFO.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:underline">{PERSONAL_INFO.socials.twitter}</a></p>
            <p>LinkedIn: <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:underline">{PERSONAL_INFO.socials.linkedin}</a></p>
            <p>Discord:  <a href={PERSONAL_INFO.socials.discord} target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:underline">{PERSONAL_INFO.socials.discord}</a></p>
          </div>
        );
        break;

      case 'matrix':
        setIsMatrixMode((prev) => !prev);
        output = (
          <p className="text-emerald-400 font-mono text-xs">
            {isMatrixMode ? 'Matrix mode disabled.' : 'Entering the Matrix... Wake up, Neo. 🟢'}
          </p>
        );
        break;

      case 'sudo':
        if (arg === 'hire' || arg === 'hire deepesh') {
          output = (
            <div className="space-y-1 text-zinc-200 font-mono text-xs">
              <p>✅ Access Granted: You made the best decision today!</p>
              <p className="text-zinc-300">Opening booking modal for intro call...</p>
              <p className="text-zinc-300">Direct Contact: {PERSONAL_INFO.email}</p>
            </div>
          );
        } else {
          output = <p className="text-zinc-400 text-xs">sudo: permission denied. Try &apos;sudo hire&apos; instead.</p>;
        }
        break;

      case 'theme':
        if (onToggleTheme) {
          onToggleTheme();
          output = <p className="text-zinc-300 text-xs font-mono">Theme toggled successfully.</p>;
        }
        break;

      case 'clear':
        setLogs([]);
        return;

      case 'exit':
        onClose();
        return;

      default:
        output = (
          <p className="text-zinc-400 text-xs font-mono">
            Command not found: <span className="font-bold text-white">{raw}</span>. Type <span className="text-white font-bold underline">help</span> for a list of commands.
          </p>
        );
    }

    setLogs((prev) => [...prev, { id: Math.random().toString(), command: raw, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(history[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= history.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className={`relative w-full ${isMaximized ? 'max-w-5xl h-[85vh]' : 'max-w-2xl h-[480px]'
            } bg-zinc-950/95 border border-zinc-700/80 rounded-xl shadow-2xl z-10 flex flex-col font-mono overflow-hidden transition-all duration-300 ${isMatrixMode ? 'text-emerald-400 border-emerald-500/40 shadow-emerald-500/10' : 'text-zinc-200'
            }`}
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 cursor-pointer" onClick={() => setIsMaximized((m) => !m)} />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 cursor-pointer" />
              <span className="text-xs text-zinc-400 font-semibold ml-2 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                deepesh@asyncbuild:~ (zsh)
              </span>
            </div>

            <div className="flex items-center gap-2 text-zinc-400">
              <button
                onClick={() => setIsMaximized((m) => !m)}
                className="p-1 rounded hover:bg-zinc-800 hover:text-white transition-colors"
                title={isMaximized ? 'Restore' : 'Maximize'}
              >
                {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded hover:bg-zinc-800 hover:text-white transition-colors"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal Output Body */}
          <div
            className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar text-xs leading-relaxed"
            onClick={() => inputRef.current?.focus()}
          >
            {logs.map((log) => (
              <div key={log.id} className="space-y-1">
                {log.command !== 'welcome' && (
                  <div className="flex items-center gap-2 text-zinc-500">
                    <span className="text-zinc-400">➜</span>
                    <span className="text-zinc-500">~</span>
                    <span className="text-white font-bold">{log.command}</span>
                  </div>
                )}
                <div>{log.output}</div>
              </div>
            ))}

            {/* Current Active Input Prompt */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-zinc-400 font-bold">➜</span>
              <span className="text-zinc-500 font-bold">~</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
                className="flex-1 bg-transparent text-white border-none outline-none font-mono text-xs caret-white"
                placeholder="type a command... (e.g. 'help', 'skills', 'projects')"
              />
            </div>
            <div ref={bottomRef} />
          </div>

          {/* Bottom Bar info */}
          <div className="px-4 py-1.5 bg-zinc-900/60 border-t border-zinc-800/80 text-[10px] text-zinc-500 flex justify-between">
            <span>Press Enter to run • ↑↓ for history</span>
            <span>Shortcut: Ctrl+T</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
