const express = require("express");
// const fetch = require('node-fetch');
const router = express.Router();

// GET /api/geocode?address=...
router.get("/", async (req, res) => {
  const { address } = req.query;
  if (!address) return res.status(400).json({ error: "Address required" });

  try {
    // const response = await fetch(
    //   `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=ng&limit=1`
    // );

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}&countrycodes=ng&limit=1`,
      {
        headers: {
          "User-Agent": "MediCheckApp/1.0 (uzonnamdi31@gmail.com)", // REQUIRED
          "Accept-Language": "en",
        },
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch location" });
  }
});

// ADD THIS NEW ROUTE for reverse geocoding
router.get('/reverse', async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and longitude required' });
  }

  try {
    console.log('Reverse geocoding:', lat, lng);
    
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&countrycodes=ng`,
      {
        headers: {
          'User-Agent': 'MediCheckApp/1.0 (uzonnamdi31@gmail.com)',
          'Accept-Language': 'en',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Nominatim API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Reverse geocoding result:', data);
    
    // Return as array to match the format expected by frontend
    res.json([data]);
  } catch (err) {
    console.error('Reverse geocoding error:', err);
    res.status(500).json({ 
      error: 'Failed to reverse geocode location',
      details: err.message 
    });
  }
});

module.exports = router;
