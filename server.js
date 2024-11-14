const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Store votes by IP address
const votes = {};

app.post('/vote', (req, res) => {
    const ip = req.ip;
    const candidate = req.body.candidate;

    // Check if the IP has already voted
    if (votes[ip]) {
        return res.status(403).json({ message: 'You have already voted.' });
    }

    // Record the vote
    votes[ip] = candidate;
    return res.status(200).json({ message: `Thank you for voting for ${candidate}!` });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
