const config = require("./config");
const express = require("express");
const serveStatic = require("serve-static")
const webPush = require("web-push");
const path = require("path");
const app = express();

webPush.setVapidDetails('mailto:fblind@gmail.com', config.vapid.public, config.vapid.private);

// Common middlewares
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(serveStatic(path.join(__dirname, "public")));

const router = require('express').Router()
const initializeNotificationRoutes = require('./app/modules/notifications/router')
const notificationUseCases = require('./app/modules/notifications/services')
app.use('/notifications', initializeNotificationRoutes(router, notificationUseCases))


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
