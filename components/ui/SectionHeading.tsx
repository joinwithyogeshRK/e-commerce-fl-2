'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  aside,
  align = 'left',
}: {
  eyebrow: string;
  title: ReactNode;
  aside?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={`flex flex-col gap-8 ${
        align === 'center'
          ? 'items-center text-center'
          : 'md:flex-row md:items-end md:justify-between'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="eyebrow mb-5">{eyebrow}</p>
        <h2 className="display-xl text-[clamp(2.25rem,5.6vw,4.6rem)]">{title}</h2>
      </motion.div>

      {aside && (
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[320px] text-[14px] leading-relaxed text-white/45"
        >
          {aside}
        </motion.p>
      )}
    </div>
  );
}
