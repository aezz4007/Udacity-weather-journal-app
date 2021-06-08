// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//respond with object when get request made
app.get('/getData', function (req, res) {
    res.send(projectData);
  });
  
  //post data server side code (create a new instance of the req.body content and assign it to projectData object)
  app.post('/addData', function (req, res) {
      projectData = {...req.body}
      res.end()
  })

  