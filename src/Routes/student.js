const express = require("express");
const Router = express.Router();
const student = require("../modules/students");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

Router.get("/", (req, res) => {
  res.render("index");
});
Router.get("/register", (req, res) => {
  res.render("register");
});
Router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const password = req.body.password;
    const cpassword = req.body.confirmpass;
    if (password === cpassword) {
      const registerEmployees = new student({
        name: req.body.name,
        password: req.body.password,
        confirmpass: req.body.confirmpass,
        email: req.body.email,
        phone: req.body.phone,
        DOB: req.body.DOB,
        gender: req.body.gender,
        address: req.body.address,
      });
      const token = await registerEmployees.generatetoken();
      console.log("token", token);
      const registerd = await registerEmployees.save();
      console.log("page part", registerd);

      res.status(201).render("index");
    } else {
      res.send("password not matching");
    }
  } catch (e) {
    console.log(e);
    res.status(400).send("not matching");
  }
});
Router.get("/login", async (req, res) => {
  res.render("index");
});
Router.post("/login", async (req, res) => {
  try {
    // if (!token) {
    //   res.send("You are not logged in! Please log in to get access.", 401);
    // }
    // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // const currentUser = await student.findById(decoded.id);
    // if (!currentUser) {
    //   res.send("The user belonging to this token does no longer exist.", 401);
    // }
    const email = req.body.email;
    const password = req.body.password;
    const useremail = await student.findOne({ email: email });
    const ismatch = await bcrypt.compare(password, useremail.password);
    const token = await useremail.generatetoken();
    console.log("login token", token);

    if (ismatch) {
      res.status(201).render("login");
    } else {
      res.send("invalid login details");
    }
  } catch (error) {
    res.status(400).send("invalid email");
  }
});

// Router.get("/students/:id", async (req, res) => {
//   try {
//     const data = req.params.id;
//     const userdata = await student.findById(data);

//     if (!userdata) {
//       return res.status(404).send();
//     } else {
//       res.send(userdata);
//     }
//   } catch (e) {
//     res.status(404).send(e);
//   }
// });

// Router.patch("/students/:id", async (req, res) => {
//   try {
//     const data = req.params.id;
//     const userdata = await student.findByIdAndUpdate(data, req.body, {
//       new: true,
//     });
//     res.send(userdata);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// Router.delete("/students/:id", async (req, res) => {
//   try {
//     const data = await student.findByIdAndDelete(req.params.id);
//     if (!req.params.id) {
//       res.status(400).send();
//     } else {
//       res.send(data);
//     }
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

Router.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `can't find ${req.originalUrl}`,
  });
});
module.exports = Router;
