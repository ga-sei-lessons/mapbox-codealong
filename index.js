require('dotenv').config()
// required packages
const express = require('express')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN })



// config app
const app = express()
const PORT = process.env.PORT || 3000

// routes

// GET / -- show a form that lets the user search for a location
app.get('/', (req, res) => {
  res.send('show a form for the user to search by location 🌍')
})

// GET /search -- geocode user form data and render a map
app.get('/search', (req, res) => {
  geocodingClient.forwardGeocode({
    query: `${req.query.city}, ${req.query.state}`
  })
  .send()
  .then(response => {
    console.log(response.body.features[0])
    res.json(response.body)
  })
})

app.listen(PORT, () => console.log(`you are listening on port ${PORT} 🗺`))