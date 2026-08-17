import type { Config } from 'tailwindcss';

/**
 * Brand colours are taken directly from the Finnpulse Advisors logo.
 * Do not introduce new brand hues without sign-off.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#4E4D4B',      // primary brand — headings, nav, body text
        charcoalDeep: '#3B3A38',  // derived: dark bands + footer, for depth
        charcoalSoft: '#6E6C68',  // derived: secondary body copy
        muted: '#8D8B85',         // derived: captions, meta
        lime: '#C0FF72',          // accent — CTAs, highlights, progress
        limeHover: '#D3FF9B',     // derived: hover state
        limeInk: '#4C7A1C',       // derived: accessible green for TEXT on light
        limeSoft: '#EEF8E3',      // soft accent — card + section tints
        offwhite: '#F7F7F7',      // base background
        hair: '#E5E5E0',          // derived: hairline borders
        hairStrong: '#D3D3CC',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Source Serif 4"', '"Bodoni Moda"', 'Didot', '"Bodoni MT"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.25rem,1.5rem + 3.1vw,3.9rem)', { lineHeight: '1.06', letterSpacing: '-0.015em' }],
        'display-lg': ['clamp(1.9rem,1.35rem + 2.2vw,2.95rem)', { lineHeight: '1.08', letterSpacing: '-0.012em' }],
        'display-md': ['clamp(1.5rem,1.15rem + 1.4vw,2.1rem)', { lineHeight: '1.14', letterSpacing: '-0.01em' }],
      },
      maxWidth: { wrap: '1440px', prose: '75ch' },
      boxShadow: {
        card: '0 1px 2px rgba(59,58,56,.04), 0 14px 34px -18px rgba(59,58,56,.22)',
        lift: '0 2px 6px rgba(59,58,56,.05), 0 30px 64px -26px rgba(59,58,56,.32)',
        cta: '0 8px 20px -8px rgba(125,175,60,.75)',
      },
      keyframes: {
        beat: { '0%': { boxShadow: '0 0 0 0 rgba(125,175,60,.45)' }, '70%': { boxShadow: '0 0 0 9px rgba(125,175,60,0)' }, '100%': { boxShadow: '0 0 0 0 rgba(125,175,60,0)' } },
        rise: { from: { opacity: '0', transform: 'translateY(18px)' }, to: { opacity: '1', transform: 'none' } },
        drawIn: { from: { strokeDashoffset: '1000' }, to: { strokeDashoffset: '0' } },
      },
      animation: { beat: 'beat 2.4s ease-out infinite', rise: 'rise .6s cubic-bezier(.22,1,.36,1) both', drawIn: 'drawIn 1.8s ease forwards' },
    },
  },
  plugins: [],
};
export default config;
