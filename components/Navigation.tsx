'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useCart } from '@/lib/cart';

const links = [
  { label: 'Home', href: '#top' },
  { label: 'Shop', href: '#shop' },
  { label: 'Collections', href: '#collection' },
  { label: 'About', href: '#story' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const { count, setOpen } = useCart();

  useMotionValueEvent(scrollY, 'change', (v) => setSolid(v > 80));

  useEffect(() => {
    document.body.style.overflow = menu || search ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menu, search]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(false);
        setSearch(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          solid
            ? 'border-b border-white/[0.06] bg-ink/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="shell flex h-[72px] items-center justify-between gap-6">
          <a
            href="#top"
            className="group flex items-baseline gap-2 text-[15px] font-semibold uppercase tracking-wide2"
          >
            <span className="relative">
              Atelier
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-bone transition-all duration-500 ease-silk group-hover:w-full" />
            </span>
            <span className="font-display text-[17px] italic lowercase tracking-normal text-white/60">
              noir
            </span>
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="group relative text-[12px] uppercase tracking-wide2 text-white/60 transition-colors duration-300 hover:text-bone"
                >
                  {l.label}
                  <span className="absolute -bottom-[6px] left-0 h-px w-0 bg-violet-glow transition-all duration-500 ease-silk group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 sm:gap-2">
            <IconButton label="Search" onClick={() => setSearch(true)}>
              <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none">
                <circle cx="9" cy="9" r="5.4" stroke="currentColor" strokeWidth="1.3" />
                <path d="m13.2 13.2 3.6 3.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </IconButton>
            <IconButton label="Account">
              <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none">
                <circle cx="10" cy="7" r="3.2" stroke="currentColor" strokeWidth="1.3" />
                <path d="M4 16.4c1-2.7 3.2-4.1 6-4.1s5 1.4 6 4.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </IconButton>
            <IconButton label="Cart" onClick={() => setOpen(true)}>
              <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none">
                <path d="M4.4 6.4h11.2l-1 9.2H5.4l-1-9.2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                <path d="M7.5 8V5.9a2.5 2.5 0 0 1 5 0V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    className="absolute -right-0.5 -top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-violet-glow px-1 text-[10px] font-semibold text-white"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </IconButton>

            <button
              aria-label="Menu"
              onClick={() => setMenu((m) => !m)}
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-bone transition-colors hover:bg-white/5 lg:hidden"
            >
              <span className="relative block h-[9px] w-[18px]">
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-transform duration-300 ${
                    menu ? 'top-[4px] rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-transform duration-300 ${
                    menu ? 'top-[4px] -rotate-45' : 'top-[8px]'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="shell flex h-full flex-col justify-center gap-2 pb-24">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenu(false)}
                  initial={{ y: 34, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-white/[0.07] py-5 text-[34px] font-medium tracking-mega"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {search && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] bg-ink/92 backdrop-blur-2xl"
            onClick={() => setSearch(false)}
          >
            <motion.div
              initial={{ y: -28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="shell pt-32"
            >
              <p className="eyebrow mb-5">Search the house</p>
              <input
                autoFocus
                placeholder="Try “field jacket”, “silk”, “chronograph”"
                className="w-full border-b border-white/15 bg-transparent pb-5 text-[28px] tracking-mega outline-none placeholder:text-white/25 focus:border-violet-glow sm:text-[44px]"
              />
              <div className="mt-8 flex flex-wrap gap-2.5">
                {['Outerwear', 'Silk', 'Footwear', 'Runway 26', 'Accessories'].map((t) => (
                  <button
                    key={t}
                    className="rounded-full border border-white/12 px-4 py-2 text-[11px] uppercase tracking-wide2 text-white/55 transition-colors hover:border-violet-glow/60 hover:text-bone"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function IconButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      aria-label={label}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 420, damping: 24 }}
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/[0.06] hover:text-bone"
    >
      {children}
    </motion.button>
  );
}
