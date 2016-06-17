# triptracker

## Notice

The current version uses Google Maps API but does not adhere with googles terms. Future versions will use a different matrix solution. Currently the most likely candidate is https://github.com/Project-OSRM/osrm-backend.
## About
tripTrackr is a Node/Express app that helps individuals keep track of their milage. It was made with a specific company in mind so the information asked for and provided is sparse and will likely need to be expanded if used outside that company.

## Setup
  1. Clone this repo
  *  npm install dependencies
  *  Set env variables
    * MongoDB as DB_CONN_TRIPTRAKER
    * Google Maps API key as GOOGLE_MATRIX_KEY
  * npm start

## Future Goals
  * Change API from google to an alternate.
    * Because usage of the app will break Googles terms of service.
  * Add printable documents.
    * I would like to be able to print
  * Update app to use react.
    * The app covers several pages while calling in a lot of the same information. Turning it into a SPA should make the experience much smoother.
  * Add more metrics.
    * It would be nice to look at more than just the miles. A gas cost calculator or a way to view your route.

## Planing of the app

### Reason behind the app
This app was made to solve the problem a friend of mine has had. Because of that the interface is set up according to the information I gathered directly from her.

### Technologies
  * Node/Express
  * MongoDB
  * GoogleAPI
  * Passport
  * Heroku 
