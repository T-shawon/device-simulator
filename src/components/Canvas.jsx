import { useDrop } from 'react-dnd';
import FanVisual from './FanVisual';
import LightVisual from './LightVisual';
import FanControls from './FanControls';
import LightControls from './LightControls';

export default function Canvas({
  activeDevice,
  deviceState,
  onDrop,
  onClear,
  onSavePreset,
  onDeviceStateChange,
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'DEVICE',
    drop: (item) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [onDrop]);

  const hasDevice = activeDevice !== null;

  return (
    <main className="main-canvas-area">
      {/* Top Header Row with Title and Action Buttons */}
      <div className="canvas-top-bar">
        <h1 className="canvas-title">Testing Canvas</h1>
        <div className="canvas-top-actions">
          {hasDevice && (
            <>
              <button
                type="button"
                className="btn-canvas btn-clear"
                onClick={onClear}
              >
                Clear
              </button>
              <button
                type="button"
                className="btn-canvas btn-save"
                onClick={onSavePreset}
              >
                Save Preset
              </button>
            </>
          )}
        </div>
      </div>

      {/* Large Rounded Canvas Box */}
      <div
        ref={drop}
        className={`canvas-container${isOver ? ' drag-hover' : ''}`}
      >
        {!hasDevice ? (
          <div className="canvas-empty-state">
            <p>Drag anything here</p>
          </div>
        ) : (
          <div className="canvas-active-layout">
            {/* Centered Device Illustration */}
            <div className="canvas-visual-slot">
              {activeDevice === 'fan' ? (
                <FanVisual
                  isOn={deviceState.isOn}
                  speed={deviceState.speed}
                />
              ) : (
                <LightVisual
                  isOn={deviceState.isOn}
                  color={deviceState.color}
                  brightness={deviceState.brightness}
                />
              )}
            </div>

            {/* Bottom-positioned Device Control Panel */}
            <div className="canvas-controls-slot">
              {activeDevice === 'fan' ? (
                <FanControls
                  state={deviceState}
                  onChange={onDeviceStateChange}
                />
              ) : (
                <LightControls
                  state={deviceState}
                  onChange={onDeviceStateChange}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
