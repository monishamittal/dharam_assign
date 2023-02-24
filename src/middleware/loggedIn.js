const loggedIn = async function (req, res, next) {
  try {
    if (req.session.loggedIn) {
      next()
    } else {
      return res.status(401).send({ status: false, msg: "Not authenticated" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = { loggedIn };