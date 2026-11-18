export default function FanControls({ state, onChange }) {
  const { isOn, speed } = state;

  return (
    <div className="device-control-panel">
      {/* Power Row */}
      <div className="panel-row">
        <span className="panel-label">Power</span>
        <div
          className={`panel-toggle${isOn ? ' is-on' : ''}`}
          onClick={() => onChange({ ...state, isOn: !isOn })}
          role="switch"
          aria-checked={isOn}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onChange({ ...state, isOn: !isOn });
            }
          }}
        >
          <div className="toggle-thumb" />
        </div>
      </div>

      {/* Speed Label Row */}
      <div className="panel-row slider-label-row">
        <span className="panel-label">Speed</span>
        <span className="panel-value">{speed}%</span>
      </div>

      {/* Full-width Slider */}
      <div className="panel-slider-wrapper">
        <input
          type="range"
          className="panel-slider"
          min="0"
          max="100"
          value={speed}
          disabled={!isOn}
          style={{
            background: `linear-gradient(to right, #1d68ff 0%, #1d68ff ${speed}%, #222d46 ${speed}%, #222d46 100%)`,
            opacity: isOn ? 1 : 0.45,
          }}
          onChange={(e) => onChange({ ...state, speed: Number(e.target.value) })}
        />
      </div>
    </div>
  );
}
