const mongoose =require('mongoose')
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    logo:{
        type:String,
    },
})


module.exports = mongoose.model('companies', CompanySchema)