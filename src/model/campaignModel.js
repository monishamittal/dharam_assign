const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  short_token: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  offers: [{
    offer_url: {
      type: String,
      required: true,
    },
    ratio_percentage: {
      type: String,
      required: true,
    },
  }],
  enabled: {
    type: Boolean,
    default: false
  },
  requests: {
    type: Number,
    default: 0
  },
}, { timestamps: true });


module.exports = mongoose.model("campaign", campaignSchema);