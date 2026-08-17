import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'outlineLight' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold tracking-tight ' +
  'transition-all duration-200 min-h-[48px] px-6 py-3 text-[0.975rem] leading-tight text-center ' +
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] ' +
  'focus-visible:outline-limeInk motion-safe:hover:-translate-y-0.5 disabled:opacity-50 ' +
  'disabled:pointer-events-none disabled:translate-y-0';

const variants: Record<Variant, string> = {
  primary: 'bg-lime text-charcoalDeep border border-[#AEF057] shadow-cta hover:bg-limeHover',
  outline: 'bg-transparent text-charcoalDeep border border-hairStrong hover:border-charcoalDeep hover:bg-offwhite',
  outlineLight: 'bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10',
  ghost: 'bg-transparent text-charcoalDeep underline underline-offset-4 decoration-hairStrong hover:decoration-charcoalDeep min-h-0 px-0 py-1',
};

const sizes = { md: '', sm: 'min-h-[40px] px-4 py-2 text-sm rounded-md' };

export type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  href?: string;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  'aria-label'?: string;
};

export default function Button({
  children, variant = 'primary', size = 'md', href, external,
  className = '', onClick, type = 'button', disabled, ...rest
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href && !disabled) {
    if (external || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
      const isHttp = href.startsWith('http');
      return (
        <a href={href} className={cls} onClick={onClick}
           {...(isHttp ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
          {children}
        </a>
      );
    }
    return <Link href={href} className={cls} onClick={onClick} {...rest}>{children}</Link>;
  }
  return <button type={type} className={cls} onClick={onClick} disabled={disabled} {...rest}>{children}</button>;
}
