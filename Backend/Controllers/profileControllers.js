const mongoose = require("mongoose");
const ProfileModel = require("../Models/profilesModels");
const ValidateProfile = require("../Validation/Profile");
const AddProfile = async (req, res) => {
  const { errors, isValid } = ValidateProfile(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      // console.log(req.user)
      ProfileModel.findOne({ user: req.user.id }).then(async (profile) => {
        if (!profile) {
          req.body.user = req.user.id;
          await ProfileModel.create(req.body);
          res.status(201).json({ message: "success" });
        } else {
          await ProfileModel.findOneAndUpdate({ _id: profile._id }, req.body, {
            new: true,
          }) //"new" send only the modified parts in profile model
            .then((result) => {
              res.status(201).json(result);
            });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const FindAllProfiles = async (req, res) => {
  try {
    const data = await ProfileModel.find().populate('user',["name","email","role"]);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const FindSingleProfile = async (req, res) => {
  try {
    const data = await ProfileModel.findOne({ user: req.user.id }).populate('user',["name","email","role"]);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const DeleteProfile = async (req, res) => {
  try {
    const { id } = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such Profile" });
    }
    const data = await ProfileModel.findOneAndRemove({ _id: id });
    if (!data) {
      return res.status(400).json({ error: "No such Profile" });
    }
    res.status(200).json({ message: "Profile deleted" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};
module.exports = {
  AddProfile,
  FindAllProfiles,
  FindSingleProfile,
  DeleteProfile,
};
