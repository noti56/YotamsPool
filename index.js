const express = require("express");
const { dirname } = require("path");
const app = express();

const fs = require("fs");
const { connectToDb } = require("./utils/connectionToDb");
const { MentorSchema } = require("./models/MentorSchema.schema");
const { StudentSchems } = require("./models/Students.schema");
require("dotenv").config();
// const { ImageSchema } = require("./models/Image.model")

if (process.env.PORT === "production") {
  app.use(express.static(__dirname + "/public"));
}

let port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.use(express.json());

app.use(require("cors")());

connectToDb();

const autoGenId = () => {
  return Math.floor(
    Math.random() * Math.floor(Math.random() * Date.now())
  ).toString();
};

// const createPhoto = async(imgBase64,imgLinkId)=>{
//         let base64Data = imgBase64.replace(/^data:image\/png;base64,/, "");
//         await fs.writeFileSync("public/"+imgLinkId+".png", base64Data,'base64', function(err) {
//             if(err){
//                 console.log(err);

//             }
//         });
// }

app.get("/", async (req, res) => {
  res.send("asdfasdf");
});

app.get("/api/mentors", async (req, res) => {
  try {
    const mentorsFromDb = await MentorSchema.find();
    res.json({ mentors: mentorsFromDb });
  } catch (error) {
    console.log(error);
    res.json({ err: true, msg: error });
  }
});

// breaststroke
//butterfly stroke

// app.get("/fuck", async (req, res) => {
//   const resFromDb = await MentorSchema.insertMany([
//     {
//       color: "green",
//       workerName: "Jhoni",
//       swimStyles: ["breaststroke", "butterfly stroke", "front crawl"],
//       time: {
//         sunday: { startTime: 10, endTime: 19 },
//         tuesday: { startTime: 10, endTime: 19 },
//         thursday: { startTime: 10, endTime: 19 },
//       },
//     },
//   ]);
//   res.json(resFromDb);
// });

app.post("/api/mentors", async (req, res) => {
  try {
    const { color, workerName, swimStyles, time } = req.body;
    if (!color || !workerName || !swimStyles || !time) {
      res.json({ err: true, msg: "not all the data sent properlly" });
    }

    const resFromDb = await MentorSchema.insertMany([
      { color, workerName, swimStyles, time },
    ]);
    res.json({ res: resFromDb });
  } catch (error) {
    console.log(error);
    res.json({ err: true, msg: error });
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const mentorsFromDb = await StudentSchems.find();
    res.json({ mentors: mentorsFromDb });
  } catch (error) {
    console.log(error);
    res.json({ err: true, msg: error });
  }
});
app.post("/api/students", async (req, res) => {
  try {
    const students = req.body.students;
    students.forEach((std) => {
      const { firstName, lastName, swimStyle, time } = std;
      if (!firstName || !lastName || !swimStyle || !time) {
        res.json({ err: true, msg: "not all the data sent properlly" });
      }
    });

    const resFromDb = await StudentSchems.insertMany(students);
    res.json({ res: resFromDb });
  } catch (error) {
    console.log(error);
    res.json({ err: true, msg: error });
  }
});

// app.listen(1000, () => console.log('🤘 rocking 1000 ! 🤘'))
app.listen(port, () => console.log("🤘 rocking " + port + " ! 🤘"));
