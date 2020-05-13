module.exports = () => {
  return function createSubscription ({endpoint, keys}) {
    return Object.freeze({endpoint, keys})
  }
}
