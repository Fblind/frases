const PushSchema = require("../../../schemas/pushSchema");
const webPush = require("web-push");

function postSend() {
  return async (req, res) => {
    try {
      const records = await PushSchema.find({});
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
        await webPush.sendNotification(subscription, payload, options);
      }
      return res.json({ok: "ok"});
    } catch (err) {
      return res.status(500).json({err});
    }
  }
}

module.exports = postSend;
