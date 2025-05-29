const userAuth = (req, res, next) => {
  const token = "abc123";
  const isUserAuth = token === "abc123";
  if (!isUserAuth) {
    return res.status(401).send("unAutorized");
  }
  next();
};
module.exports = { userAuth };
