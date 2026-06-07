'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Phone, Send, Copy, Check, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { profile } from '@/data/portfolio';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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

    // Build mailto link with form content
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`
    );

    const mailtoLink = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    toast.success('Opening your email client...', {
      description: 'Please send the email from your email app.',
    });
  };

  const contactCards = [
    {
      icon: Mail,
      title: 'Email',
      value: profile.email,
      action: 'copy' as const,
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'Visit Profile',
      href: profile.linkedin,
      action: 'link' as const,
    },
    {
      icon: Phone,
      title: 'WhatsApp',
      value: 'Chat on WhatsApp',
      href: `https://wa.me/${profile.phone.replace(/\+/g, '').replace(/\s/g, '')}`,
      action: 'link' as const,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Contact Cards */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          {contactCards.map((card) => (
            <Card
              key={card.title}
              className="hover:shadow-md transition-shadow duration-300"
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className="p-3 rounded-full bg-brand/10 text-brand shrink-0">
                  <card.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  {card.action === 'copy' ? (
                    <p className="font-medium truncate">{card.value}</p>
                  ) : (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-brand hover:underline truncate block"
                    >
                      {card.value}
                    </a>
                  )}
                </div>
                {card.action === 'copy' && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    className="shrink-0"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-brand" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Info card */}
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="p-3 rounded-full bg-brand/10 text-brand shrink-0">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Prefer to send a message?</p>
                <p className="text-sm text-muted-foreground">
                  Fill in the form, and your email app will open with the message ready to send.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="contact-name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="contact-message"
                    placeholder="Your message..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                  />
                </div>

                <Button type="submit" variant="default" className="w-full">
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send via Email
                  </span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
