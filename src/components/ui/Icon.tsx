export const paths = {
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2',
  cash: 'M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2ZM12 14.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2',
  boxes: 'M3 8l9-4 9 4-9 4-9-4ZM3 8v8l9 4 9-4V8M12 12v8',
  pie: 'M12 3a9 9 0 1 0 9 9h-9V3ZM15.5 3.6A9 9 0 0 1 20.4 8.5',
  target: 'M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
  user: 'M12 11.4a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8M5 20a7 7 0 0 1 14 0',
  check: 'M4 12.5 9.2 18 20 6.5',
  x: 'M6 6l12 12M18 6 6 18',
  shield: 'M12 3l7.5 3v6c0 4.4-3.1 7.6-7.5 9-4.4-1.4-7.5-4.6-7.5-9V6L12 3Zm-3 9 2.2 2.2L15.5 10',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  gauge: 'M4 18a8 8 0 1 1 16 0M12 18l4.2-5',
  cog: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.2 5.2l2.1 2.1M16.7 16.7l2.1 2.1M18.8 5.2l-2.1 2.1M7.3 16.7l-2.1 2.1',
  growth: 'M3 17 9.5 10.5l3.5 3.5L21 6M15 6h6v6',
  doc: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5ZM14 3v5h5M9 13h6M9 17h4',
  handshake: 'M11 6 8 9l3 3 2-2 3 3-2 2 2 2M3 9h4M17 9h4',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9V16h7v-2.1A6 6 0 0 0 12 3Z',
  compass: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3.5-12.5-2 5.5-5.5 2 2-5.5 5.5-2Z',
  phone: 'M5 4h3.5l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L15 13l4 1.5V18a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 3 6.2 2 2 0 0 1 5 4Z',
  mail: 'M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm-2 2 9 6 9-6',
  pin: 'M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Zm0-8.4a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  book: 'M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2V5ZM8 3v18',
  layers: 'M12 3 3 8l9 5 9-5-9-5Zm-9 10 9 5 9-5',
  spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18',
} as const;

export type IconName = keyof typeof paths;

export default function Icon({ name, className = 'h-5 w-5' }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false" className={className}>
      <path d={paths[name]} />
    </svg>
  );
}

export function IconBadge({ name, tone = 'soft' }: { name: IconName; tone?: 'soft' | 'white' }) {
  return (
    <span className={`mb-4 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] text-limeInk ${
      tone === 'soft' ? 'bg-limeSoft' : 'bg-white'}`}>
      <Icon name={name} className="h-[21px] w-[21px]" />
    </span>
  );
}
