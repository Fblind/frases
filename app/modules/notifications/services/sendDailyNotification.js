module.exports = ({notificationService, logger, pushCollection}) => {
  return (subscription) => {
    const payload = JSON.stringify({title: "Nuevo día!", body: "Comenzá el día de la mejor manera 😀"})
    return notificationService.sendNotification(subscription, payload, {TTL: 86400})
      .then(() => { logger.log("Sent daily push notification") })
      .catch(async (err) => {
        logger.error("Unable to send welcome push notification")
        const endpoint = err.endpoint
        logger.error("Will remove endpoint: ", endpoint)
        await pushCollection.deleteOne({endpoint})
      });
  }
}
