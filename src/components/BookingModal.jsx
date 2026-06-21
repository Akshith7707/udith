import { useState } from 'react';
import { X } from 'lucide-react';

export default function BookingModal({ mentor, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', slot: 'weekday-morning' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookings = JSON.parse(localStorage.getItem('nexus-bookings') || '[]');
    bookings.push({ ...form, mentorId: mentor.id, mentorName: mentor.name, at: new Date().toISOString() });
    localStorage.setItem('nexus-bookings', JSON.stringify(bookings));
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'color-mix(in srgb, var(--text) 35%, transparent)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6 page-enter"
        style={{ background: 'var(--bg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>
            Book session
          </h3>
          <button type="button" onClick={onClose} className="focus-ring w-8 h-8 rounded-full inline-flex items-center justify-center">
            <X size={16} />
          </button>
        </div>

        {submitted ? (
          <p style={{ color: 'var(--text-muted)' }}>
            Request sent for <strong style={{ color: 'var(--text)' }}>{mentor.name}</strong>. They will email you at {form.email}.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Session with {mentor.name} · {mentor.title}
            </p>
            <div>
              <label className="text-sm block mb-1" style={{ color: 'var(--text-muted)' }}>Name</label>
              <input className="ui-input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="text-sm block mb-1" style={{ color: 'var(--text-muted)' }}>Email</label>
              <input type="email" className="ui-input" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="text-sm block mb-1" style={{ color: 'var(--text-muted)' }}>Preferred slot</label>
              <select className="ui-select" value={form.slot} onChange={(e) => setForm({ ...form, slot: e.target.value })}>
                <option value="weekday-morning">Weekday morning</option>
                <option value="weekday-evening">Weekday evening</option>
                <option value="weekend">Weekend</option>
              </select>
            </div>
            <button type="submit" className="ui-btn ui-btn-primary w-full">Send request</button>
          </form>
        )}
      </div>
    </div>
  );
}
