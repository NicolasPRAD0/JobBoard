const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { 
    type: String, 
    required: true, 
},
  name: {
    type:String,
    required:true,
  },
  lastName:{
    type:String,
    required:true,
  },
  birthDate:{
    type:Date,
    required:true,
  },
  recruiter:{
    type:Boolean,
    required:true,
  },
  company:{
    type:String
  },
  companyId:{
    type:String,
  },
  confirmed:{
    type:Boolean
  },
  isAdmin:{
    type:Boolean
  }
  
});


module.exports = mongoose.model('users', UserSchema)