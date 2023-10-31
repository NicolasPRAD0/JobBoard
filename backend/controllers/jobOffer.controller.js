const jobOfferSchema = require("../models/jobOfferSchema");

exports.createOffer = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(406).json({ error: "Empty request" });
    }
    if (
      !req.body.jobTitle ||
      !req.body.companyName ||
      !req.body.contractType ||
      !req.body.summaryOffer ||
      !req.body.description ||
      !req.body.location

    ) {
      return res.status(406).json({ error: "missing data" });
    }

    const { jobTitle, companyName, contractType, duration, summaryOffer, description, location, dateStart, requirements, wage, creatorId, companyId} = req.body;

    const jobOffer = new jobOfferSchema({
      jobTitle: jobTitle,
      companyName: companyName,
      contractType: contractType,
      duration: duration || null,
      summaryOffer: summaryOffer,
      description: description,
      location: location,
      dateStart: dateStart || null,
      requirements: requirements || null,
      wage: wage || null,
      creatorId: creatorId,
      companyId: companyId
    });

    await jobOffer.save();

    return res.status(200);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({
        error: error.message || "some error occured trying to create a new offer",
      });
  }
};

exports.fetchOffers=async(req,res)=>{
  const jobOffers=await jobOfferSchema.find()
  res.json(jobOffers);
}

exports.getOfferById=async(req,res)=>{
  const jobOfferId = req.params.id;
  const jobOffer=await jobOfferSchema.findById(jobOfferId)
  try{
  if (jobOffer) {
      return res.status(200).json(jobOffer)
  } 
  else {
    return res.status(404).json({ error: 'Job offer not found' });
  }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteOffer = async (req, res) => {
  const jobOfferId = req.params.id;
  try { 
    const deletedDoc = await jobOfferSchema.findByIdAndDelete(jobOfferId);

    if (deletedDoc) {
      return res.status(200).json({ message: 'Job offer deleted successfully' });
    } else {
      return res.status(404).json({ error: 'Job offer not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateOffer = async (req,res) => {
  try {
    if (!req.body) {
      return res.status(406).json({ error: "Empty request" });
    }
    const updatedOffer = await jobOfferSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOffer) {
      return res.status(404).json({ error: "Job offer not found" });
    }
    res.status(200).json(updatedOffer);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to update offer' });
  }
}

exports.getAll = async(req,res) =>{
  try {

    let JobOffers = await jobOfferSchema.find()

    if(JobOffers){
      return res.status(200).json(JobOffers);
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
