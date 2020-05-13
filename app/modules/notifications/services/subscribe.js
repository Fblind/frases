const {createPush, createSubscription} = require('../models')
module.exports = ({pushCollection, sendWelcomeNotification}) => {
  return async (endpoint) => {
    const push = new pushCollection(createPush({endpoint: endpoint.endpoint, keys: endpoint.keys}))
    const createdPush = await push.save()
    sendWelcomeNotification(createSubscription(createdPush))
  }
}
