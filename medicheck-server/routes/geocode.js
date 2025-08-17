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


// // GET /api/hospitals?lat=...&lng=...
// router.get('/hospitals', async (req, res) => {
//   const { lat, lng } = req.query;
//   if (!lat || !lng) {
//     return res.status(400).json({ error: 'Latitude and longitude required' });
//   }

//   try {
//     const response = await fetch(
//       `https://nominatim.openstreetmap.org/search?format=json&countrycodes=ng&limit=10&amenity=hospital&bounded=1&viewbox=${lng-0.1},${lat+0.1},${lng+0.1},${lat-0.1}`,
//       {
//         headers: {
//           'User-Agent': 'MediCheckApp/1.0 (uzonnamdi31@gmail.com)',
//           'Accept-Language': 'en',
//         },
//       }
//     );

//     const data = await response.json();
//     res.json(data);
//   } catch (err) {
//     console.error('Hospital search error:', err);
//     res.status(500).json({ error: 'Failed to fetch hospitals' });
//   }
// });



router.get("/hospitals", async (req, res) => {
  try {
    let { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: "Latitude and Longitude are required" });
    }

    // Convert to numbers
    lat = parseFloat(lat);
    lon = parseFloat(lon);

    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ error: "Invalid coordinates" });
    }

    // Example: bounding box around the given point
    const minLon = lon - 0.05;
    const maxLon = lon + 0.05;
    const minLat = lat - 0.05;
    const maxLat = lat + 0.05;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&bounded=1&viewbox=${minLon},${minLat},${maxLon},${maxLat}&q=hospital`
    );

    const data = await response.json();
    console.log("Backend returned:", data);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
