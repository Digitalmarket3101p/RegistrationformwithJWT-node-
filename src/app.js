const dotenv = require("dotenv").config({ path: "../config.env" });
const express = require("express");
const path = require("path");
const studentroutes = require("../src/Routes/student");
require("../src/Db/connec");
const app = express();
const hbs = require("hbs");
const port = process.env.PORT || 4000;
const auth = require("../src/middleware/auth");
const cookieparser = require("cookie-parser");
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: false }));

///for connect external frontend application :
const Frontend_path = path.join(__dirname, "../public");
app.use(express.static(Frontend_path));
///////////////////////////////////////////////////////

///connect view hbs folder for frontend:

const templates_path = path.join(__dirname, "./templates/views");
const partials_path = path.join(__dirname, "./templates/partials");

app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/secrate", auth, (req, res) => {
  // console.log(`Valied token ${req.cookies.jwt}`);
  res.render("secrate");
});
app.get("/logout", auth, async (req, res) => {
  // console.log(`Valied token ${req.cookies.jwt}`);
  try {
    res.clearCookie("jwt");
    //remove one device for log out
    // req.user.tokens = req.user.tokens.filter((item) => {
    //   return item.token !== req.token;
    // });
    //remove all device for logout
    req.user.tokens=[]
    await req.user.save();
    res.render("index");
  } catch (e) {
    res.status(400).send(e);
  }
});

app.use(studentroutes);

app.listen(port, () => {
  console.log(`app listening in this port  ${port}`);
});
