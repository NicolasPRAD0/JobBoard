const UserSchema = require("../models/UserSchema");
const { generateHash, compareHash } = require("../middleware/bcrypt");
const CompanySchema = require("../models/CompanySchema");

exports.register = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(406).json({ error: "Empty request" });
    }
    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.name ||
      !req.body.lastName ||
      !req.body.birthDate
    ) {
      return res.status(406).json({ error: "missing data" });
    }

    const { email, password, name, lastName, birthDate, recruiter, company } = req.body;

    const foundCompany = CompanySchema.find({name: company})

    const hash = await generateHash(password);
    const newUser = new UserSchema({
      email: email,
      password: hash,
      name: name,
      lastName: lastName,
      birthDate: birthDate,
      recruiter: recruiter,
      company: "",
      companyId: "",
      confirmed: false,
    });

    const userAlreadyExists = await UserSchema.findOne({email: email})
    if(userAlreadyExists){
        return res.status(409).json({error: "email already in use"})
    }else{

    await newUser.save();

    return res.status(200).json({message: "Account successfuly created, request sent to company account"});

    }
  } catch (error) {
    console.log(error.message)
    return res
      .status(500)
      .json({
        error: error.message || "some error occured trying to register",
      });
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
    const { email, password } = req.body;
    const foundUser = await UserSchema.findOne({ email: email }).exec();
    if (!foundUser) return res.sendStatus(401);
    const isMatch = await compareHash(password, foundUser.password);

    if (isMatch) {
      const user= {
        uid: foundUser._id,
        email: foundUser.email,
        name: foundUser.name,
        recruiter: foundUser.recruiter,
        company: foundUser.company,
        confirmed: foundUser.confirmed,
        isAdmin: foundUser.isAdmin,
      }
      
      return res.status(200).json(user);
    } else {
      return res.status(401).send();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "some error occured trying to login" });
  }
};