import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import './Home.css';

function Home() {
  // State variables
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [year, setYear] = useState("");
  const [frequency, setFrequency] = useState(1); // Frequency of compounding
  const [interest, setInterest] = useState(0);
  const [breakdown, setBreakdown] = useState([]);

  // Handle calculation
  const handleCalculate = () => {
    const principal = parseFloat(amount);
    const rateOfInterest = parseFloat(rate) / 100;
    const time = parseFloat(year);

    // Compound interest formula: A = P(1 + r/n)^(nt)
    const compoundInterest = principal * Math.pow(1 + rateOfInterest / frequency, frequency * time);
    const totalInterest = compoundInterest - principal;

    // Generate yearly breakdown
    const breakdownData = Array.from({ length: time }, (_, i) => {
      const yearValue = i + 1;
      const annualAmount = principal * Math.pow(1 + rateOfInterest / frequency, frequency * yearValue);
      return {
        year: yearValue,
        total: annualAmount.toFixed(2),
        interest: (annualAmount - principal).toFixed(2),
      };
    });

    setInterest(totalInterest.toFixed(2));
    setBreakdown(breakdownData);
  };

  // Reset fields
  const reset = () => {
    setAmount("");
    setRate("");
    setYear("");
    setFrequency(1);
    setInterest(0);
    setBreakdown([]);
  };

  // Chart Data
  const chartData = {
    labels: breakdown.map((data) => `Year ${data.year}`),
    datasets: [
      {
        label: 'Total Amount (₹)',
        data: breakdown.map((data) => data.total),
        backgroundColor: 'rgba(63, 81, 181, 0.5)',
        borderColor: '#3f51b5',
        borderWidth: 2,
      },
    ],
  };

  return (
    <motion.div
      className="calculator"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: '20px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
            <motion.div
              className="output"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="output-value">
                <FontAwesomeIcon icon={faRupeeSign} /> {interest}
              </div>
            </motion.div>

            <Box
              component="form"
              sx={{ mt: 4, textAlign: 'center' }}
              noValidate
              autoComplete="off"
            >
              <div className="form-fields">
                <TextField
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  label="Principal Amount (₹)"
                  type="number"
                  variant="outlined"
                  sx={{ mb: 2, width: '100%' }}
                />
                <TextField
                  onChange={(e) => setYear(e.target.value)}
                  value={year}
                  label="Time (Years)"
                  type="number"
                  variant="outlined"
                  sx={{ mb: 2, width: '100%' }}
                />
                <TextField
                  onChange={(e) => setRate(e.target.value)}
                  value={rate}
                  label="Rate of Interest (%)"
                  type="number"
                  variant="outlined"
                  sx={{ mb: 2, width: '100%' }}
                />
                <TextField
                  onChange={(e) => setFrequency(e.target.value)}
                  value={frequency}
                  label="Compounding Frequency (1 for Annually, 12 for Monthly)"
                  type="number"
                  variant="outlined"
                  sx={{ mb: 4, width: '100%' }}
                />
              </div>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button onClick={handleCalculate} variant="contained" color="primary">
                  Calculate
                </Button>
                <Button onClick={reset} variant="outlined" color="secondary">
                  Reset
                </Button>
              </Box>
            </Box>

            {breakdown.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Chart type="bar" data={chartData} />
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </motion.div>
  );
}

export default Home;
