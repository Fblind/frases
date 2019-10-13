const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pushSchema = new Schema({
  endpoint: String,
  keys: {
    p256dh: String,
    auth: String
  }
});

const Push = mongoose.model('Push', pushSchema);

module.exports = Push;
