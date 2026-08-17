export default function Eyebrow({ children, center = false, light = false }: {
  children: React.ReactNode; center?: boolean; light?: boolean;
}) {
  return (
    <p className={`flex items-center gap-2.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.2em] ${
      light ? 'text-lime' : 'text-limeInk'} ${center ? 'justify-center' : ''}`}>
      <span aria-hidden className={`h-0.5 w-5 shrink-0 ${light ? 'bg-lime' : 'bg-limeInk'}`} />
      {children}
    </p>
  );
}
