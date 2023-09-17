// Dependencies
const express = require('express');

// The app to use express
const app = express();

// Creates an environment variable port
const PORT = process.env.PORT || 3001;


// This asks express to create a route for every file in the 'public' folder and give it a '/' route
app.use(express.static('public'));
// This sets up express app to handle data parsing, middlewear to create the req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// File routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);


// app listener - starts the server
app.listen(PORT, () => {
  console.log(`Server available at http://localhost${PORT}`);
});