'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/products';

export default function CartDrawer() {
  const { lines, open, setOpen, subtotal, remove, setQty, lineKey, count } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 z-[71] flex h-full w-full max-w-[420px] flex-col border-l border-white/[0.08] bg-ink-900"
          >
            <header className="flex items-center justify-between border-b border-white/[0.07] px-6 py-5">
              <div>
                <p className="text-[12px] uppercase tracking-wide2">Your bag</p>
                <p className="mt-1 text-[11px] text-white/35">
                  {count} {count === 1 ? 'item' : 'items'}
                </p>
              </div>
              <button
                aria-label="Close cart"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/[0.07] hover:text-bone"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <p className="font-display text-[26px] italic text-white/60">
                    Nothing here yet.
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-white/15 px-6 py-3 text-[11px] uppercase tracking-wide2 text-white/60 transition-colors hover:border-bone hover:text-bone"
                  >
                    Continue browsing
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-white/[0.06]">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => {
                      const k = lineKey(l);
                      return (
                        <motion.li
                          key={k}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="flex gap-4 overflow-hidden py-5"
                        >
                          <div className="relative h-[92px] w-[76px] shrink-0 rounded-[2px] bg-ink-800">
                            <Image
                              src={l.image}
                              alt={l.name}
                              fill
                              sizes="76px"
                              className="object-contain p-2"
                            />
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col justify-between">
                            <div>
                              <p className="truncate text-[14px] font-medium">{l.name}</p>
                              <p className="mt-1 text-[11px] uppercase tracking-wide2 text-white/35">
                                {l.color}
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 rounded-full border border-white/12 px-3 py-1.5">
                                <button
                                  aria-label="Decrease quantity"
                                  onClick={() => setQty(k, -1)}
                                  className="text-white/60 transition-colors hover:text-bone"
                                >
                                  −
                                </button>
                                <span className="min-w-[14px] text-center text-[12px] tabular-nums">
                                  {l.qty}
                                </span>
                                <button
                                  aria-label="Increase quantity"
                                  onClick={() => setQty(k, 1)}
                                  className="text-white/60 transition-colors hover:text-bone"
                                >
                                  +
                                </button>
                              </div>
                              <span className="text-[13px]">{formatPrice(l.price * l.qty)}</span>
                            </div>
                          </div>
                          <button
                            aria-label={`Remove ${l.name}`}
                            onClick={() => remove(k)}
                            className="self-start text-white/30 transition-colors hover:text-bone"
                          >
                            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                            </svg>
                          </button>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <footer className="border-t border-white/[0.07] px-6 py-6">
                <div className="flex items-center justify-between text-[14px]">
                  <span className="text-white/50">Subtotal</span>
                  <span className="text-[18px] tracking-tight">{formatPrice(subtotal)}</span>
                </div>
                <p className="mt-2 text-[11px] text-white/30">
                  Shipping and duties calculated at checkout.
                </p>
                <button className="mt-5 w-full rounded-full bg-bone py-4 text-[12px] font-semibold uppercase tracking-wide2 text-ink transition-colors duration-300 hover:bg-violet-glow hover:text-white">
                  Proceed to checkout
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
