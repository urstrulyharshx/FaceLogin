const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/face-login', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.log('Error connecting to MongoDB: ' + error);
    });

// Middleware
app.use(bodyParser.json());

// API endpoint for face login
app.post('/login', (req, res) => {
    // Face recognition and login logic here
    // ...

    // Example response for successful login
    res.json({ success: true });
});

// Default route handler for undefined routes
app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});
