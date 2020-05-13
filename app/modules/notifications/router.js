function initializeRouter (router, useCases) {
  const postSubscribe = require("./handlers/postSubscribe")
  router.post("/subscribe", postSubscribe(useCases.subscribe))

  const postSend = require("./handlers/postSend")
  router.post('/send/all', postSend(useCases.sendDailyNotifications))

  const postUnsubscribe = require("./handlers/postUnsubscribe")
  router.post('/unsubscribe', postUnsubscribe(useCases.unsubscribe))
  return router
}

module.exports = (router, dependencies) => {
  return initializeRouter(router, dependencies)
}
