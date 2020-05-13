module.exports = ({notificationService, logger}) => {
  return function sendWelcomeNotification (subscription) {
    const payload = JSON.stringify({
      title: "Bienvenido",
      body: "Gracias por habilitar las notificaciones! 😀, todos los días recibiras una frase en tu dispositivo"
    })
    return notificationService.sendNotification(subscription, payload, {TTL: 86400})
      .then(() => { logger.log("Send welcome push notification") })
      .catch(err => { logger.error("Unable to send welcome push notification", err ) });
  }
}
