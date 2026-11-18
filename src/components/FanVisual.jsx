export default function FanVisual({ isOn, speed }) {
  // Speed maps 1-100 to animation duration: 100% -> 0.22s, 1% -> 3.2s
  const duration = isOn && speed > 0 ? (3.2 - (speed / 100) * 2.98).toFixed(2) : 2;

  return (
    <div className="w-full max-w-sm h-full max-h-sm flex justify-center pt-0 md:pt-16">
      <div className="relative w-80 h-80 flex items-center justify-center overflow-hidden md:overflow-visible">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Center Hub */}
          <div className="absolute md:w-[100px] w-20 h-20 md:h-[100px] rounded-full bg-[#333f52] flex items-center justify-center z-10">
            <div
              className="md:w-20 w-14 h-14 md:h-20 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(to bottom right, #4c596e, rgba(16, 24, 40, 0.9))',
              }}
            >
              <div
                className="w-8 md:w-14 h-8 md:h-14 rounded-full"
                style={{
                  background: 'linear-gradient(to bottom right, #364153, #101828)',
                }}
              />
            </div>
          </div>

          {/* SVG Blades with Dynamic Rotation */}
          <svg
            className={`absolute md:w-96 md:h-96 fan-rotor${isOn && speed > 0 ? ' is-spinning' : ''}`}
            style={{
              '--spin-time': `${duration}s`,
              width: '320px',
              height: '320px',
              transformBox: 'fill-box',
              transformOrigin: 'center',
            }}
            viewBox="0 0 200 200"
          >
            <defs>
              <linearGradient id="bladeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'rgb(16, 24, 40)', stopOpacity: 0.9 }} />
                <stop offset="80%" style={{ stopColor: 'rgb(58, 75, 106)', stopOpacity: 0.9 }} />
                <stop offset="100%" style={{ stopColor: 'rgb(42, 59, 90)', stopOpacity: 0.8 }} />
              </linearGradient>
            </defs>
            <g transform="translate(100, 100) rotate(0)">
              <rect x="-15" y="-90" width="30" height="80" rx="15" ry="15" fill="url(#bladeGradient)" />
            </g>
            <g transform="translate(100, 100) rotate(90)">
              <rect x="-15" y="-90" width="30" height="80" rx="15" ry="15" fill="url(#bladeGradient)" />
            </g>
            <g transform="translate(100, 100) rotate(180)">
              <rect x="-15" y="-90" width="30" height="80" rx="15" ry="15" fill="url(#bladeGradient)" />
            </g>
            <g transform="translate(100, 100) rotate(270)">
              <rect x="-15" y="-90" width="30" height="80" rx="15" ry="15" fill="url(#bladeGradient)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
