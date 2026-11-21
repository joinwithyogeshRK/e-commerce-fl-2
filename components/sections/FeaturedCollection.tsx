'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { featured, formatPrice } from '@/lib/products';
import { useCart } from '@/lib/cart';
import { useIsomorphicLayoutEffect, useMediaQuery, usePrefersReducedMotion } from '@/lib/hooks';

export default function FeaturedCollection() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reduced = usePrefersReducedMotion();
  const { add } = useCart();

  useIsomorphicLayoutEffect(() => {
    if (!isDesktop || reduced || !root.current || !track.current) return;
    const ctx = gsap.context(() => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth + 96;

      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>('[data-slide]').forEach((slide) => {
        gsap.fromTo(
          slide.querySelector('[data-slide-img]'),
          { yPercent: 6 },
          {
            yPercent: -6,
            ease: 'none',
            scrollTrigger: {
              trigger: slide,
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, [isDesktop, reduced]);

  return (
    <section id="collection" ref={root} className="relative overflow-hidden bg-ink py-20 lg:h-[100svh] lg:py-0">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 glow-violet opacity-30" />

      <div className="relative flex h-full flex-col justify-center">
        <div className="shell flex items-end justify-between gap-6 pb-10 lg:pb-12 lg:pt-28">
          <div>
            <p className="eyebrow mb-4">Featured collection</p>
            <h2 className="display-xl text-[clamp(2.25rem,5.2vw,4.4rem)]">
              The Nocturne <em className="font-display italic text-white/70">Edit</em>
            </h2>
          </div>
          <p className="hidden max-w-[260px] text-[13px] leading-relaxed text-white/45 md:block">
            Six pieces, photographed as one continuous frame. Drag or scroll to move
            through the edit.
          </p>
        </div>

        <div
          ref={track}
          className="flex gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-8 lg:w-max lg:overflow-visible lg:px-12 lg:pb-0"
        >
          {featured.map((p, i) => (
            <article
              data-slide
              key={p.id}
              className="group relative flex h-[440px] w-[78vw] shrink-0 snap-center flex-col justify-end overflow-hidden rounded-[3px] border border-white/[0.07] bg-gradient-to-b from-ink-800 to-ink-900 p-6 sm:w-[340px] lg:h-[52vh] lg:max-h-[520px] lg:w-[380px]"
            >
              <span className="absolute left-6 top-6 z-10 text-[11px] tracking-wide2 text-white/30">
                {String(i + 1).padStart(2, '0')}
              </span>
              {p.badge && (
                <span className="absolute right-6 top-6 z-10 rounded-full border border-violet-glow/40 bg-violet-glow/10 px-3 py-1 text-[10px] uppercase tracking-wide2 text-[#c9bcff]">
                  {p.badge}
                </span>
              )}

              <div
                data-slide-img
                className="absolute inset-x-6 top-14 bottom-[168px] transition-transform duration-[900ms] ease-silk group-hover:scale-[1.06]"
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 1024px) 78vw, 380px"
                  className="object-contain drop-shadow-[0_26px_50px_rgba(0,0,0,0.55)]"
                />
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[220px] bg-gradient-to-t from-ink-900 via-ink-900/85 to-transparent" />
              <div className="relative z-10">
                <p className="text-[10px] uppercase tracking-wide2 text-white/35">
                  {p.category}
                </p>
                <h3 className="mt-2 text-[19px] font-medium leading-tight tracking-tight">
                  {p.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-[15px] text-bone">{formatPrice(p.price)}</span>
                  {p.compareAt && (
                    <span className="text-[13px] text-white/30 line-through">
                      {formatPrice(p.compareAt)}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => add(p)}
                  className="mt-5 w-full translate-y-2 rounded-full border border-white/15 bg-white/[0.03] py-3 text-[11px] uppercase tracking-wide2 text-white/70 opacity-0 transition-all duration-500 ease-silk hover:border-bone hover:bg-bone hover:text-ink group-hover:translate-y-0 group-hover:opacity-100 max-lg:translate-y-0 max-lg:opacity-100"
                >
                  Quick add
                </button>
              </div>
            </article>
          ))}

          <div className="hidden w-[320px] shrink-0 flex-col justify-center gap-5 pl-6 lg:flex">
            <p className="font-display text-[34px] italic leading-tight text-white/70">
              The full edit lives in store.
            </p>
            <a
              href="#trending"
              className="group inline-flex items-center gap-3 text-[12px] uppercase tracking-wide2 text-bone"
            >
              View all 42 pieces
              <span className="h-px w-10 bg-bone transition-all duration-500 ease-silk group-hover:w-16" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
