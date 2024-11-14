const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());  // Parse JSON bodies
app.use(cors());             // Enable CORS for all routes

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.error("Error connecting to MongoDB Atlas:", err));

// Define the Vote Schema
const voteSchema = new mongoose.Schema({
    ip: { type: String, required: true, unique: true },
    candidate: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

// Create the Vote model
const Vote = mongoose.model('Vote', voteSchema);

// Route to submit a vote
app.post('/vote', async (req, res) => {
    const ip = req.ip;  // Get the user's IP address
    const candidate = req.body.candidate;  // Get the chosen candidate from the request body

    try {
        // Check if this IP has already voted
        const existingVote = await Vote.findOne({ ip: ip });
        if (existingVote) {
            return res.status(403).json({ message: 'You have already voted.' });
        }

        // Record the new vote
        const vote = new Vote({ ip: ip, candidate: candidate });
        await vote.save();

        res.status(200).json({ message: `Thank you for voting for ${candidate}!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while processing your vote.' });
    }
});

// Route to retrieve all votes
app.get('/votes', async (req, res) => {
    try {
        const votes = await Vote.find();
        res.status(200).json(votes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while retrieving votes.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
