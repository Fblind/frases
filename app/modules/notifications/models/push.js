module.exports = () => {
  return function createPush (literal) {
    const {endpoint, keys} = literal
    if (!endpoint) {
      throw new Error("ENDPOINT_REQUIRED")
    }

    if (!keys) {
      throw new Error("KEYS_REQUIRED")
    }

    if (keys && !keys.p256dh) {
      throw new Error('KEYS_P256H_REQUIRED')
    }

    if (keys && !keys.auth) {
      throw new Error('KEYS_AUTH_REQUIRED')
    }

    return Object.freeze({
      endpoint: endpoint,
      keys: {
        p256dh: keys.p256dh,
        auth: keys.auth
      }
    })
  }
}
