//Install express server
const express = require("express");
const path = require("path");

const app = express();

// Serve only the static files form the dist directory
app.use(express.static("../angular-ionic-calculator"));

app.get("/*", (req, res) => res.sendFile("server.ts", { root: "./src/" }));

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8100);

console.log(`app`, app);
