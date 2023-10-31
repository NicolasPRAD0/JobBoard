const UserSchema = require("../models/UserSchema");

const { generateHash } = require("../middleware/bcrypt");

exports.fetchOne = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(406).json({ error: "Missing params" });
    }

    let foundUser = await UserSchema.findById(req.params.id);
    foundUser.password = "";

    return res.status(200).json(foundUser);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: error.message || "some error occured trying to login" });
  }
};

exports.edit = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(406).json({ error: "Empty request" });
    }

    let newPassword;
    if (req.body.field == "password") {
      newPassword = await generateHash(req.body.value);
    }

    const updatedUser = await UserSchema.findByIdAndUpdate(
      req.body.id,
      {
        [req.body.field]:
          req.body.field == "password" ? newPassword : req.body.value,
      },
      { returnOriginal: false }
    );
    updatedUser.password = "";

    if (!updatedUser) return res.sendStatus(401);
    return res.status(200).json(updatedUser);
  } catch (error) {
    if (error.code == 11000) {
      return res.status(409).send();
    }
    return res
      .status(500)
      .json({ error: error.message || "some error occured trying to edit" });
  }
};


exports.getAll = async(req,res) =>{
  try {

    let Users = await UserSchema.find()

    if(Users){
      return res.status(200).json(Users);
    }
    else{
      return res.status(404).send()
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: error.message || "some error occured" });
  }

}
