'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { trending } from '@/lib/products';
import ProductCard from '@/components/ui/ProductCard';
import SectionHeading from '@/components/ui/SectionHeading';

const filters = ['All', 'Menswear', 'Womenswear', 'Footwear', 'Accessories'];

export default function TrendingProducts() {
  const [filter, setFilter] = useState('All');
  const list =
    filter === 'All' ? trending : trending.filter((p) => p.category === filter);

  return (
    <section id="trending" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Trending now"
          title={
            <>
              Moving <em className="font-display italic text-white/70">fast.</em>
            </>
          }
          aside="Updated every Monday from in-store and online demand across all regions."
        />

        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-wide2 transition-colors duration-300 ${
                filter === f
                  ? 'border-bone bg-bone text-ink'
                  : 'border-white/12 text-white/50 hover:border-white/35 hover:text-bone'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4"
        >
          {list.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </motion.div>

        {list.length === 0 && (
          <p className="mt-16 text-center text-sm text-white/40">
            Nothing in this category yet — the next drop lands Friday.
          </p>
        )}

        <div className="mt-16 flex justify-center">
          <a
            href="#collection"
            className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-8 py-4 text-[11px] uppercase tracking-wide2 text-white/70 transition-colors duration-300 hover:border-bone hover:text-bone"
          >
            Load the full catalogue
            <span className="h-px w-8 bg-current transition-all duration-500 ease-silk group-hover:w-12" />
          </a>
        </div>
      </div>
    </section>
  );
}
