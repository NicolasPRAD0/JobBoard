const { generateHash } = require("../middleware/bcrypt");
const CompanySchema = require("../models/CompanySchema");
const { compareHash } = require("../middleware/bcrypt");
const UserSchema = require("../models/UserSchema");

exports.create = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(406).json({ error: "Empty request" });
    }

    if (!req.body.name || !req.body.password || !req.body.email) {
      return res.status(406).json({ error: "missing field" });
    }

    const hash = await generateHash(req.body.password);

    const newCompany = new CompanySchema({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      logo: req.body.logo,
      users: [],
    });

    await newCompany.save();
    return res.status(200).send();
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: error.message || "some error occured trying to login" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const companies = await CompanySchema.find();
    if (companies) {
      return res.status(200).json(companies);
    } else {
      return res.status(404).json({ error: "No companies found" });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: error.message || "some error occured trying to login" });
  }
};

exports.login = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(406).json({ error: "Empty request" });
    }
    if (!req.body.email || !req.body.password) {
      return res.status(406).json({ error: "missing data" });
    }

    const foundCompany = await CompanySchema.findOne({
      email: req.body.email,
    }).exec();
    if (!foundCompany) return res.sendStatus(401);
    const isMatch = await compareHash(req.body.password, foundCompany.password);
    
    if (isMatch) {
      const company = {
        email: foundCompany.email,
        name: foundCompany.name,
        uid: foundCompany._id
      };



      return res.status(200).json(company);
    } else {
      return res.status(401).json();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "some error occured trying to login" });
  }
};

exports.edit= async (req,res) =>{
  try {
    if (!req.body) {
      return res.status(406).json({ error: "Empty request" });
    }
    let newPassword
    if(req.body.field == "password"){
      newPassword = await generateHash(req.body.value)
    }

    const updatedCompany = await CompanySchema.findByIdAndUpdate(req.body.id, {
      [req.body.field]: req.body.field == "password"  ? newPassword : req.body.value,
    },{returnOriginal: false})
    
    
    const newCompany = {
      email: updatedCompany.email,
      name: updatedCompany.name,
      uid: updatedCompany._id,
    }


    if (!updatedCompany) return res.sendStatus(401);
    return res.status(200).json(newCompany)

  } catch (error) {

    if(error.code == 11000){
      return res
      .status(409)
      .send();
    }
    return res
      .status(500)
      .json({ error: error.message || "some error occured trying to edit" });
  }
}

exports.getRecruiters = async(req,res) =>{
  try {
    const recruiters = await UserSchema.find({companyId:req.params.id});
    let recruiterList =[];
    
    if (recruiters) {
      recruiters.map(recruiter =>{
        recruiter.password="";
        recruiterList.push(recruiter)
      })
      
      return res.status(200).json(recruiterList);
    } else {
      return res.status(404).json({ error: "No companies found" });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: error.message || "some error occured trying to login" });
  }
}

exports.addRecruiter = async(req,res) =>{
  try {
    if (!req.body) {
      return res.status(406).json({ error: "Empty request" });
    }
    if(req.body.userId){

      const userDoc = await UserSchema.findByIdAndUpdate(req.body.userId,{
        company: req.body.company,
        companyId: req.body.companyId,
        confirmed: req.body.companyId !== "" ? true : false,
        recruiter: true,
      }, {returnOriginal: false})
      
      
      if(userDoc){
        userDoc.password=""
        return res.status(200).json(userDoc);
      }else{
        return res.status(404).json({ error: "No user found" });
      }

    }
    else{

    const userDoc = await UserSchema.findOneAndUpdate({email: req.body.userEmail},{
      company: req.body.company,
      companyId: req.body.companyId,
      confirmed: req.body.companyId !== "" ? true : false,
      recruiter: true,
    }, {returnOriginal: false})
    if(userDoc){
      userDoc.password=""
      return res.status(200).json(userDoc);
    }else{
      return res.status(404).json({ error: "No user found" });
    }
  }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: error.message || "some error occured trying to login" });
  }
}