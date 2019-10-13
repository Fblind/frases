const Push = require("../../../schemas/pushSchema");
const webPush = require("web-push");

function postSubscribe() {
  return async (req, res) => {
    const endpoint = req.body;

    const push = new Push({
      endpoint: endpoint.endpoint,
      keys: {
        p256dh: endpoint.keys.p256dh,
        auth: endpoint.keys.auth
      }
    });

    try {
      const createdPush = await push.save();
      const payload = JSON.stringify({
        title: "Bienvenido",
        body: "Gracias por habilitar las notificaciones, recibiras todos los dias un aviso nuevo :)",
        icon: "/images/quotation.jpg"
      });

      const options = {TTL: 86400};

      const subscription = {
        endpoint: createdPush.endpoint,
        keys: {
          p256dh: createdPush.keys.p256dh,
          auth: createdPush.keys.auth
        }
      };

      webPush.sendNotification(
        subscription,
        payload,
        options
        ).then(function() {
          console.log("Send welcome push notification");
        }).catch(err => {
          console.error("Unable to send welcome push notification", err );
      });
      return res.status(200).send('subscribe');
    } catch (err) {
      return res.status(500).send('subscription not possible');
    }
  }
}

module.exports = postSubscribe;
