import React, { useState } from 'react';
import { Calendar, X, CheckCircle2, User, Mail, Sparkles, Video } from 'lucide-react';

interface CalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalModal: React.FC<CalModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('2026-08-04');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const dates = [
    { label: 'Mon, Aug 3', value: '2026-08-03' },
    { label: 'Tue, Aug 4', value: '2026-08-04' },
    { label: 'Wed, Aug 5', value: '2026-08-05' },
    { label: 'Thu, Aug 6', value: '2026-08-06' },
  ];

  const timeSlots = [
    '09:30 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsBooked(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-lg theme-card-solid shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b theme-border bg-[var(--subtle-bg)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-500">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold theme-text-title flex items-center gap-2">
                Book a 1-on-1 Intro Call
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                  Cal.com Integration
                </span>
              </h3>
              <p className="text-xs theme-text-muted mt-0.5">30 min video call • Architecture, projects & advisory</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md theme-text-faint hover:theme-text-title hover:theme-subtle transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {isBooked ? (
          <div className="p-10 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center border border-emerald-500/40 animate-bounce">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-semibold theme-text-title">Intro Call Scheduled!</h4>
            <p className="text-xs theme-text-muted max-w-md">
              A Google Meet video invitation has been sent to <span className="theme-text-title font-medium">{email}</span> for <span className="text-indigo-500 font-medium">{selectedDate} at {selectedTime}</span>.
            </p>
            <button
              onClick={() => {
                setIsBooked(false);
                onClose();
              }}
              className="mt-4 px-5 py-2 rounded-md theme-btn-primary font-semibold text-xs transition-all shadow-sm cursor-pointer"
            >
              Done & Return to Portfolio
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Left Column: Date & Time Picker */}
            <div className="space-y-4 border-b md:border-b-0 md:border-r theme-border pb-6 md:pb-0 md:pr-6">
              <div>
                <label className="block text-xs font-mono uppercase theme-text-faint mb-2">1. Select Date</label>
                <div className="grid grid-cols-2 gap-2">
                  {dates.map((d) => (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => setSelectedDate(d.value)}
                      className={`px-3 py-2 rounded-md text-xs font-medium border text-left transition-all cursor-pointer ${selectedDate === d.value
                          ? 'bg-indigo-500/15 text-indigo-500 font-semibold border-indigo-500 shadow-sm'
                          : 'theme-subtle'
                        }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase theme-text-faint mb-2">2. Select Time (PST)</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`px-2 py-1.5 rounded-md text-xs font-mono border text-center transition-all cursor-pointer ${selectedTime === t
                          ? 'bg-emerald-500/15 text-emerald-500 font-semibold border-emerald-500 shadow-sm'
                          : 'theme-subtle'
                        }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[11px] theme-text-faint flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-indigo-500" />
                <span>Google Meet link auto-generated</span>
              </div>
            </div>

            {/* Right Column: User Details */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <label className="block text-xs font-mono uppercase theme-text-faint">3. Your Details</label>

                <div>
                  <div className="relative">
                    <User className="w-4 h-4 theme-text-faint absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 bg-[var(--subtle-bg)] border theme-border rounded-md text-xs theme-text-title placeholder:theme-text-faint focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Mail className="w-4 h-4 theme-text-faint absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="your.email@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 bg-[var(--subtle-bg)] border theme-border rounded-md text-xs theme-text-title placeholder:theme-text-faint focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    rows={3}
                    placeholder="Topic / Notes (Optional: project idea, tech stack, timeframe...)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-2.5 bg-[var(--subtle-bg)] border theme-border rounded-md text-xs theme-text-title placeholder:theme-text-faint focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-md theme-btn-primary font-semibold text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Confirm Booking ({selectedTime})
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
