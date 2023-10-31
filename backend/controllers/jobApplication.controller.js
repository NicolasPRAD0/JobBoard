const jobApplicationSchema = require("../models/jobApplicationSchema");

exports.jobApplication = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(406).json({ error: "Empty request" });
    }

    const { applicantId, offerId, firstName, lastName, email, age, message} = req.body;

    const offerApplication = new jobApplicationSchema({
      applicantId: applicantId,
      offerId: offerId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      age: age,
      message: message,
    });

    await offerApplication.save();

    return res.status(200);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({
        error: error.message || "some error occured trying apply to offer",
      });
  }
};

exports.getByApplicantId = async (req, res) => {
  try {
    const applicantId = req.params.id;
    const applications = await jobApplicationSchema.find({ applicantId: applicantId });
    res.json(applications);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};


exports.getAll = async(req,res) =>{
  try {

    let JobApplications = await jobApplicationSchema.find()

    if(JobApplications){
      return res.status(200).json(JobApplications);
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