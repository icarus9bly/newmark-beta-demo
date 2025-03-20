# Newmark-β Method Solver

A React-based web application for solving second-order differential equations using the Newmark-β method. This application provides an interactive interface to simulate and visualize the behavior of dynamic systems.

## Features

- Interactive parameter input for system properties:
  - Mass, stiffness, and damping coefficients
  - Initial displacement and velocity
  - Time step and total simulation time
  - Newmark-β parameters (β and γ)
- Real-time visualization of:
  - Displacement
  - Velocity
  - Acceleration
- Beautiful Material-UI based interface
- Responsive charts using Recharts

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Technical Details

The Newmark-β method is a numerical integration technique used to solve second-order differential equations, particularly in structural dynamics. The implementation uses:

- React for UI components
- Material-UI for styling
- Recharts for data visualization
- Vite for fast development and building

## Parameters

- β (beta): Integration parameter (default: 0.25)
- γ (gamma): Integration parameter (default: 0.5)
- These default values correspond to the average acceleration method

## License

MIT
