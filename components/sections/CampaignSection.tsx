'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useIsomorphicLayoutEffect, usePrefersReducedMotion } from '@/lib/hooks';

export default function CampaignSection() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.to('[data-campaign-model]', {
          yPercent: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.7,
          },
        });
        gsap.to('[data-campaign-silk]', {
          yPercent: 22,
          xPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.1,
          },
        });
      }

      gsap.from('[data-campaign-line] > span', {
        yPercent: 110,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: 'top 68%' },
      });

      gsap.from('[data-campaign-fade]', {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 55%' },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="campaign"
      ref={root}
      className="relative flex min-h-[112svh] items-center overflow-hidden bg-ink-900 py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[10%] top-[18%] h-[70vh] w-[70vh] rounded-full glow-azure opacity-45" />
        <div className="absolute right-[6%] top-[6%] h-[48vh] w-[48vh] rounded-full glow-violet opacity-50" />
      </div>

      <div
        data-campaign-silk
        className="pointer-events-none absolute left-[-14%] top-[2%] h-[30vh] w-[46vw] max-w-[560px] opacity-70"
      >
        <Image
          src="/assets/fabric-white.png"
          alt=""
          fill
          sizes="52vw"
          className="object-contain mix-blend-screen"
        />
      </div>

      <div
        data-campaign-model
        className="pointer-events-none absolute bottom-[-4%] right-[-14%] h-[62vh] w-[110vw] max-w-[1020px] sm:right-[-8%] lg:bottom-[2%] lg:right-[-4%] lg:h-[70vh] lg:w-[60vw]"
      >
        <Image
          src="/assets/model-woman.png"
          alt="Model in the Atelier Noir silk cape"
          fill
          sizes="(max-width: 1024px) 110vw, 60vw"
          className="object-contain object-right-bottom drop-shadow-[0_40px_90px_rgba(0,0,0,0.7)]"
        />
      </div>

      <div className="shell relative z-10">
        <p data-campaign-fade className="eyebrow mb-7">
          Campaign 02 — In motion
        </p>

        <h2 className="display-xl text-[clamp(2.6rem,8.4vw,7.4rem)]">
          <span data-campaign-line className="reveal-line">
            <span>A wardrobe</span>
          </span>
          <span data-campaign-line className="reveal-line">
            <span>that moves</span>
          </span>
          <span data-campaign-line className="reveal-line">
            <span>
              with <em className="font-display italic text-white/60">you.</em>
            </span>
          </span>
        </h2>

        <div className="mt-12 flex max-w-[520px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p data-campaign-fade className="max-w-[330px] text-[14px] leading-relaxed text-white/50">
            Shot on location in Lisbon at first light. Cupro, silk-georgette and
            double-faced wool — fabrics chosen for how they behave in the wind.
          </p>
          <a
            data-campaign-fade
            href="#trending"
            className="group inline-flex shrink-0 items-center gap-3 text-[12px] uppercase tracking-wide2 text-bone"
          >
            Shop the look
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors duration-500 group-hover:border-violet-glow group-hover:bg-violet-glow/15">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
