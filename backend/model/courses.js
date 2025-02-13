const mongoose = require("mongoose");
const now = new Date();
const fourMonthsLater = new Date(now.getFullYear(), now.getMonth() + 4, now.getDate());
const courses= new mongoose.Schema({
  
  CourseName: String,
  type : { type : String,enum: ["sport","musique","dance"],
  default: "sport" },
  level: { type : String,enum: ["easy","medium","hard"],
  default: "easy" },
  creationDate : { type : Date, default : Date.now},
 expirationDate : { type : Date, default : fourMonthsLater},

image:String,
coach: {type: mongoose.Schema.Types.ObjectId, ref: 'users',default:null},


});
module.exports = mongoose.model("courses", courses);
