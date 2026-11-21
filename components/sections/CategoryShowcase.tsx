'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { categories } from '@/lib/products';
import SectionHeading from '@/components/ui/SectionHeading';

export default function CategoryShowcase() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);

  return (
    <section id="shop" ref={root} className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Shop by category"
          title={
            <>
              Four doors into
              <br />
              the <em className="font-display italic text-white/70">house.</em>
            </>
          }
          aside="Every piece is produced in limited runs across four ateliers in Milan, Porto and Kyoto."
        />
      </div>

      {/* desktop: expanding editorial panels */}
      <div className="mt-16 hidden h-[72vh] max-h-[720px] w-full gap-2 px-5 lg:flex lg:px-12">
        {categories.map((c, i) => (
          <motion.a
            key={c.name}
            href="#trending"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            animate={{ flexGrow: active === i ? 2.6 : 1 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="group relative block h-full basis-0 overflow-hidden rounded-[2px]"
          >
            <div
              className={`absolute inset-0 transition-colors duration-700 ${
                active === i ? 'bg-ink-700' : 'bg-ink-900'
              }`}
            />
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${
                active === i ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 glow-violet opacity-50" />
            </div>

            <div className="absolute inset-x-0 bottom-0 top-10 flex items-end justify-center">
              <div className="relative h-[82%] w-[88%]">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="40vw"
                  className={`object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] transition-transform duration-[900ms] ease-silk ${
                    active === i ? 'scale-105' : 'scale-[0.88] opacity-90'
                  }`}
                />
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7">
              <div>
                <p className="text-[11px] uppercase tracking-wide2 text-white/40">
                  {c.count}
                </p>
                <h3 className="mt-2 text-[34px] font-medium leading-none tracking-mega">
                  {c.name}
                </h3>
                <p
                  className={`mt-3 max-w-[260px] text-[13px] text-white/50 transition-all duration-700 ${
                    active === i
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-2 opacity-0'
                  }`}
                >
                  {c.blurb}
                </p>
              </div>
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                  active === i
                    ? 'border-violet-glow bg-violet-glow/15 text-bone'
                    : 'border-white/15 text-white/40'
                }`}
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none">
                  <path d="M4.5 11.5 11.5 4.5M11.5 4.5H5.8M11.5 4.5v5.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>

            <span className="absolute left-0 top-0 h-full w-px bg-white/[0.06]" />
          </motion.a>
        ))}
      </div>

      {/* mobile: stacked editorial rows */}
      <div className="mt-12 flex flex-col gap-3 px-5 lg:hidden">
        {categories.map((c) => (
          <a
            key={c.name}
            href="#trending"
            className="group relative flex h-[210px] items-end overflow-hidden rounded-[2px] bg-ink-900"
          >
            <div className="absolute right-3 top-0 h-full w-[46%]">
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="46vw"
                className="object-contain object-bottom"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
            <div className="relative p-6">
              <p className="text-[10px] uppercase tracking-wide2 text-white/40">{c.count}</p>
              <h3 className="mt-1.5 text-[28px] font-medium tracking-mega">{c.name}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
