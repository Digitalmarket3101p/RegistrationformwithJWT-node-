const jwt = require("jsonwebtoken");
const student = require("../modules/students");
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log("asdsdfsfsfdsfddsfs", token);
    const verifyusr = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verifyusr);
    const user = await student.findOne({ _id: verifyusr._id });
    console.log("verifyuser", user);
    req.token=token;
    req.user=user
    next();
  } catch (e) {
    res.status(400).send(e);
  }
};
module.exports = auth;
