const COLOR_OPTIONS = [
  { id: 'warm', label: 'Warm Yellow', color: '#f5a623' },
  { id: 'white', label: 'White', color: '#ffffff' },
  { id: 'cool', label: 'Cool Blue', color: '#b9d5fc' },
  { id: 'pink', label: 'Pink', color: '#f9a8b4' },
];

export default function LightControls({ state, onChange }) {
  const { isOn, color, brightness } = state;

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

      {/* Color Temperature Row */}
      <div className="panel-section-title">Color Temperature</div>
      <div className="color-btn-group">
        {COLOR_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`color-card-btn${color === opt.id ? ' is-active' : ''}`}
            style={{ backgroundColor: opt.color }}
            disabled={!isOn}
            onClick={() => onChange({ ...state, color: opt.id })}
            title={opt.label}
          />
        ))}
      </div>

      {/* Brightness Label Row */}
      <div className="panel-row slider-label-row">
        <span className="panel-label">Brightness</span>
        <span className="panel-value">{brightness}%</span>
      </div>

      {/* Full-width Slider */}
      <div className="panel-slider-wrapper">
        <input
          type="range"
          className="panel-slider"
          min="0"
          max="100"
          value={brightness}
          disabled={!isOn}
          style={{
            background: `linear-gradient(to right, #1d68ff 0%, #1d68ff ${brightness}%, #222d46 ${brightness}%, #222d46 100%)`,
            opacity: isOn ? 1 : 0.45,
          }}
          onChange={(e) => onChange({ ...state, brightness: Number(e.target.value) })}
        />
      </div>
    </div>
  );
}
