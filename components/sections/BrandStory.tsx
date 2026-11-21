'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import {
  useInViewOnce,
  useIsomorphicLayoutEffect,
  useMediaQuery,
  usePrefersReducedMotion,
} from '@/lib/hooks';

const ShowcaseScene = dynamic(() => import('@/components/three/ShowcaseScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="h-10 w-10 animate-spin rounded-full border border-white/10 border-t-violet-glow" />
    </div>
  ),
});

const stats = [
  { value: '1998', label: 'Founded in Antwerp' },
  { value: '04', label: 'Ateliers worldwide' },
  { value: '92%', label: 'Traceable materials' },
];

export default function BrandStory() {
  const root = useRef<HTMLElement>(null);
  const sceneWrap = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(sceneWrap);
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useIsomorphicLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.to('[data-story-rack]', {
          yPercent: -16,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
        gsap.to('[data-story-silk]', {
          yPercent: 26,
          rotate: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      gsap.from('[data-story-reveal] > span', {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.07,
        ease: 'power4.out',
        scrollTrigger: { trigger: root.current, start: 'top 62%' },
      });

      gsap.from('[data-story-stat]', {
        opacity: 0,
        y: 22,
        duration: 0.8,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-story-stats]', start: 'top 85%' },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="story" ref={root} className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute right-[-10%] top-[12%] h-[60vh] w-[60vh] rounded-full glow-violet opacity-40" />

      <div
        data-story-silk
        className="pointer-events-none absolute left-[-10%] top-[2%] h-[32vh] w-[60vw] max-w-[720px] opacity-70"
      >
        <Image src="/assets/fabric-blue.png" alt="" fill sizes="60vw" className="object-contain mix-blend-screen" />
      </div>

      <div className="shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* asymmetric image column */}
          <div className="relative lg:col-span-7">
            <div data-story-rack className="relative aspect-[5/4] w-full">
              <Image
                src="/assets/rack.png"
                alt="A rail of Atelier Noir outerwear in the Antwerp studio"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
              />
            </div>

            <div
              ref={sceneWrap}
              className="absolute -bottom-14 right-[2%] h-[180px] w-[180px] sm:h-[210px] sm:w-[210px] lg:-bottom-20 lg:-right-10"
            >
              {inView && <ShowcaseScene interactive={!reduced && !isMobile} />}
              <span className="pointer-events-none absolute inset-x-0 -bottom-4 text-center text-[10px] uppercase tracking-wide2 text-white/35">
                {reduced || isMobile ? 'Material study' : 'Drag to rotate'}
              </span>
            </div>
          </div>

          {/* editorial column */}
          <div className="lg:col-span-5 lg:pl-6">
            <p className="eyebrow mb-7">The house</p>
            <h2 className="display-xl text-[clamp(2.2rem,5vw,4rem)]">
              <span data-story-reveal className="reveal-line">
                <span>We cut for</span>
              </span>
              <span data-story-reveal className="reveal-line">
                <span>
                  the <em className="font-display italic text-white/65">long</em>
                </span>
              </span>
              <span data-story-reveal className="reveal-line">
                <span>run.</span>
              </span>
            </h2>

            <div className="mt-8 space-y-5 text-[14px] leading-relaxed text-white/50">
              <p>
                Atelier Noir began in a single Antwerp workroom with one rule: make
                fewer things, and make them properly. Three decades on, that rule still
                decides everything — the mills we buy from, the patterns we keep,
                the pieces we refuse to produce.
              </p>
              <p>
                Each garment carries a traceable identity. Scan the inner label and you
                will see the farm, the mill, the cutter and the finisher who put their
                hands on it.
              </p>
            </div>

            <div data-story-stats className="mt-12 grid grid-cols-3 gap-6 border-t border-white/[0.08] pt-8">
              {stats.map((s) => (
                <div data-story-stat key={s.label}>
                  <p className="text-[26px] font-medium tracking-mega text-bone">{s.value}</p>
                  <p className="mt-1.5 text-[11px] uppercase tracking-wide2 text-white/35">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="group mt-10 inline-flex items-center gap-3 text-[12px] uppercase tracking-wide2 text-bone"
            >
              Read the manifesto
              <span className="h-px w-10 bg-bone transition-all duration-500 ease-silk group-hover:w-16" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
