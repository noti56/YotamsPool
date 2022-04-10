const { Schema, model } = require('mongoose')




const schema = new Schema({    
    firstName:{type:String,required:true},
    lastName: {type:String,required:true},
    swimStyles:{type:String,required:true},
    days: {type:Object,required:true},
    hours:{type:Object ,required:true},
    lessonType:{type:String ,required:true},

})


const StudentSchems = model('students', schema)

module.exports = { StudentSchems };


