//Install express server
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8100;
// Serve only the static files form the dist directory
app.use(express.static("www"));
// Start the app by listening on the default Heroku port
app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`, app);
});