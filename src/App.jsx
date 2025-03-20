import { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function App() {
  const [params, setParams] = useState({
    mass: 1.0,
    stiffness: 100,
    damping: 2,
    initialDisplacement: 1.0,
    initialVelocity: 0,
    timeStep: 0.01,
    totalTime: 10,
    beta: 0.25,
    gamma: 0.5
  });

  const [results, setResults] = useState([]);

  const newmarkBeta = () => {
    const n = Math.floor(params.totalTime / params.timeStep);
    const results = [];
    
    let x = params.initialDisplacement;
    let v = params.initialVelocity;
    let a = (-params.stiffness * x - params.damping * v) / params.mass;
    
    results.push({ time: 0, displacement: x, velocity: v, acceleration: a });

    for (let i = 1; i <= n; i++) {
      const dt = params.timeStep;
      const m = params.mass;
      const c = params.damping;
      const k = params.stiffness;
      const beta = params.beta;
      const gamma = params.gamma;

      // Predict displacement and velocity
      const xPred = x + dt * v + (dt * dt / 2) * ((1 - 2 * beta) * a);
      const vPred = v + dt * (1 - gamma) * a;

      // Calculate new acceleration
      const aNew = (-k * xPred - c * vPred) / m;

      // Correct displacement and velocity
      x = xPred + beta * dt * dt * aNew;
      v = vPred + gamma * dt * aNew;
      a = aNew;

      results.push({
        time: i * dt,
        displacement: x,
        velocity: v,
        acceleration: a
      });
    }

    setResults(results);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Newmark-β Method Solver
        </Typography>
        
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
            <TextField
              label="Mass (kg)"
              name="mass"
              type="number"
              value={params.mass}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Stiffness (N/m)"
              name="stiffness"
              type="number"
              value={params.stiffness}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Damping (Ns/m)"
              name="damping"
              type="number"
              value={params.damping}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Initial Displacement (m)"
              name="initialDisplacement"
              type="number"
              value={params.initialDisplacement}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Initial Velocity (m/s)"
              name="initialVelocity"
              type="number"
              value={params.initialVelocity}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Time Step (s)"
              name="timeStep"
              type="number"
              value={params.timeStep}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Total Time (s)"
              name="totalTime"
              type="number"
              value={params.totalTime}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="β Parameter"
              name="beta"
              type="number"
              value={params.beta}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="γ Parameter"
              name="gamma"
              type="number"
              value={params.gamma}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" onClick={newmarkBeta}>
              Solve
            </Button>
          </Box>
        </Paper>

        {results.length > 0 && (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Results
            </Typography>
            <Box sx={{ width: '100%', height: 400 }}>
              <LineChart
                width={800}
                height={400}
                data={results}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" label={{ value: 'Time (s)', position: 'bottom' }} />
                <YAxis label={{ value: 'Response', angle: -90, position: 'left' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="displacement" stroke="#8884d8" name="Displacement (m)" />
                <Line type="monotone" dataKey="velocity" stroke="#82ca9d" name="Velocity (m/s)" />
                <Line type="monotone" dataKey="acceleration" stroke="#ff7300" name="Acceleration (m/s²)" />
              </LineChart>
            </Box>
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default App;
