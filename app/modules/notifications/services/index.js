const logger = console
const notificationService = require('web-push')
const sendWelcomeNotification = require('./sendWelcomeNotification')({notificationService, logger})

const pushCollection = require('../../../schemas/pushSchema')

const sendDailyNotification = require('./sendDailyNotification')({notificationService, logger, pushCollection})

module.exports = {
  subscribe: require('./subscribe')({pushCollection, sendWelcomeNotification}),
  sendDailyNotifications: require('./sendDailyNotifications')({pushCollection, sendDailyNotification}),
}
