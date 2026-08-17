import Eyebrow from './Eyebrow';

export default function SectionHeading({
  eyebrow, title, lede, center = false, light = false, as: Tag = 'h2', size = 'lg',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  center?: boolean;
  light?: boolean;
  as?: 'h1' | 'h2';
  size?: 'xl' | 'lg' | 'md';
}) {
  const sizes = { xl: 'text-display-xl', lg: 'text-display-lg', md: 'text-display-md' };
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-[66ch]`}>
      {eyebrow && <div className="mb-4"><Eyebrow center={center} light={light}>{eyebrow}</Eyebrow></div>}
      <Tag className={`font-display font-semibold ${sizes[size]} ${light ? 'text-white' : 'text-charcoalDeep'}`}>{title}</Tag>
      {lede && (
        <p className={`mt-5 max-w-prose text-[1.05rem] leading-relaxed sm:text-[1.15rem] ${
          center ? 'mx-auto' : ''} ${light ? 'text-white/70' : 'text-charcoalSoft'}`}>{lede}</p>
      )}
    </div>
  );
}
