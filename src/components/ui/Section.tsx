import type { ReactNode } from 'react';

const tones = {
  white: 'bg-white text-charcoal',
  offwhite: 'bg-offwhite text-charcoal',
  soft: 'bg-limeSoft text-charcoal',
  dark: 'bg-charcoalDeep text-white/85',
};

export default function Section({
  children, tone = 'white', className = '', narrow = false, id, tight = false,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
  narrow?: boolean;
  id?: string;
  tight?: boolean;
}) {
  return (
    <section id={id} className={`${tones[tone]} ${tight ? 'py-10 sm:py-14' : 'py-16 sm:py-20 lg:py-24'} ${className}`}>
      <div className={`mx-auto px-5 sm:px-8 ${narrow ? 'max-w-3xl' : 'max-w-wrap'}`}>{children}</div>
    </section>
  );
}
