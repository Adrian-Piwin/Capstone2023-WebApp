// index.js
const express = require('express');
const sql = require('mssql'); // Import the mssql package
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const campusRoutes = require('./routes/campusRoutes');
const poiRoutes = require('./routes/poiRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// SQL Server configuration
const sqlConfig = {
  user: 'sa', // Replace with your SQL Server username
  password: 'FraPre!A', // Replace with your SQL Server password
  server: '142.93.1.207', // Replace with your server's IP address
  database: 'CampusQuest',
  options: {
    encrypt: true, // Use encryption if required
  },
  trustServerCertificate: true
};

// Connect to SQL Server
sql.connect(sqlConfig, (err) => {
  if (err) {
    console.error('SQL Server connection error:', err);
    return;
  }

  console.log('Connected to SQL Server');

  // Routes
  app.use('/api', authRoutes);
  app.use('/api', campusRoutes);
  app.use('/api', poiRoutes);

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

// Handle SQL Server connection errors
sql.on('error', (err) => {
  console.error('SQL Server error:', err);
});
