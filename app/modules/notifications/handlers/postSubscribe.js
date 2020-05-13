function postSubscribe(subscribe) {
  return async (req, res) => {
    const endpoint = req.body;
    // validate endpoint

    try {
      await subscribe(endpoint)
      return res.status(200).send('subscribe');
    } catch (err) {
      return res.status(500).send('subscription not possible');
    }
  }
}

module.exports = postSubscribe;
