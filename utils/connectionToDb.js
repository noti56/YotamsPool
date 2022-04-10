const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    const password = process.env.mongoDbPassword;

    await mongoose.connect(
      "mongodb+srv://noti56:" +
        password +
        "@rina-styling-blog-cruds.achy4.mongodb.net/YotamsPool?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("👨‍💻 connected to mongo 👨‍💻");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connectToDb };
