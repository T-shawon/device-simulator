# Aetherix Device Sandbox Simulator

A modern, dark-themed interactive hardware testing sandbox built with React, Vite, and HTML5 Drag and Drop (`react-dnd`). The simulator provides a testing canvas for configuring smart home appliances, featuring realistic visual representations, smooth animation physics, real-time responsive controls, and a persistent preset manager.

---

## Features

- **Dark-Themed Hardware Testing Interface**:
  - Deep navy background (`#0b0f19`), elevated sidebar (`#0d121e`), rounded canvas (`#070a14`), and vibrant blue controls (`#1d68ff`).
  - Seamless drag-and-drop workflow: drag appliances from the sidebar directly onto the canvas (with click-to-place support for mobile and touch devices).
  - Empty state displaying `"Drag anything here"` in the center.

- **Living Room Fan**:
  - Realistic 4-blade orthogonal rotor powered by layered SVG with aerodynamic gradients.
  - Symmetrical concentric-ring central hub and bezel.
  - Smooth continuous rotation when powered on, accelerating dynamically from 1% up to 100% speed, and stopping instantly when switched off.
  - Integrated control panel with power toggle and full-width speed range slider.

- **Kitchen Light**:
  - Realistic fixture featuring stepped socket cap, metallic screw ridges, and diffuse radial bulb glass with internal filament.
  - Ambient multi-layered soft glow effect reacting to color temperature and brightness.
  - 4 color temperature modes: **Warm Yellow** (`#f5a623`), **White** (`#ffffff`), **Cool Blue** (`#b9d5fc`), and **Pink** (`#f9a8b4`), with active selection outline.
  - Brightness slider (0–100%) controlling luminous intensity and outer glow spread.
  - Turns dark and unlit when powered off.

- **Canvas & Presets**:
  - **Save Preset**: Captures the active device state (power, speed/brightness, color temperature) and lists it under `Saved Presets` in the sidebar.
  - **Restore**: Click any saved preset in the sidebar to restore its exact configuration onto the canvas. Includes a quick delete (`×`) option.
  - **Clear**: Resets the canvas back to the initial empty state.

---

## Setup & Run Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/T-shawon/device-simulator.git

# Navigate into the project directory
cd device-simulator

# Install dependencies
npm install
```

### Development Server
```bash
# Start Vite development server with Hot Module Replacement
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
# Create an optimized production bundle in /dist
npm run build

# Preview the production build locally
npm run preview
```

---

## Limitations & Notes

1. **Local State Persistence**: Presets are currently stored in application memory during the active session. Refreshing the browser resets the presets list unless connected to persistent browser storage (e.g., `localStorage`).
2. **Device Capacity**: The canvas is engineered for single-device inspection and testing at a time. Placing a new device replaces the currently active unit on the canvas.
3. **HTML5 Drag-and-Drop on Mobile**: Standard HTML5 drag-and-drop APIs vary across touch-only mobile browsers. To ensure universal accessibility, device items in the sidebar can also be tapped/clicked directly to load them onto the canvas.

---

## Submission Details

- **Live Deployment URL**: [https://device-simulator-six.vercel.app](https://device-simulator-six.vercel.app)
- **Source Code Repository**: [https://github.com/T-shawon/device-simulator](https://github.com/T-shawon/device-simulator)
