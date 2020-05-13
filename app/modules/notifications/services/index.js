const logger = console
const notificationService = require('web-push')
const sendWelcomeNotification = require('./sendWelcomeNotification')({notificationService, logger})

const pushCollection = require('../../../schemas/pushSchema')

module.exports = {
  subscribe: require('./subscribe')({pushCollection, sendWelcomeNotification})
}
