import type { ReactNode } from 'react';

export default function Card({
  children, tone = 'white', className = '', hover = true, as: Tag = 'div',
}: {
  children: ReactNode;
  tone?: 'white' | 'soft' | 'dark';
  className?: string;
  hover?: boolean;
  as?: 'div' | 'article' | 'li';
}) {
  const tones = {
    white: 'bg-white border-hair',
    soft: 'bg-limeSoft border-[#D6EBBE]',
    dark: 'bg-charcoalDeep border-charcoalDeep text-white/85',
  };
  return (
    <Tag className={`flex h-full flex-col rounded-xl border p-6 sm:p-7 transition-all duration-200 ${tones[tone]} ${
      hover ? 'motion-safe:hover:-translate-y-0.5 hover:border-hairStrong hover:shadow-card' : ''} ${className}`}>
      {children}
    </Tag>
  );
}
