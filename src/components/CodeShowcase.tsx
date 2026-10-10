import React, { useState } from 'react';
import { Code2, Copy, Check, Sparkles } from 'lucide-react';
import { SpotlightCard } from './ui/SpotlightCard';
import { useToast } from '../context/ToastContext';

interface CodeSnippet {
  id: string;
  name: string;
  language: string;
  description: string;
  code: string;
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: 'socket-router',
    name: 'whisprRoomRouter.ts',
    language: 'TypeScript',
    description: 'Room-scoped Socket.IO event router with client fingerprinting and sub-50ms stage broadcast pipeline.',
    code: `import { Server, Socket } from 'socket.io';

interface RoomSession {
  roomId: string;
  fingerprint: string;
  joinedAt: number;
}

export class WhisprRoomRouter {
  private activeRooms = new Map<string, Set<string>>();

  constructor(private io: Server) {}

  public handleConnection(socket: Socket) {
    socket.on('room:join', ({ roomId, fingerprint }: RoomSession) => {
      socket.join(roomId);

      if (!this.activeRooms.has(roomId)) {
        this.activeRooms.set(roomId, new Set());
      }
      this.activeRooms.get(roomId)!.add(fingerprint);

      // Broadcast real-time audience counter to stage projector
      const liveCount = this.activeRooms.get(roomId)!.size;
      this.io.to(roomId).emit('room:presence_sync', { liveCount });
    });

    socket.on('qa:submit_question', async ({ roomId, text, isAnon }) => {
      const payload = {
        id: crypto.randomUUID(),
        text: text.trim(),
        upvotes: 0,
        createdAt: Date.now(),
        isAnonymous: isAnon ?? true,
      };

      // Sub-50ms broadcast to audience & 4K stage projector
      this.io.to(roomId).emit('qa:new_question', payload);
    });
  }
}`,
  },
  {
    id: 'ranking-engine',
    name: 'democraticRanking.ts',
    language: 'TypeScript',
    description: 'In-memory dynamic question priority ranking with client-side single-vote integrity.',
    code: `interface QuestionItem {
  id: string;
  text: string;
  upvotes: number;
  timestamp: number;
}

export class DemocraticRanker {
  private questions = new Map<string, QuestionItem>();
  private voterRecords = new Set<string>(); // composite key: \`\${fingerprint}:\${questionId}\`

  public castVote(questionId: string, fingerprint: string): boolean {
    const voterKey = \`\${fingerprint}:\${questionId}\`;
    if (this.voterRecords.has(voterKey)) return false; // single-vote integrity

    const item = this.questions.get(questionId);
    if (!item) return false;

    item.upvotes += 1;
    this.voterRecords.add(voterKey);
    return true;
  }

  public getTopQuestions(limit = 10): QuestionItem[] {
    return Array.from(this.questions.values())
      .sort((a, b) => {
        if (b.upvotes !== a.upvotes) return b.upvotes - a.upvotes;
        return a.timestamp - b.timestamp; // FIFO on equal upvotes
      })
      .slice(0, limit);
  }
}`,
  },
];

export const CodeShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(SNIPPETS[0].id);
  const [copied, setCopied] = useState(false);
  const { copyToClipboard } = useToast();

  const currentSnippet = SNIPPETS.find((s) => s.id === activeTab) || SNIPPETS[0];

  const handleCopy = () => {
    copyToClipboard(currentSnippet.code, `Copied ${currentSnippet.name}!`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="showcase" className="space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-mono uppercase tracking-wider theme-text-faint flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-indigo-400" />
          Clean Architecture & Code Craft
        </h2>
        <span className="text-[11px] font-mono theme-text-faint">TypeScript • Production Patterns</span>
      </div>

      <SpotlightCard className="p-0 border theme-border overflow-hidden">
        {/* Code Tabs Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--subtle-bg)] border-b theme-border flex-wrap gap-2">
          <div className="flex items-center gap-2">
            {SNIPPETS.map((snippet) => (
              <button
                key={snippet.id}
                onClick={() => {
                  setActiveTab(snippet.id);
                }}
                className={`px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                  activeTab === snippet.id
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                    : 'theme-subtle hover:theme-text-title'
                }`}
              >
                {snippet.name}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded theme-subtle text-xs font-mono transition-all cursor-pointer active:scale-95 shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Code Description */}
        <div className="px-4 py-2 bg-[var(--card-bg)] border-b theme-border text-xs theme-text-muted flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-amber-500 dark:text-amber-400 shrink-0" />
          <span className="leading-relaxed">{currentSnippet.description}</span>
        </div>

        {/* Code Body - Sleek Dark Dev Box with High-Contrast Tokens */}
        <div className="p-4 bg-zinc-950 dark:bg-black/90 overflow-x-auto custom-scrollbar font-mono text-xs leading-relaxed text-zinc-200 border-t theme-border select-text">
          <pre>
            <code>{currentSnippet.code}</code>
          </pre>
        </div>
      </SpotlightCard>
    </section>
  );
};
