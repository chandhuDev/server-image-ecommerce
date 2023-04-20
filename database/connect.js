const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect(
      `mongodb+srv://chandhudev0:${process.env.MONGODB_SECRET_KEY}@images.jsxsdlj.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(console.log("succesfully connected to database"))
    .catch((e) => {
      console.log(e);
      console.log("error in authetication of database");
    });
};

