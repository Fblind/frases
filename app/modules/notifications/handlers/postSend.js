const PushSchema = require("../../../schemas/pushSchema");
const webPush = require("web-push");

function postSend(sendDailyNotifications) {
  return async (req, res) => {
    try {
      res.status(200).end();
      await sendDailyNotifications();
    } catch (err) {
      return res.status(500).json({err});
    }
  }
}

module.exports = postSend;
