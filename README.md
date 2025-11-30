# Mars Rover Mission Control

This project simulates a Mars rover mission control system, allowing users to send commands to a rover through a web interface. The rover can be moved in four directions (N, S, E, W) and can also be rotated.

## Features

- **Desktop Controls**: Use arrow keys to navigate the rover
- **Touch Controls**: On touch devices, use virtual directional buttons or swipe gestures on the grid
- **Obstacle Detection**: Avoid obstacles (🪨) while navigating
- **Auto-Reboot**: System automatically reboots 5 seconds after a crash
- **Responsive Design**: Optimized for both desktop and mobile devices

## Controls

### Desktop (Keyboard)
- Use **Arrow Keys** (↑ ↓ ← →) to move the rover in any direction
- The rover automatically rotates to face the direction before moving

### Mobile/Touch Devices
- **Virtual Buttons**: Tap the directional buttons (↑ ↓ ← →) to move
- **Swipe Gestures**: Swipe on the grid in any direction (up, down, left, right) to move
- Both methods work seamlessly on touch-enabled devices

### Demo Mode
- Press **'T'** on desktop to toggle touch controls demo mode

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`
