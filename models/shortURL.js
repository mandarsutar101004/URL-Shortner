const mongoose = require("mongoose");

//Schema
const urlSchema = new mongoose.Schema(
  {
    shortID: {
      type: String,
      require: true,
      unique: true,
    },
    originalURL: {
      type: String,
      require: true,
    },
    totalClicks: [
      {
        timestamp: {
          type: Number,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const URL = mongoose.model("shortURL", urlSchema);

module.exports = URL;
