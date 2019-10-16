const config = require("./config");
const express = require("express");
const serveStatic = require("serve-static")
const webPush = require("web-push");
const path = require("path");
const app = express();

webPush.setVapidDetails(
  'mailto:fblind@gmail.com',
  "BGruMlB_05o4OARoRmBfYOjkixFyzXGDdCp3PBCpq3fl22pCnOI0V1uFUDt2b8YKiRP6siFwOEnzV3wOZIkeIfU",
  "D8Ge2zSEOF71GGh4aJFiDVof1P1HloXxUUnKWKm1X3A"
);

// Common middlewares
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(serveStatic(path.join(__dirname, "public")));

app.post("/notifications/subscribe", require("./app/modules/notifications/handlers/postSubscribe")());
app.post("/notifications/send/all", require("./app/modules/notifications/handlers/postSend")());

const port = process.env.PORT || config.port || 8080;
// DB registration
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set("debug", config.dbDebug);
mongoose.connect(`${config.dbHost}/${config.dbName}`)
  .then(() => {
    app.listen(port, () => {
      console.log(`SOS Patita app is listening on port ${port}!`);
    });
  })
  .catch((err) => {
    console.log("Database Error#mongoose.connect", err);
  });
