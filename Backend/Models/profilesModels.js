const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileModel = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    PhoneNum: "String",
    City: {
      type: "String",
      required: true,
    },

    Country: {
      type: "String",
      required: true,
    },
    postalCode: {
      type: "String",
      required: true,
    },
    image: "String",
    Bio: "String",
    Address: "String",
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("profiles", ProfileModel);
