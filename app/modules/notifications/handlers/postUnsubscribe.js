function postUnsubscribe(unsubscribe) {
  return async (req, res) => {
    try {
      await unsubscribe({endpoint: req.body.endpoint})
      return res.json({status: 'unsubscribe'});
    } catch (err) {
      return res.status(500).send('unsubscription not possible');
    }
  }
}

module.exports = postUnsubscribe
