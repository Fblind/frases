function initializeRouter (router, useCases) {
  const postSubscribe = require("./handlers/postSubscribe")
  router.post("/subscribe", postSubscribe(useCases.subscribe));
  return router
}

module.exports = (router, dependencies) => {
  return initializeRouter(router, dependencies)
}
