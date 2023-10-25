const dotenv = require("dotenv").config({ path: "../config.env" });
const express = require("express");
const path = require("path");
const studentroutes = require("../src/Routes/student");
require("../src/Db/connec");
const app = express();
const hbs = require("hbs");
const port = process.env.PORT || 4000;
app.use(express.json());
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

app.use(studentroutes);

app.listen(port, () => {
  console.log(`app listening in this port  ${port}`);
});
