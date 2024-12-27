const express = require('express');
const app = express();
const port = 1000; // Port for your health check server

// Health check route
app.get('/.well-known/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});
