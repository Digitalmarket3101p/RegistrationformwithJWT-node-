// const dotenv = require("dotenv").config({ path: "../config.env" });

const mongoose = require("mongoose");


const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));
// mongoose
//   .connect(
//     "mongodb+srv://digitalmarket314:CysSUzQXLwLc86Mb@restfulapi.bpmowrq.mongodb.net/REgistrationForm"
//   )
//   .then(() => {
//     console.log("connection to DB is success");
//   })
//   .catch((e) => {
//     console.log(e);
//   });
