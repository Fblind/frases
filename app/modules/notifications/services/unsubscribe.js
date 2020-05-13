module.exports = ({pushCollection}) => {
  return async (subscription) => {
    await pushCollection.deleteOne({endpoint: subscription.endpoint})
  }
}
