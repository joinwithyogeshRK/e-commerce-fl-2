'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { formatPrice, type Product } from '@/lib/products';
import { useCart, useWishlist } from '@/lib/cart';

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const [color, setColor] = useState(product.colors[0]?.name ?? 'Default');
  const { add } = useCart();
  const { toggle, has } = useWishlist();
  const wished = has(product.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay: (index % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-gradient-to-b from-ink-800 to-ink-900">
        <div className="absolute left-1/2 top-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 glow-violet opacity-0 transition-opacity duration-700 group-hover:opacity-60" />

        <Image
          src={product.image}
          alt={product.name}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-7 transition-transform duration-[900ms] ease-silk group-hover:scale-[1.07]"
        />

        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full border border-white/12 bg-ink/70 px-3 py-1 text-[10px] uppercase tracking-wide2 text-white/70 backdrop-blur-sm">
            {product.badge}
          </span>
        )}

        <button
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() => toggle(product.id)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-white/50 transition-colors duration-300 hover:bg-white/[0.07] hover:text-bone"
        >
          <svg viewBox="0 0 20 20" className="h-[17px] w-[17px]" fill={wished ? '#7b5cff' : 'none'}>
            <path
              d="M10 16.2s-5.7-3.5-5.7-7.3A3.2 3.2 0 0 1 10 6.9a3.2 3.2 0 0 1 5.7 2c0 3.8-5.7 7.3-5.7 7.3Z"
              stroke={wished ? '#7b5cff' : 'currentColor'}
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-500 ease-silk group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100">
          <button
            onClick={() => add(product, color)}
            className="w-full rounded-full bg-bone/95 py-3 text-[11px] font-semibold uppercase tracking-wide2 text-ink backdrop-blur transition-colors duration-300 hover:bg-violet-glow hover:text-white"
          >
            Add to bag
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-wide2 text-white/35">
            {product.category}
          </p>
          <h3 className="mt-1.5 text-[15px] font-medium leading-snug">{product.name}</h3>
          <div className="mt-1.5 flex items-baseline gap-2.5">
            <span className={`text-[14px] ${product.compareAt ? 'text-[#c9bcff]' : 'text-white/75'}`}>
              {formatPrice(product.price)}
            </span>
            {product.compareAt && (
              <span className="text-[12px] text-white/30 line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 gap-1.5 pt-6">
          {product.colors.map((c) => (
            <button
              key={c.name}
              aria-label={c.name}
              title={c.name}
              onClick={() => setColor(c.name)}
              className={`h-[14px] w-[14px] rounded-full border transition-all duration-300 ${
                color === c.name
                  ? 'scale-110 border-bone'
                  : 'border-white/20 hover:border-white/50'
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>
    </motion.article>
  );
}
