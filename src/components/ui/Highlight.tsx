/**
 * Lime marker behind display text.
 *
 * #C0FF72 is too light to use as a text colour on white, so it is painted as a
 * bar behind the bottom of each line instead. Uses a gradient background with
 * box-decoration-break: clone so the highlight follows every line fragment and
 * wraps naturally on narrow screens — no whitespace-nowrap, no overflow.
 */
export default function Highlight({
  children,
  light,
  className = '',
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`${light ? 'text-white' : 'text-inherit'} [-webkit-box-decoration-break:clone] [box-decoration-break:clone] ${className}`}
      style={{
        backgroundImage: 'linear-gradient(to top, #C0FF72 15%, transparent 15%)',
        paddingInline: '0.06em',
        paddingBottom: '0.15em',
      }}
    >
      {children}
    </span>
  );
}
