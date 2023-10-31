const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  applicantId: {
    type: String,
    required: true
  },
  offerId: {
    type: String,
    required: true
  },
  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  age:{
    type: Number,
    required: true
  },
  message:{
    type: String,
    required: true
  },
});

module.exports = mongoose.model('jobApplication', jobApplicationSchema);