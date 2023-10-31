const mongoose = require('mongoose');

const jobOfferSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  companyLogo:{
    type: String,
    required: false
  },
  contractType:{
    type: String,
    required: true
  },
  duration:{
    type: String,
    required: false
  },
  summaryOffer:{
    type: String,
    maxLenght: 200,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  location:{
    type: String,
    required: true
  },
  dateStart:{
    type: Date,
    required: false
  },
  requirements:{
    type: String,
    required: false
  },
  wage:{
    type: Number,
    required: false
  },
  creatorId:{
    type: String,
  },
  companyId:{
    type: String,
  }
});

module.exports = mongoose.model('jobOffer', jobOfferSchema);