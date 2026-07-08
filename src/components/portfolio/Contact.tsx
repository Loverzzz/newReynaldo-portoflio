'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Mail, Linkedin, Phone, Send, Copy, Check,
  ExternalLink, MessageSquare, Sparkles, ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { profile } from '@/data/portfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast.success('Email copied!', { description: profile.email });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error('Failed to copy email address.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in all fields.');
      return;
    }
    setSending(true);
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    toast.success('Opening your email client…', { description: 'Your message is pre-filled and ready to send.' });
    setTimeout(() => setSending(false), 2000);
  };

  const whatsappUrl = `https://wa.me/${profile.phone.replace(/\D/g, '')}`;

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
      className="space-y-8"
    >
      {/* ── Top: Email Hero Card ── */}
      <motion.div variants={fadeUp}>
        <div className="relative overflow-hidden rounded-3xl border border-brand/25 bg-gradient-to-br from-brand/8 via-card/65 to-brand/4 backdrop-blur-xl p-8 shadow-xl shadow-brand/8">
          {/* Inset top highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent pointer-events-none" />
          {/* Background glow orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand/8 blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-52 h-52 rounded-full bg-brand/6 blur-2xl translate-y-1/2 -translate-x-1/4" />
          </div>

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* Big mail icon */}
              <motion.div
                className="p-4 rounded-2xl bg-brand/12 border border-brand/25 shadow-lg shadow-brand/15"
                whileHover={{ scale: 1.1, rotate: -8 }}
                transition={{ type: 'spring', stiffness: 320, damping: 18 }}
              >
                <Mail className="size-7 text-brand" />
              </motion.div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground mb-1">Primary Email</p>
                <p className="text-lg font-bold text-foreground break-all tracking-tight">{profile.email}</p>
                <p className="text-xs text-muted-foreground/80 mt-0.5">Click to open email client or copy below</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2.5 shrink-0">
              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.94 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm
                           hover:border-brand/45 hover:bg-brand/6 transition-all duration-300 text-sm font-semibold"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span key="check" initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} className="flex items-center gap-1.5 text-brand">
                      <Check className="size-4" /> Copied!
                    </motion.span>
                  ) : (
                    <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5">
                      <Copy className="size-4" /> Copy
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.a
                href={`mailto:${profile.email}`}
                whileHover={{ scale: 1.06, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand text-white
                           hover:bg-brand/90 shadow-lg shadow-brand/30 transition-all duration-300 text-sm font-semibold"
              >
                <Mail className="size-4" />
                Send Email
                <ArrowRight className="size-3.5" />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Middle: Quick Links ── */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            icon: Linkedin,
            label: 'LinkedIn',
            sub: 'Connect professionally',
            href: profile.linkedin,
            color: 'from-blue-500 to-indigo-600',
            glow: '99,102,241',
          },
          {
            icon: Phone,
            label: 'WhatsApp',
            sub: 'Chat instantly',
            href: whatsappUrl,
            color: 'from-green-500 to-emerald-600',
            glow: '16,185,129',
          },
        ].map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/70 backdrop-blur-sm p-5
                       hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10 transition-all duration-300"
          >
            {/* Glow on hover */}
            <div
              className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(circle, rgba(${item.glow},0.4) 0%, transparent 70%)` }}
            />
            <div className="relative flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-md`}>
                <item.icon className="size-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-foreground group-hover:text-brand transition-colors duration-300">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
              <ExternalLink className="size-4 text-muted-foreground group-hover:text-brand opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* ── Bottom: Contact Form ── */}
      <motion.div variants={fadeUp}>
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-lg">
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-border/40 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-brand/10 border border-brand/20">
              <MessageSquare className="size-4 text-brand" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">Send a Message</h3>
              <p className="text-xs text-muted-foreground">Pre-fills your email client — no server needed</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 text-[10px] font-medium text-brand bg-brand/10 px-2.5 py-1 rounded-full border border-brand/20">
              <Sparkles className="size-3" />
              Quick & Secure
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your Name
                </label>
                <Input
                  id="contact-name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  className="rounded-xl border-border/60 bg-muted/40 hover:border-brand/40 focus:border-brand/60 transition-colors duration-200"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your Email
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="you@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  className="rounded-xl border-border/60 bg-muted/40 hover:border-brand/40 focus:border-brand/60 transition-colors duration-200"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Message
              </label>
              <Textarea
                id="contact-message"
                placeholder="Hi Reynaldo, I'd love to connect about…"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                className="rounded-xl border-border/60 bg-muted/40 hover:border-brand/40 focus:border-brand/60 transition-colors duration-200 resize-none"
              />
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={sending}
                className="w-full rounded-xl bg-brand hover:bg-brand/90 text-white shadow-lg shadow-brand/25 font-semibold gap-2 transition-all duration-300"
              >
                {sending ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="size-4" />
                    </motion.div>
                    Opening email client…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="size-4" />
                    Send Message via Email
                    <ArrowRight className="size-3.5" />
                  </span>
                )}
              </Button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
