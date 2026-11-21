'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useIsomorphicLayoutEffect, useMediaQuery, usePrefersReducedMotion } from '@/lib/hooks';

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useIsomorphicLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.from('[data-hero-line] > span', {
          yPercent: 115,
          duration: 1.25,
          ease: 'power4.out',
          stagger: 0.09,
          delay: 0.25,
        });
        gsap.from('[data-hero-fade]', {
          y: 26,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.75,
        });
        gsap.from('[data-hero-model]', {
          scale: 1.12,
          opacity: 0,
          duration: 1.8,
          ease: 'power3.out',
          delay: 0.1,
        });
      }

      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
        animation: gsap
          .timeline()
          .to('[data-hero-copy]', { yPercent: -28, opacity: 0.15, ease: 'none' }, 0)
          .to('[data-hero-model]', { yPercent: 12, scale: 1.06, ease: 'none' }, 0)
          .to('[data-hero-veil]', { opacity: 1, ease: 'none' }, 0),
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden pb-10 pt-24 sm:pb-14"
    >
      {/* atmospheric base */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-[12%] top-[8%] h-[62vh] w-[62vh] rounded-full glow-violet opacity-70 blur-[12px] animate-pulseGlow" />
        <div className="absolute -right-[8%] bottom-[-10%] h-[58vh] w-[58vh] rounded-full glow-azure opacity-60 blur-[14px]" />
      </div>

      {/* 3D layer */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <HeroScene quality={isMobile ? 'low' : 'high'} interactive={!reduced} />
      </div>

      {/* model */}
      <div
        data-hero-model
        className="pointer-events-none absolute bottom-0 right-[-6%] z-[2] h-[36vh] w-[56vw] max-w-[640px] sm:right-[-2%] sm:h-[72vh] sm:w-[62vw] lg:right-[6%] lg:h-[86vh] lg:w-[46vw]"
      >
        <div className="relative h-full w-full">
          <Image
            src="/assets/model-man.png"
            alt="Model wearing the Atelier Noir layered hoodie and field jacket"
            fill
            priority
            sizes="(max-width: 768px) 78vw, 46vw"
            className="object-contain object-bottom drop-shadow-[0_40px_80px_rgba(0,0,0,0.75)]"
          />
        </div>
      </div>

      <div
        data-hero-veil
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[66vh] bg-gradient-to-t from-ink via-ink/88 to-transparent opacity-95 sm:h-[46vh] sm:via-ink/75 sm:opacity-75 lg:h-[38vh] lg:via-ink/70 lg:opacity-60"
      />

      {/* copy */}
      <div className="shell relative z-10 w-full" data-hero-copy>
        <div className="max-w-[820px]">
          <div data-hero-fade className="mb-7 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-glow" />
            <span className="eyebrow">Autumn / Winter 2026 — Campaign 01</span>
          </div>

          <h1 className="display-xl text-[clamp(2.9rem,10vw,8.6rem)]">
            <span data-hero-line className="reveal-line">
              <span>Wear</span>
            </span>
            <span data-hero-line className="reveal-line">
              <span>
                Your{' '}
                <em className="font-display italic text-transparent bg-clip-text bg-gradient-to-br from-bone via-[#bdaaff] to-[#5e7bff]">
                  Style.
                </em>
              </span>
            </span>
          </h1>

          <p
            data-hero-fade
            className="mt-7 max-w-[280px] text-[14px] leading-relaxed text-white/55 sm:max-w-[430px] sm:text-base"
          >
            Sculptural outerwear, fluid silk and hardware built to outlast the season.
            A wardrobe designed for the people who make the street look good.
          </p>

          <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
            <motion.a
              href="#shop"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              className="group relative overflow-hidden rounded-full bg-bone px-8 py-4 text-[12px] font-semibold uppercase tracking-wide2 text-ink"
            >
              <span className="relative z-10">Shop the collection</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#7b5cff] to-[#2f6bff] transition-transform duration-500 ease-silk group-hover:translate-x-0" />
              <span className="absolute inset-0 z-10 flex items-center justify-center text-bone opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Shop the collection
              </span>
            </motion.a>

            <motion.a
              href="#campaign"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              className="rounded-full border border-white/15 px-8 py-4 text-[12px] font-semibold uppercase tracking-wide2 text-white/75 transition-colors duration-300 hover:border-white/40 hover:text-bone"
            >
              Watch the film
            </motion.a>
          </div>

          <div
            data-hero-fade
            className="mt-11 flex items-center gap-6 text-[11px] uppercase tracking-wide2 text-white/40"
          >
            <span className="text-bone">012</span>
            <span className="h-px w-16 bg-white/20" />
            <span>Looks in campaign 01</span>
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
      >
        <span className="text-[10px] uppercase tracking-wide3 text-white/35">Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-white/15">
          <motion.span
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-x-0 h-1/2 bg-violet-glow"
          />
        </span>
      </motion.div>
    </section>
  );
}
