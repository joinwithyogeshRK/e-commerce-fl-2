'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const columns = [
  {
    title: 'Shop',
    links: ['New arrivals', 'Menswear', 'Womenswear', 'Footwear', 'Accessories', 'Gift cards'],
  },
  {
    title: 'Client care',
    links: ['Track an order', 'Shipping & delivery', 'Returns & exchanges', 'Size guide', 'Repairs', 'Contact us'],
  },
  {
    title: 'House',
    links: ['Our story', 'Sustainability', 'Ateliers', 'Careers', 'Press', 'Store locator'],
  },
];

const socials = ['Instagram', 'TikTok', 'Pinterest', 'YouTube'];

export default function NewsletterFooter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'done' | 'error'>('idle');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setState('error');
      return;
    }
    setState('done');
    setEmail('');
  };

  return (
    <footer id="contact" className="relative mt-10 overflow-hidden border-t border-white/[0.07]">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 glow-violet opacity-30" />

      {/* newsletter */}
      <div className="shell relative py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-6">The list</p>
            <h2 className="display-xl text-[clamp(2rem,4.6vw,3.6rem)]">
              Private access,
              <br />
              <em className="font-display italic text-white/65">before everyone else.</em>
            </h2>
          </div>

          <div className="lg:col-span-6 lg:pt-6">
            <form onSubmit={submit} className="relative">
              <div className="flex items-center gap-4 border-b border-white/15 pb-4 transition-colors focus-within:border-violet-glow">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state !== 'idle') setState('idle');
                  }}
                  placeholder="your@email.com"
                  aria-label="Email address"
                  className="w-full bg-transparent text-[18px] tracking-tight outline-none placeholder:text-white/25 sm:text-[22px]"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-bone px-6 py-3 text-[11px] font-semibold uppercase tracking-wide2 text-ink transition-colors duration-300 hover:bg-violet-glow hover:text-white"
                >
                  Subscribe
                </button>
              </div>

              <div className="mt-4 h-5">
                <AnimatePresence mode="wait">
                  {state === 'done' && (
                    <motion.p
                      key="done"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[12px] text-[#c9bcff]"
                    >
                      You are on the list. Capsule 09 opens to you first.
                    </motion.p>
                  )}
                  {state === 'error' && (
                    <motion.p
                      key="err"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[12px] text-[#ff8f8f]"
                    >
                      That email does not look right — try again.
                    </motion.p>
                  )}
                  {state === 'idle' && (
                    <motion.p
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[12px] text-white/30"
                    >
                      One letter a month. Unsubscribe in a click.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="rule" />

      {/* footer body */}
      <div className="shell relative grid gap-12 py-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <a href="#top" className="flex items-baseline gap-2 text-[16px] font-semibold uppercase tracking-wide2">
            Atelier
            <span className="font-display text-[19px] italic lowercase tracking-normal text-white/60">
              noir
            </span>
          </a>
          <p className="mt-5 max-w-[280px] text-[13px] leading-relaxed text-white/40">
            Nieuwstraat 22, Antwerp · 24 Rue Chapon, Paris · 3-11 Daikanyama, Tokyo
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {socials.map((s) => (
              <a
                key={s}
                href="#"
                className="rounded-full border border-white/12 px-4 py-2 text-[11px] uppercase tracking-wide2 text-white/50 transition-colors duration-300 hover:border-violet-glow/60 hover:text-bone"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="lg:col-span-2 lg:col-start-auto">
            <p className="text-[11px] uppercase tracking-wide2 text-white/35">{col.title}</p>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="group relative inline-block text-[13px] text-white/55 transition-colors duration-300 hover:text-bone"
                  >
                    {l}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-violet-glow transition-all duration-500 ease-silk group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="lg:col-span-2">
          <p className="text-[11px] uppercase tracking-wide2 text-white/35">Policies</p>
          <ul className="mt-5 space-y-3">
            {['Privacy', 'Terms of sale', 'Cookies', 'Accessibility', 'Modern slavery'].map((l) => (
              <li key={l}>
                <a href="#" className="text-[13px] text-white/55 transition-colors duration-300 hover:text-bone">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rule" />

      <div className="shell flex flex-col items-start justify-between gap-4 py-8 text-[11px] uppercase tracking-wide2 text-white/30 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Atelier Noir. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-glow" />
          Designed and built as a concept experience
        </p>
      </div>
    </footer>
  );
}
