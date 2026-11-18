const COLOR_CONFIGS = {
  warm: {
    rgb: '245, 166, 35',
    core: 'rgb(255, 230, 160)',
    mid: 'rgba(245, 166, 35, 0.867)',
    edge: 'rgb(210, 135, 25)',
    glow: 'rgb(245, 166, 35)',
  },
  white: {
    rgb: '255, 255, 255',
    core: 'rgb(255, 255, 255)',
    mid: 'rgba(255, 255, 255, 0.867)',
    edge: 'rgb(204, 204, 204)',
    glow: 'rgb(255, 255, 255)',
  },
  cool: {
    rgb: '185, 213, 252',
    core: 'rgb(235, 245, 255)',
    mid: 'rgba(185, 213, 252, 0.867)',
    edge: 'rgb(140, 175, 235)',
    glow: 'rgb(185, 213, 252)',
  },
  pink: {
    rgb: '249, 168, 180',
    core: 'rgb(255, 225, 235)',
    mid: 'rgba(249, 168, 180, 0.867)',
    edge: 'rgb(225, 135, 155)',
    glow: 'rgb(249, 168, 180)',
  },
};

export default function LightVisual({ isOn, color, brightness }) {
  const conf = COLOR_CONFIGS[color] || COLOR_CONFIGS.white;
  const normBrightness = brightness / 100;
  const glowOpacity = isOn ? Math.max(0.1, normBrightness * 0.35) : 0;
  const glowSpread = Math.round(normBrightness * 60);

  const bulbBackground = isOn
    ? `radial-gradient(circle at 35% 35%, ${conf.core}, ${conf.mid} 40%, ${conf.edge} 100%)`
    : 'radial-gradient(circle at 35% 35%, rgb(45, 56, 78), rgba(26, 33, 49, 0.9) 40%, rgb(14, 18, 28) 100%)';

  const bulbBoxShadow = isOn
    ? `${conf.glow} 0px 0px ${glowSpread}px, rgba(0, 0, 0, 0.3) -20px -20px 60px inset, rgba(255, 255, 255, 0.15) 15px 15px 40px inset`
    : 'rgba(0, 0, 0, 0.45) -20px -20px 60px inset, rgba(255, 255, 255, 0.08) 15px 15px 40px inset';

  return (
    <div
      style={{
        position: 'relative',
        width: '320px',
        height: '320px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Ambient Blur Glow */}
      <div
        style={{
          position: 'absolute',
          borderRadius: '9999px',
          width: '210px',
          height: '210px',
          background: `rgb(${conf.rgb})`,
          opacity: glowOpacity,
          boxShadow: `rgb(${conf.rgb}) 0px 0px 50px`,
          filter: 'blur(50px)',
          transition: 'all 500ms ease',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* Fixture Container */}
      <div
        style={{
          position: 'relative',
          width: '160px',
          height: '224px',
        }}
      >
        {/* Top Socket Cap */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '64px',
            height: '24px',
            background: 'linear-gradient(to bottom, #4A5565, #364153)',
            borderTopLeftRadius: '6px',
            borderTopRightRadius: '6px',
          }}
        />

        {/* Screw Ridges */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ height: '4px', background: '#364153', borderBottom: '1px solid #4A5565' }} />
          <div style={{ height: '4px', background: '#364153', borderBottom: '1px solid #4A5565' }} />
          <div style={{ height: '4px', background: '#364153', borderBottom: '1px solid #4A5565' }} />
          <div style={{ height: '4px', background: '#364153', borderBottom: '1px solid #4A5565' }} />
        </div>

        {/* Bulb Glass */}
        <div
          style={{
            position: 'absolute',
            top: '36px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '112px',
            height: '144px',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '9999px',
              transition: 'all 500ms ease',
              position: 'relative',
              overflow: 'hidden',
              background: bulbBackground,
              boxShadow: bulbBoxShadow,
            }}
          >
            {/* Center Filament */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '4px',
                height: '56px',
                background: isOn ? '#ffffff' : '#374151',
                borderRadius: '9999px',
                boxShadow: isOn ? `rgba(${conf.rgb}, 0.8) 0px 0px 8px` : 'none',
                opacity: isOn ? 0.85 : 0.25,
                transition: 'all 300ms ease',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
