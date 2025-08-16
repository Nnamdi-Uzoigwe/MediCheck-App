const SavedHospital = require("../models/SavedHospital");

// const saveHospital = async (req, res) => {

// try {
//     const { name, address, location, contactNumber, services } = req.body;

//     if (!name || !location?.lat || !location?.lng) {
//       return res.status(400).json({ error: "Name and location are required" });
//     }

//     // Check for duplicates
//     const existingHospital = await Hospital.findOne({
//       name: name.trim(),
//       "location.lat": location.lat,
//       "location.lng": location.lng,
//     });

//     if (existingHospital) {
//       return res.status(200).json({
//         message: "Hospital already exists in the database",
//         hospital: existingHospital,
//       });
//     }

//     // Create new hospital
//     const newHospital = new Hospital({
//       name: name.trim(),
//       address,
//       location,
//       contactNumber,
//       services,
//     });

//     await newHospital.save();

//     res.status(201).json({
//       message: "Hospital saved successfully",
//       hospital: newHospital,
//     });
//   } catch (err) {
//     console.error("❌ Error saving hospital:", err);
//     res.status(500).json({ error: "Failed to save hospital" });
//   }
// };


// module.exports = { saveHospital };


// 2. Save hospital
// app.post('/api/save-hospital', 
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
// app.get('/api/saved-hospitals/:userId', 
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