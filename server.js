// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 3000;
const listening = () => {
    console.log(`Server is running on port:${port}`);
};

// Setup Server
app.post('/data', (req, res) => {

    projectData = req.body;
    console.log(projectData);
});

app.get('/get', (req, res) => {
    res.send(projectData);
});

app.listen(port, listening);
