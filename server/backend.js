////  IMPORTS  ////

// Import Express
var express = require('express')

// Import Fake Data
const mockFilters = require('./mockFilters.js')
const mockObjects = require('./mockObjects.js')
const mockUsers = require('./mockUsers.js')


////  SERVER FUNCTIONS  ////

// Create the server object
var srv = express()

// Request Handlers
srv.get('/', function (req, res) {
  res.send('Hello World!')
})
