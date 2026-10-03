import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Fade + translate-up on enter. Respects prefers-reduced-motion.
 * delay is in seconds.
 */
export default function Reveal({
  as = 'div',
  y = 32,
  x = 0,
  delay = 0,
  duration = 0.55,
  once = true,
  amount = 0.2,
  className = '',
  children,
  ...rest
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  if (reduce) {
    const Static = as;
    return <Static className={className} {...rest}>{children}</Static>;
  }
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Stagger wrapper: children should be <RevealItem>. gap = seconds between items (0.08-0.12). */
export function RevealGroup({ as = 'div', gap = 0.1, className = '', children, once = true, amount = 0.15, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  if (reduce) {
    const Static = as;
    return <Static className={className} {...rest}>{children}</Static>;
  }
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ as = 'div', y = 28, duration = 0.55, className = '', children, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  if (reduce) {
    const Static = as;
    return <Static className={className} {...rest}>{children}</Static>;
  }
  return (
    <Tag
      className={className}
      variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0, transition: { duration, ease: EASE } } }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
