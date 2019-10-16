const PushSchema = require("../../../schemas/pushSchema");
const webPush = require("web-push");

function postSend() {
  return async (req, res) => {
    try {
      const records = await PushSchema.find({});
      // act like a worker
      res.json({ok: "ok"});
      for (record of records) {
        const options = {TTL: 86400};
        const subscription = {
          endpoint: record.endpoint,
          keys: {
            p256dh: record.keys.p256dh,
            auth: record.keys.auth
          }
        };
        const payload = JSON.stringify({
          title: "Nuevo día!",
          body: "Comenzá el día de la mejor manera",
          icon: "/images/quotation.jpg"
        });
        try {
          await webPush.sendNotification(subscription, payload, options);
        } catch (err) {
          console.error("Error sending notification", err);
        }
      }
    } catch (err) {
      return res.status(500).json({err});
    }
  }
}

module.exports = postSend;
