import { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import './App.css';

const DEFAULT_FAN_STATE = { isOn: false, speed: 100 };
const DEFAULT_LIGHT_STATE = { isOn: false, color: 'white', brightness: 50 };

function App() {
  const [activeDevice, setActiveDevice] = useState(null);
  const [deviceState, setDeviceState] = useState(null);
  const [presets, setPresets] = useState([]);

  const handleSelectDevice = useCallback((deviceId) => {
    setActiveDevice(deviceId);
    setDeviceState(
      deviceId === 'fan'
        ? { ...DEFAULT_FAN_STATE }
        : { ...DEFAULT_LIGHT_STATE }
    );
  }, []);

  const handleClear = useCallback(() => {
    setActiveDevice(null);
    setDeviceState(null);
  }, []);

  const handleSavePreset = useCallback(() => {
    if (!activeDevice || !deviceState) return;

    const deviceName = activeDevice === 'fan' ? 'Living Room Fan' : 'Kitchen Light';
    const summary =
      activeDevice === 'fan'
        ? `${deviceState.isOn ? 'ON' : 'OFF'} · ${deviceState.speed}%`
        : `${deviceState.isOn ? 'ON' : 'OFF'} · ${deviceState.color} · ${deviceState.brightness}%`;

    const newPreset = {
      id: Date.now().toString(),
      deviceId: activeDevice,
      label: `${deviceName} (${summary})`,
      state: { ...deviceState },
    };

    setPresets((prev) => [newPreset, ...prev]);
  }, [activeDevice, deviceState]);

  const handleLoadPreset = useCallback((preset) => {
    setActiveDevice(preset.deviceId);
    setDeviceState({ ...preset.state });
  }, []);

  const handleDeletePreset = useCallback((presetId) => {
    setPresets((prev) => prev.filter((p) => p.id !== presetId));
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-shell">
        <Sidebar
          activeDevice={activeDevice}
          presets={presets}
          onLoadPreset={handleLoadPreset}
          onDeletePreset={handleDeletePreset}
          onSelectDevice={handleSelectDevice}
        />
        <Canvas
          activeDevice={activeDevice}
          deviceState={deviceState}
          onDrop={handleSelectDevice}
          onClear={handleClear}
          onSavePreset={handleSavePreset}
          onDeviceStateChange={setDeviceState}
        />
      </div>
    </DndProvider>
  );
}

export default App;
