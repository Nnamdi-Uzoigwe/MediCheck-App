const Profile = require("../models/Profile.js");

// const createProfile = async (req, res) => {
//   try {
//     const profile = new Profile(req.body);
//     await profile.save();
//     res.status(201).json(profile);
//   } catch (error) {
//     res.status(400).json({ message: "Error creating profile", error: error.message });
//   }
// };

const createProfile = async (req, res) => {
  try {
    const profile = new Profile({ ...req.body, userId: req.body.userId });
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ message: "Error creating profile", error: error.message });
  }
};


/**
 * Get a profile by ID
 * GET /api/profiles/:id
 */
// const getProfile = async (req, res) => {
//   try {
//     const profile = await Profile.findById(req.params.id);

//     if (!profile) {
//       return res.status(404).json({ message: "Profile not found" });
//     }

//     res.json(profile);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching profile", error: error.message });
//   }
// };

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
};


/**
 * Update a profile
 * PUT /api/profiles/:id
 */
// const updateProfile = async (req, res) => {
//   try {
//     const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
//       new: true, // return updated document
//       runValidators: true, // validate before update
//     });

//     if (!profile) {
//       return res.status(404).json({ message: "Profile not found" });
//     }

//     res.json(profile);
//   } catch (error) {
//     res.status(400).json({ message: "Error updating profile", error: error.message });
//   }
// };

const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: "Error updating profile", error: error.message });
  }
};


module.exports = {
    createProfile,
    getProfile,
    updateProfile,
};