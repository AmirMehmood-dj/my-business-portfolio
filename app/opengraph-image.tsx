import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Aamir Mehmood — Website & Application Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #1D4ED8 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 100px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decorative circles */}
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'rgba(37,99,235,0.15)', display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: '-150px', right: '200px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'rgba(37,99,235,0.1)', display: 'flex',
        }} />

        {/* Available badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.4)',
          borderRadius: '50px', padding: '8px 20px', marginBottom: '32px',
        }}>
          <div style={{
            width: '10px', height: '10px', borderRadius: '50%',
            background: '#22C55E',
          }} />
          <span style={{ color: '#22C55E', fontSize: '18px', fontWeight: '600' }}>
            Available for Work
          </span>
        </div>

        {/* Name */}
        <div style={{
          fontSize: '72px', fontWeight: '800', color: '#FFFFFF',
          lineHeight: '1.1', marginBottom: '16px', letterSpacing: '-1px',
        }}>
          Aamir Mehmood
        </div>

        {/* Title */}
        <div style={{
          fontSize: '28px', fontWeight: '500', color: '#93C5FD',
          marginBottom: '40px', letterSpacing: '0px',
        }}>
          Website & Application Developer · AI Prompt Engineer
        </div>

        {/* Skills chips */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['React', 'Next.js', 'TypeScript', 'React Native', 'Node.js', 'AI'].map(skill => (
            <div key={skill} style={{
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '12px', padding: '8px 20px',
              color: '#CBD5E1', fontSize: '18px', fontWeight: '500',
              display: 'flex',
            }}>
              {skill}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div style={{
          position: 'absolute', bottom: '60px', right: '100px',
          fontSize: '22px', color: 'rgba(148,163,184,0.7)', fontWeight: '500',
        }}>
          aamirmehmood.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
