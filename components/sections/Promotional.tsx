'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from '@/lib/gsap';
import { useIsomorphicLayoutEffect, usePrefersReducedMotion } from '@/lib/hooks';

function useCountdown(target: number) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setLeft(Math.max(0, target - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (left === null) return null;
  const d = Math.floor(left / 86400000);
  const h = Math.floor((left % 86400000) / 3600000);
  const m = Math.floor((left % 3600000) / 60000);
  const s = Math.floor((left % 60000) / 1000);
  return [
    { v: d, l: 'Days' },
    { v: h, l: 'Hrs' },
    { v: m, l: 'Min' },
    { v: s, l: 'Sec' },
  ];
}

export default function Promotional() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [target] = useState(() => Date.now() + 1000 * 60 * 60 * 74 + 1000 * 60 * 23);
  const parts = useCountdown(target);

  useIsomorphicLayoutEffect(() => {
    if (!root.current || reduced) return;
    const ctx = gsap.context(() => {
      gsap.to('[data-promo-torus]', {
        yPercent: -22,
        rotate: 24,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.9,
        },
      });
      gsap.to('[data-promo-piece]', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.1,
        },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="relative overflow-hidden py-20 sm:py-24">
      {/* marquee */}
      <div className="relative flex overflow-hidden border-y border-white/[0.07] py-5">
        <div className="flex shrink-0 animate-marquee gap-10 whitespace-nowrap will-change-transform">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0 items-center gap-10">
              {[
                'Limited edition',
                'Numbered 001—300',
                'Shipped in 48h',
                'Atelier Noir',
                'Capsule 09',
                'Made in Portugal',
              ].map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-10 text-[12px] uppercase tracking-wide3 text-white/35"
                >
                  {t}
                  <span className="h-1 w-1 rounded-full bg-violet-glow" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="shell mt-16">
        <div className="relative overflow-hidden rounded-[4px] border border-white/[0.07] bg-gradient-to-br from-ink-800 via-ink-900 to-ink px-6 py-14 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
          <div className="pointer-events-none absolute -left-24 top-1/2 h-[46vh] w-[46vh] -translate-y-1/2 rounded-full glow-azure opacity-50" />
          <div className="pointer-events-none absolute right-[18%] top-[-18%] h-[40vh] w-[40vh] rounded-full glow-violet opacity-45" />

          <div
            data-promo-torus
            className="pointer-events-none absolute right-[4%] top-[8%] hidden h-[200px] w-[200px] animate-drift md:block lg:h-[260px] lg:w-[260px]"
          >
            <Image src="/assets/torus.png" alt="" fill sizes="260px" className="object-contain" />
          </div>

          <div
            data-promo-piece
            className="pointer-events-none absolute -bottom-10 right-[2%] hidden h-[62%] w-[34%] lg:block"
          >
            <Image
              src="/assets/hoodie-ivory.png"
              alt=""
              fill
              sizes="34vw"
              className="object-contain object-bottom drop-shadow-[0_30px_70px_rgba(0,0,0,0.6)]"
            />
          </div>

          <div className="relative max-w-[640px]">
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-violet-glow/35 bg-violet-glow/10 px-4 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulseGlow rounded-full bg-violet-glow" />
              <span className="text-[10px] uppercase tracking-wide2 text-[#c9bcff]">
                Capsule 09 — releasing now
              </span>
            </div>

            <h2 className="display-xl text-[clamp(2.3rem,6.4vw,5.2rem)]">
              Three hundred
              <br />
              pieces. <em className="font-display italic text-white/60">Then gone.</em>
            </h2>

            <p className="mt-7 max-w-[420px] text-[14px] leading-relaxed text-white/50">
              Hand-numbered heavyweight loopback, dyed in a single run we will not
              repeat. Members get first access for 24 hours before public release.
            </p>

            {parts && (
              <div className="mt-10 flex gap-3 sm:gap-4">
                {parts.map((p) => (
                  <div
                    key={p.l}
                    className="min-w-[66px] rounded-[3px] border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-center sm:min-w-[80px]"
                  >
                    <p className="text-[24px] font-medium tracking-mega tabular-nums text-bone sm:text-[30px]">
                      {String(p.v).padStart(2, '0')}
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-wide2 text-white/35">
                      {p.l}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-10 flex flex-wrap gap-3">
              <motion.a
                href="#trending"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full bg-bone px-8 py-4 text-[12px] font-semibold uppercase tracking-wide2 text-ink transition-colors duration-300 hover:bg-violet-glow hover:text-white"
              >
                Claim your number
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full border border-white/15 px-8 py-4 text-[12px] font-semibold uppercase tracking-wide2 text-white/70 transition-colors duration-300 hover:border-white/40 hover:text-bone"
              >
                Become a member
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
