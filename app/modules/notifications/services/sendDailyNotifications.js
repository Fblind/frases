module.exports = ({pushCollection, sendDailyNotification}) => {
  return async () => {
    const subscriptions = await pushCollection.find({})
    const records = subscriptions.map(sendDailyNotification)
    Promise.all(records)
  }
}
