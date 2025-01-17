const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const Feedback = require('./models/FeedBackModel'); // Ensure correct file path

const app = express();
const PORT = 5000; // Use port 5000 (if that's what you want)

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Test database connection and sync models
const sequelize = require('./db'); // Make sure db.js is set up properly
sequelize.sync()
    .then(() => {
        console.log('Database synced');
    })
    .catch((error) => {
        console.error('Unable to sync database:', error);
    });

// Routes
app.get('/get-reports', async (req, res) => {
    try {
        const reports = await Feedback.findAll();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reports' });
    }
});

app.post('/submit-feedback', async (req, res) => {
    const { feedback, sentiment } = req.body;

    if (!feedback || !sentiment) {
        return res.status(400).json({ message: 'Feedback and sentiment are required!' });
    }

    try {
        const newReport = await Feedback.create({ feedback, sentiment });
        res.status(201).json({ message: 'Feedback submitted successfully!', report: newReport });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting feedback' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});
