const SavedHospital = require("../models/SavedHospital");


  const saveHospital = async (req, res) => {
  const { userId, name, address, phone, distanceKm } = req.body;
  if (!userId || !name || !address) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const savedHospital = new SavedHospital({
      userId,
      name,
      address,
      phone,
      distanceKm,
    });
    await savedHospital.save();
    res.json(savedHospital);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save hospital' });
  }
};

// 3. Get saved hospitals for a user
  const getSavedHospitals = async (req, res) => {
  try {
    const hospitals = await SavedHospital.find({ userId: req.params.userId });
    res.json(hospitals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch hospitals' });
  }
};

module.exports = {
  saveHospital,
  getSavedHospitals,
};