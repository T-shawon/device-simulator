import { useDrag } from 'react-dnd';

const DEVICES = [
  {
    id: 'fan',
    name: 'Living Room Fan',
    icon: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12c-1.8-2.8-1.8-6.5 0-8.5 1.8 2 1.8 5.7 0 8.5z" />
        <path d="M12 12c2.8-1.8 6.5-1.8 8.5 0-2 1.8-5.7 1.8-8.5 0z" />
        <path d="M12 12c1.8 2.8 1.8 6.5 0 8.5-1.8-2-1.8-5.7 0-8.5z" />
        <path d="M12 12c-2.8 1.8-6.5 1.8-8.5 0 2-1.8 5.7-1.8 8.5 0z" />
        <circle cx="12" cy="12" r="1.5" />
      </svg>
    ),
  },
  {
    id: 'light',
    name: 'Kitchen Light',
    icon: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        <path d="M12 3a6 6 0 0 0-4 10.5v1.5h8v-1.5A6 6 0 0 0 12 3z" />
      </svg>
    ),
  },
];

function DeviceItem({ device, isActive, onSelect }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'DEVICE',
    item: { id: device.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [device.id]);

  return (
    <div
      ref={drag}
      className={`sidebar-device-btn${isActive ? ' is-active' : ''}${isDragging ? ' is-dragging' : ''}`}
      onClick={() => onSelect && onSelect(device.id)}
      role="button"
      tabIndex={0}
      title="Drag or click to place on canvas"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect && onSelect(device.id);
        }
      }}
    >
      <span className="sidebar-device-icon">{device.icon}</span>
      <span className="sidebar-device-name">{device.name}</span>
    </div>
  );
}

export default function Sidebar({
  activeDevice,
  presets,
  onLoadPreset,
  onDeletePreset,
  onSelectDevice,
}) {
  return (
    <aside className="app-sidebar">
      {/* Devices Section */}
      <div className="sidebar-group">
        <div className="sidebar-heading">Devices ({DEVICES.length})</div>
        <div className="sidebar-device-list">
          {DEVICES.map((d) => (
            <DeviceItem
              key={d.id}
              device={d}
              isActive={activeDevice === d.id}
              onSelect={onSelectDevice}
            />
          ))}
        </div>
      </div>

      {/* Saved Presets Section */}
      <div className="sidebar-group">
        <div className="sidebar-heading">Saved Presets ({presets.length})</div>
        {presets.length === 0 ? (
          <div className="empty-preset-box">Nothing added yet</div>
        ) : (
          <div className="sidebar-preset-list">
            {presets.map((p) => (
              <div
                key={p.id}
                className="sidebar-preset-card"
                onClick={() => onLoadPreset(p)}
                title="Click to restore preset"
              >
                <div className="preset-card-info">
                  <span className={`preset-card-indicator ${p.deviceId}`} />
                  <span className="preset-card-label">{p.label}</span>
                </div>
                <button
                  type="button"
                  className="preset-card-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeletePreset(p.id);
                  }}
                  title="Delete preset"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
