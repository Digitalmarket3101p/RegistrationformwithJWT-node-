const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://digitalmarket314:CysSUzQXLwLc86Mb@restfulapi.bpmowrq.mongodb.net/REgistrationForm"
  )
  .then(() => {
    console.log("connection to DB is success");
  })
  .catch((e) => {
    console.log(e);
  });
