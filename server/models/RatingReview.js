const mongoose = require("mongoose");

const RatingReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
},{timestamps:true});
module.exports = mongoose.model("RatingReview", RatingReviewSchema);
