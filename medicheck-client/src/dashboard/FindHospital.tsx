

// import { useState } from "react";
// import DashboardLayout from "../components/DashboardLayout";

// interface Hospital {
//   id: string;
//   name: string;
//   lat: number;
//   lon: number;
//   distanceKm?: number;
// }

// export default function FindHospital() {
//   const [locationInput, setLocationInput] = useState("");
//   const [coords, setCoords] = useState<[number, number] | null>(null);
//   const [hospitals, setHospitals] = useState<Hospital[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Convert user input to coordinates via Nominatim
//   const geocodeAddress = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const res = await fetch(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//           locationInput
//         )}`,
//         {
//           headers: { "Accept-Language": "en" },
//         }
//       );

//       if (!res.ok) throw new Error("Failed to fetch location");
//       const data = await res.json();
//       if (!data.length) throw new Error("Location not found");

//       const lat = parseFloat(data[0].lat);
//       const lon = parseFloat(data[0].lon);
//       setCoords([lat, lon]);

//       fetchHospitals(lat, lon);
//     } catch (err: any) {
//       setError(err.message || "Error finding location");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Calculate distance between two lat/lon pairs (Haversine formula)
//   const haversineKm = (a: [number, number], b: [number, number]) => {
//     const [lat1, lon1] = a;
//     const [lat2, lon2] = b;
//     const toRad = (v: number) => (v * Math.PI) / 180;
//     const R = 6371;
//     const dLat = toRad(lat2 - lat1);
//     const dLon = toRad(lon2 - lon1);
//     const s1 =
//       Math.sin(dLat / 2) ** 2 +
//       Math.cos(toRad(lat1)) *
//         Math.cos(toRad(lat2)) *
//         Math.sin(dLon / 2) ** 2;
//     return R * (2 * Math.atan2(Math.sqrt(s1), Math.sqrt(1 - s1)));
//   };

//   // Fetch nearby hospitals from Overpass API
//   const fetchHospitals = async (lat: number, lon: number) => {
//     try {
//       setLoading(true);
//       setError(null);

//       const query = `
//         [out:json][timeout:25];
//         (
//           node["amenity"="hospital"](around:5000,${lat},${lon});
//           way["amenity"="hospital"](around:5000,${lat},${lon});
//           relation["amenity"="hospital"](around:5000,${lat},${lon});
//         );
//         out center tags;
//       `;

//       const res = await fetch("https://overpass-api.de/api/interpreter", {
//         method: "POST",
//         body: query,
//         headers: { "Content-Type": "text/plain;charset=UTF-8" },
//       });

//       if (!res.ok) throw new Error("Failed to fetch hospitals");

//       const data = await res.json();

//       const results: Hospital[] = (data.elements || [])
//         .map((el: any) => {
//           const name =
//             el.tags?.name || el.tags?.["name:en"] || "Unnamed Hospital";
//           const latlng: [number, number] =
//             el.type === "node"
//               ? [el.lat, el.lon]
//               : el.center
//               ? [el.center.lat, el.center.lon]
//               : null;

//           if (!latlng) return null;

//           const distanceKm = haversineKm([lat, lon], latlng);
//           return {
//             id: String(el.id),
//             name,
//             lat: latlng[0],
//             lon: latlng[1],
//             distanceKm: Math.round(distanceKm * 10) / 10,
//           };
//         })
//         .filter(Boolean) as Hospital[];

//       results.sort((a, b) => (a.distanceKm! - b.distanceKm!));
//       setHospitals(results.slice(0, 10));
//     } catch (err: any) {
//       setError(err.message || "Error fetching hospitals");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Save selected hospital to backend
//   const saveHospital = async (hospital: Hospital) => {
//     try {
//       const res = await fetch("/api/hospitals/select", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: hospital.name,
//           address: "", // optional
//           location: { lat: hospital.lat, lng: hospital.lon },
//         }),
//       });

//       const data = await res.json();
//       alert(data.message || "Hospital saved");
//     } catch (err) {
//       console.error(err);
//       alert("Error saving hospital");
//     }
//   };

//   return (
//     <DashboardLayout>
//     <div className="max-w-3xl mx-auto px-4 py-6">
//       <h1 className="text-2xl font-bold mb-4">
//         Find Nearby Hospitals
//       </h1>

//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Enter your current location"
//           value={locationInput}
//           onChange={(e) => setLocationInput(e.target.value)}
//           className="flex-1 border rounded-lg px-3 py-2"
//         />
//         <button
//           onClick={geocodeAddress}
//           disabled={!locationInput || loading}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
//         >
//           Search
//         </button>
//       </div>

//       {error && (
//         <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-800">
//           {error}
//         </div>
//       )}

//       {loading && <div>Loading...</div>}

//       {!loading && hospitals.length > 0 && (
//         <div className="space-y-3">
//           {hospitals.map((h) => (
//             <div
//               key={h.id}
//               className="p-4 rounded-lg border shadow-sm flex justify-between items-center"
//             >
//               <div>
//                 <div className="font-semibold">{h.name}</div>
//                 {h.distanceKm !== undefined && (
//                   <div className="text-sm text-gray-600">
//                     {h.distanceKm} km away
//                   </div>
//                 )}
//               </div>
//               <div className="flex gap-2">
//                 <a
//                   href={`https://www.google.com/maps/dir/?api=1&destination=${h.lat},${h.lon}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
//                 >
//                   Get Directions
//                 </a>
//                 <button
//                   onClick={() => saveHospital(h)}
//                   className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
//                 >
//                   Select
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//     </DashboardLayout>
//   );
// }


// import React, { useState, useEffect, useRef } from 'react';
// import L from 'leaflet';
// import { MapPin, Search, Loader2 } from 'lucide-react';

// interface UserLocation {
//   address: string;
//   coordinates: {
//     lat: number;
//     lng: number;
//   };
// }

// const FindHospital: React.FC = () => {
//   const [userLocation, setUserLocation] = useState('');
//   const [currentLocation, setCurrentLocation] = useState<UserLocation | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [searchPerformed, setSearchPerformed] = useState(false);

//   const mapRef = useRef<HTMLDivElement>(null);

//   // Free geocoding using Nominatim
//   const geocodeLocation = async (address: string): Promise<UserLocation | null> => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/geocode?address=${encodeURIComponent(address)}`);

//       if (!response.ok) throw new Error('Geocoding failed');

//       const data = await response.json();
//       if (data.length === 0) throw new Error('Location not found');

//       const feature = data[0];
//       return {
//         address: feature.display_name,
//         coordinates: { lat: parseFloat(feature.lat), lng: parseFloat(feature.lon) },
//       };
//     } catch (error) {
//       console.error('Geocoding error:', error);
//       return null;
//     }
//   };

//   const searchLocation = async () => {
//     if (!userLocation.trim()) {
//       alert('Please enter your location');
//       return;
//     }

//     setLoading(true);
//     setSearchPerformed(false);

//     try {
//       const userCoords = await geocodeLocation(userLocation);
//       if (!userCoords) throw new Error('Could not find your location.');

//       setCurrentLocation(userCoords);
//       setSearchPerformed(true);
//     } catch (error) {
//       console.error('Search error:', error);
//       alert(error instanceof Error ? error.message : 'Failed to search location.');
//       setCurrentLocation(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Leaflet Map for user location only
//   // useEffect(() => {
//   //   if (!currentLocation || !mapRef.current) return;

//   //   const map = L.map(mapRef.current).setView(
//   //     [currentLocation.coordinates.lat, currentLocation.coordinates.lng],
//   //     13
//   //   );

//   //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   //     attribution: '&copy; OpenStreetMap contributors',
//   //   }).addTo(map);

//   //   L.marker([currentLocation.coordinates.lat, currentLocation.coordinates.lng])
//   //     .addTo(map)
//   //     .bindPopup('You are here')
//   //     .openPopup();

//   //   return () => map.remove();
//   // }, [currentLocation]);

//   useEffect(() => {
//   if (!currentLocation || !mapRef.current) return;

//   // Create the map
//   const map: L.Map = L.map(mapRef.current).setView(
//     [currentLocation.coordinates.lat, currentLocation.coordinates.lng],
//     13
//   );

//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; OpenStreetMap contributors',
//   }).addTo(map);

//   L.marker([currentLocation.coordinates.lat, currentLocation.coordinates.lng])
//     .addTo(map)
//     .bindPopup('You are here')
//     .openPopup();

//   // Cleanup on unmount
//   return () => {
//     map.remove();
//   };
// }, [currentLocation]);


//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') searchLocation();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Your Location</h1>
//           <p className="text-gray-600">Enter your location to see it on the map</p>
//         </div>

//         {/* Search Section */}
//         <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="flex-1 relative">
//               <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Enter your current location (e.g., Victoria Island, Lagos)"
//                 value={userLocation}
//                 onChange={(e) => setUserLocation(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//             <button
//               onClick={searchLocation}
//               disabled={loading}
//               className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
//             >
//               {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Search className="w-5 h-5 mr-2" />Search</>}
//             </button>
//           </div>
//         </div>

//         {/* Map */}
//         {currentLocation && <div ref={mapRef} className="w-full h-64 rounded-lg mb-6" />}

//         {/* No Results */}
//         {searchPerformed && !currentLocation && !loading && (
//           <div className="text-center py-12">
//             <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Location not found</h3>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FindHospital;


// import React, { useState } from 'react';
// import { MapPin, Search, Loader2, Navigation, Heart, Phone, Clock, Star, ExternalLink } from 'lucide-react';

// interface UserLocation {
//   address: string;
//   coordinates: {
//     lat: number;
//     lng: number;
//   };
// }

// interface Hospital {
//   id: string;
//   name: string;
//   address: string;
//   coordinates: { lat: number; lng: number };
//   distance: number;
//   phone?: string;
//   rating?: number;
//   type: string;
//   openHours?: string;
// }

// const FindHospital: React.FC = () => {
//   const [userLocation, setUserLocation] = useState('');
//   const [currentLocation, setCurrentLocation] = useState<UserLocation | null>(null);
//   const [hospitals, setHospitals] = useState<Hospital[]>([]);
//   const [savedHospitals, setSavedHospitals] = useState<Set<string>>(new Set());
//   const [loading, setLoading] = useState(false);
//   const [searchPerformed, setSearchPerformed] = useState(false);

//   // Sample hospitals data for demonstration
//   const sampleHospitals: Hospital[] = [
//     {
//       id: '1',
//       name: 'National Hospital Abuja',
//       address: 'Central Business District, Abuja',
//       coordinates: { lat: 9.0579, lng: 7.4951 },
//       distance: 2.3,
//       phone: '+234 9 461 2345',
//       rating: 4.2,
//       type: 'General Hospital',
//       openHours: '24/7'
//     },
//     {
//       id: '2',
//       name: 'University of Abuja Teaching Hospital',
//       address: 'Gwagwalada, Abuja',
//       coordinates: { lat: 8.9420, lng: 7.0840 },
//       distance: 3.1,
//       phone: '+234 9 670 2589',
//       rating: 4.0,
//       type: 'Teaching Hospital',
//       openHours: '24/7'
//     },
//     {
//       id: '3',
//       name: 'Garki Hospital',
//       address: 'Garki District, Abuja',
//       coordinates: { lat: 9.0330, lng: 7.4908 },
//       distance: 4.2,
//       phone: '+234 9 234 5678',
//       rating: 3.8,
//       type: 'General Hospital',
//       openHours: '6:00 AM - 10:00 PM'
//     },
//     {
//       id: '4',
//       name: 'Maitama District Hospital',
//       address: 'Maitama, Abuja',
//       coordinates: { lat: 9.0820, lng: 7.4951 },
//       distance: 5.1,
//       phone: '+234 9 876 5432',
//       rating: 4.1,
//       type: 'District Hospital',
//       openHours: '24/7'
//     },
//     {
//       id: '5',
//       name: 'Wuse General Hospital',
//       address: 'Wuse 2, Abuja',
//       coordinates: { lat: 9.0579, lng: 7.4871 },
//       distance: 6.3,
//       phone: '+234 9 345 6789',
//       rating: 3.9,
//       type: 'General Hospital',
//       openHours: '24/7'
//     }
//   ];

//   // Calculate distance between two coordinates (Haversine formula)
//   const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
//     const R = 6371; // Earth's radius in kilometers
//     const dLat = (lat2 - lat1) * Math.PI / 180;
//     const dLon = (lon2 - lon1) * Math.PI / 180;
//     const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//               Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
//               Math.sin(dLon/2) * Math.sin(dLon/2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//     return R * c;
//   };

//   const geocodeLocation = async (address: string): Promise<UserLocation | null> => {
//     const searchStrategies = [
//       address,
//       address.replace(/^[^,]*,\s*/, ''),
//       `dakwo district abuja`,
//       `abuja, nigeria`
//     ];

//     for (const searchTerm of searchStrategies) {
//       try {
//         console.log('Trying search term:', searchTerm);
        
//         const response = await fetch(`http://localhost:5000/api/geocode?address=${encodeURIComponent(searchTerm)}`);
        
//         if (!response.ok) continue;

//         const data = await response.json();
//         console.log('Search results for', searchTerm, ':', data);
        
//         if (data.length > 0) {
//           const feature = data[0];
//           return {
//             address: feature.display_name,
//             coordinates: { lat: parseFloat(feature.lat), lng: parseFloat(feature.lon) },
//           };
//         }
//       } catch (error) {
//         console.error(`Error searching for "${searchTerm}":`, error);
//         continue;
//       }
//     }

//     return null;
//   };

//   const findNearbyHospitals = (userCoords: UserLocation) => {
//     const hospitalsWithDistance = sampleHospitals.map(hospital => ({
//       ...hospital,
//       distance: calculateDistance(
//         userCoords.coordinates.lat,
//         userCoords.coordinates.lng,
//         hospital.coordinates.lat,
//         hospital.coordinates.lng
//       )
//     }));

//     return hospitalsWithDistance.sort((a, b) => a.distance - b.distance).slice(0, 5);
//   };

//   const searchLocation = async () => {
//     if (!userLocation.trim()) {
//       alert('Please enter your location');
//       return;
//     }

//     setLoading(true);
//     setSearchPerformed(false);
//     setHospitals([]);

//     try {
//       const userCoords = await geocodeLocation(userLocation);
      
//       if (!userCoords) {
//         const useManual = window.confirm(
//           'Could not find your exact location. Would you like to:\n' +
//           '• Click OK to use Abuja center as approximate location\n' +
//           '• Click Cancel to try a different address'
//         );
        
//         if (useManual) {
//           const fallbackLocation: UserLocation = {
//             address: 'Abuja, Federal Capital Territory, Nigeria',
//             coordinates: { lat: 9.0765, lng: 7.3986 }
//           };
//           setCurrentLocation(fallbackLocation);
//           const nearbyHospitals = findNearbyHospitals(fallbackLocation);
//           setHospitals(nearbyHospitals);
//           setSearchPerformed(true);
//         } else {
//           throw new Error('Please try a simpler address like "Wuse 2 Abuja" or "Garki Abuja"');
//         }
//       } else {
//         setCurrentLocation(userCoords);
//         const nearbyHospitals = findNearbyHospitals(userCoords);
//         setHospitals(nearbyHospitals);
//         setSearchPerformed(true);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       alert(error instanceof Error ? error.message : 'Failed to search location.');
//       setCurrentLocation(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openInGoogleMaps = (hospital: Hospital) => {
//     const url = `https://www.google.com/maps/dir/${currentLocation?.coordinates.lat},${currentLocation?.coordinates.lng}/${hospital.coordinates.lat},${hospital.coordinates.lng}`;
//     window.open(url, '_blank');
//   };

//   const toggleSaveHospital = (hospitalId: string) => {
//     const newSaved = new Set(savedHospitals);
//     if (newSaved.has(hospitalId)) {
//       newSaved.delete(hospitalId);
//     } else {
//       newSaved.add(hospitalId);
//     }
//     setSavedHospitals(newSaved);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') searchLocation();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Nearby Hospitals</h1>
//           <p className="text-gray-600">Enter your location to find the closest hospitals</p>
//         </div>

//         {/* Search Section */}
//         <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="flex-1 relative">
//               <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Enter your current location (e.g., Dakwo District, Abuja)"
//                 value={userLocation}
//                 onChange={(e) => setUserLocation(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//             <button
//               onClick={searchLocation}
//               disabled={loading}
//               className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
//             >
//               {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Search className="w-5 h-5 mr-2" />Search</>}
//             </button>
//           </div>
//         </div>

//         {/* Current Location Display */}
//         {currentLocation && (
//           <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
//             <div className="flex items-center">
//               <MapPin className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
//               <div>
//                 <p className="text-sm text-green-800 font-medium">Your Location:</p>
//                 <p className="text-green-700">{currentLocation.address}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Hospitals List */}
//         {hospitals.length > 0 && (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Top 5 Nearest Hospitals</h2>
//             {hospitals.map((hospital) => (
//               <div key={hospital.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
//                 <div className="flex justify-between items-start mb-4">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-2">
//                       <h3 className="text-xl font-semibold text-gray-800">{hospital.name}</h3>
//                       {hospital.rating && (
//                         <div className="flex items-center">
//                           <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                           <span className="text-sm text-gray-600 ml-1">{hospital.rating}</span>
//                         </div>
//                       )}
//                     </div>
//                     <p className="text-gray-600 mb-1">{hospital.address}</p>
//                     <p className="text-sm text-blue-600 font-medium">{hospital.type}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-lg font-semibold text-green-600">{hospital.distance.toFixed(1)} km</p>
//                     <p className="text-sm text-gray-500">away</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//                   {hospital.phone && (
//                     <div className="flex items-center text-gray-600">
//                       <Phone className="w-4 h-4 mr-2" />
//                       <span className="text-sm">{hospital.phone}</span>
//                     </div>
//                   )}
//                   {hospital.openHours && (
//                     <div className="flex items-center text-gray-600">
//                       <Clock className="w-4 h-4 mr-2" />
//                       <span className="text-sm">{hospital.openHours}</span>
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => openInGoogleMaps(hospital)}
//                     className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
//                   >
//                     <Navigation className="w-4 h-4 mr-2" />
//                     Get Directions
//                     <ExternalLink className="w-3 h-3 ml-2" />
//                   </button>
//                   <button
//                     onClick={() => toggleSaveHospital(hospital.id)}
//                     className={`px-4 py-2 rounded-lg transition-colors flex items-center justify-center ${
//                       savedHospitals.has(hospital.id)
//                         ? 'bg-red-100 text-red-700 hover:bg-red-200'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                     }`}
//                   >
//                     <Heart 
//                       className={`w-4 h-4 ${savedHospitals.has(hospital.id) ? 'fill-current' : ''}`} 
//                     />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* No Results */}
//         {searchPerformed && hospitals.length === 0 && !loading && (
//           <div className="text-center py-12">
//             <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">No hospitals found</h3>
//             <p className="text-gray-600">Try searching for a different location</p>
//           </div>
//         )}

//         {/* Saved Hospitals Counter */}
//         {savedHospitals.size > 0 && (
//           <div className="fixed bottom-6 right-6 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg">
//             <Heart className="w-4 h-4 inline mr-2" />
//             {savedHospitals.size} Saved
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FindHospital;











import React, { useState } from 'react';
import { MapPin, Search, Loader2, Navigation, Heart, Phone, Clock, Star, ExternalLink } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

interface UserLocation {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface Hospital {
  id: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  distance: number;
  phone?: string;
  rating?: number;
  type: string;
  openHours?: string;
}

const FindHospital: React.FC = () => {
  const [userLocation, setUserLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState<UserLocation | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [savedHospitals, setSavedHospitals] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [usingGPS, setUsingGPS] = useState(false);

  // Sample hospitals data for demonstration
  const sampleHospitals: Hospital[] = [
    {
      id: '1',
      name: 'National Hospital Abuja',
      address: 'Central Business District, Abuja',
      coordinates: { lat: 9.0579, lng: 7.4951 },
      distance: 2.3,
      phone: '+234 9 461 2345',
      rating: 4.2,
      type: 'General Hospital',
      openHours: '24/7'
    },
    {
      id: '2',
      name: 'University of Abuja Teaching Hospital',
      address: 'Gwagwalada, Abuja',
      coordinates: { lat: 8.9420, lng: 7.0840 },
      distance: 3.1,
      phone: '+234 9 670 2589',
      rating: 4.0,
      type: 'Teaching Hospital',
      openHours: '24/7'
    },
    {
      id: '3',
      name: 'Garki Hospital',
      address: 'Garki District, Abuja',
      coordinates: { lat: 9.0330, lng: 7.4908 },
      distance: 4.2,
      phone: '+234 9 234 5678',
      rating: 3.8,
      type: 'General Hospital',
      openHours: '6:00 AM - 10:00 PM'
    },
    {
      id: '4',
      name: 'Maitama District Hospital',
      address: 'Maitama, Abuja',
      coordinates: { lat: 9.0820, lng: 7.4951 },
      distance: 5.1,
      phone: '+234 9 876 5432',
      rating: 4.1,
      type: 'District Hospital',
      openHours: '24/7'
    },
    {
      id: '5',
      name: 'Wuse General Hospital',
      address: 'Wuse 2, Abuja',
      coordinates: { lat: 9.0579, lng: 7.4871 },
      distance: 6.3,
      phone: '+234 9 345 6789',
      rating: 3.9,
      type: 'General Hospital',
      openHours: '24/7'
    }
  ];

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Get user's actual GPS location
  const getCurrentGPSLocation = (): Promise<UserLocation> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Reverse geocode to get a readable address
            const response = await fetch(
              `http://localhost:5000/api/geocode/reverse?lat=${latitude}&lng=${longitude}`
            );
            
            let address = `Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            
            if (response.ok) {
              const data = await response.json();
              if (data.length > 0) {
                address = data[0].display_name || address;
              }
            }
            
            resolve({
              address,
              coordinates: { lat: latitude, lng: longitude }
            });
          } catch (error) {
            // If reverse geocoding fails, still return the coordinates
            resolve({
              address: `GPS Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
              coordinates: { lat: latitude, lng: longitude }
            });
          }
        },
        (error) => {
          let errorMessage = 'Unable to get your location. ';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'Please allow location access.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += 'Location information unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage += 'Location request timed out.';
              break;
            default:
              errorMessage += 'An unknown error occurred.';
              break;
          }
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  };

  const geocodeLocation = async (address: string): Promise<UserLocation | null> => {
    const searchStrategies = [
      address,
      address.replace(/^[^,]*,\s*/, ''),
      `dakwo district abuja`,
      `abuja, nigeria`
    ];

    for (const searchTerm of searchStrategies) {
      try {
        console.log('Trying search term:', searchTerm);
        
        const response = await fetch(`http://localhost:5000/api/geocode?address=${encodeURIComponent(searchTerm)}`);
        
        if (!response.ok) continue;

        const data = await response.json();
        console.log('Search results for', searchTerm, ':', data);
        
        if (data.length > 0) {
          const feature = data[0];
          return {
            address: feature.display_name,
            coordinates: { lat: parseFloat(feature.lat), lng: parseFloat(feature.lon) },
          };
        }
      } catch (error) {
        console.error(`Error searching for "${searchTerm}":`, error);
        continue;
      }
    }

    return null;
  };

  const findNearbyHospitals = (userCoords: UserLocation) => {
    const hospitalsWithDistance = sampleHospitals.map(hospital => ({
      ...hospital,
      distance: calculateDistance(
        userCoords.coordinates.lat,
        userCoords.coordinates.lng,
        hospital.coordinates.lat,
        hospital.coordinates.lng
      )
    }));

    return hospitalsWithDistance.sort((a, b) => a.distance - b.distance).slice(0, 5);
  };

  const useMyLocation = async () => {
    setLoading(true);
    setSearchPerformed(false);
    setHospitals([]);
    setUsingGPS(true);

    try {
      const gpsLocation = await getCurrentGPSLocation();
      setCurrentLocation(gpsLocation);
      const nearbyHospitals = findNearbyHospitals(gpsLocation);
      setHospitals(nearbyHospitals);
      setSearchPerformed(true);
      setUserLocation(''); // Clear manual input
    } catch (error) {
      console.error('GPS location error:', error);
      alert(error instanceof Error ? error.message : 'Failed to get your current location.');
      setUsingGPS(false);
    } finally {
      setLoading(false);
    }
  };

  const searchLocation = async () => {
    if (!userLocation.trim()) {
      alert('Please enter your location');
      return;
    }

    setLoading(true);
    setSearchPerformed(false);
    setHospitals([]);
    setUsingGPS(false);

    try {
      const userCoords = await geocodeLocation(userLocation);
      
      if (!userCoords) {
        const useManual = window.confirm(
          'Could not find your exact location. Would you like to:\n' +
          '• Click OK to use Abuja center as approximate location\n' +
          '• Click Cancel to try a different address'
        );
        
        if (useManual) {
          const fallbackLocation: UserLocation = {
            address: 'Abuja, Federal Capital Territory, Nigeria',
            coordinates: { lat: 9.0765, lng: 7.3986 }
          };
          setCurrentLocation(fallbackLocation);
          const nearbyHospitals = findNearbyHospitals(fallbackLocation);
          setHospitals(nearbyHospitals);
          setSearchPerformed(true);
        } else {
          throw new Error('Please try a simpler address like "Wuse 2 Abuja" or "Garki Abuja"');
        }
      } else {
        setCurrentLocation(userCoords);
        const nearbyHospitals = findNearbyHospitals(userCoords);
        setHospitals(nearbyHospitals);
        setSearchPerformed(true);
      }
    } catch (error) {
      console.error('Search error:', error);
      alert(error instanceof Error ? error.message : 'Failed to search location.');
      setCurrentLocation(null);
    } finally {
      setLoading(false);
    }
  };

  const openInGoogleMaps = (hospital: Hospital) => {
    const url = `https://www.google.com/maps/dir/${currentLocation?.coordinates.lat},${currentLocation?.coordinates.lng}/${hospital.coordinates.lat},${hospital.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const toggleSaveHospital = (hospitalId: string) => {
    const newSaved = new Set(savedHospitals);
    if (newSaved.has(hospitalId)) {
      newSaved.delete(hospitalId);
    } else {
      newSaved.add(hospitalId);
    }
    setSavedHospitals(newSaved);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') searchLocation();
  };

  return (
    <DashboardLayout>
    <div className="mt-0 lg:mt-6 min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Nearby Hospitals</h1>
          <p className="text-gray-600">Use your GPS location or enter an address to find the closest hospitals</p>
        </div>

        {/* Location Options */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="mb-4">
            <button
              onClick={useMyLocation}
              disabled={loading}
              className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mb-4 sm:mb-0 sm:mr-4"
            >
              {loading && usingGPS ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : (
                <MapPin className="w-5 h-5 mr-2" />
              )}
              Use My Current Location
            </button>
            <div className="text-center sm:inline-block my-4 sm:my-0 sm:mx-4 text-gray-500">or</div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter your location manually (e.g., Dakwo District, Abuja)"
                value={userLocation}
                onChange={(e) => setUserLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={searchLocation}
              disabled={loading || !userLocation.trim()}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
            >
              {loading && !usingGPS ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </>
              )}
            </button>
          </div>
        </div>

        {/* Current Location Display */}
        {currentLocation && (
          <div className={`border rounded-lg p-4 mb-6 ${usingGPS ? 'bg-blue-50 border-blue-200' : 'bg-green-50 border-green-200'}`}>
            <div className="flex items-center">
              <MapPin className={`w-5 h-5 mr-2 flex-shrink-0 ${usingGPS ? 'text-blue-600' : 'text-green-600'}`} />
              <div>
                <p className={`text-sm font-medium ${usingGPS ? 'text-blue-800' : 'text-green-800'}`}>
                  {usingGPS ? 'Your GPS Location:' : 'Your Location:'}
                </p>
                <p className={usingGPS ? 'text-blue-700' : 'text-green-700'}>{currentLocation.address}</p>
                {usingGPS && (
                  <p className="text-xs text-blue-600 mt-1">
                    ✓ Using precise GPS coordinates for accurate distance calculations
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Hospitals List */}
        {hospitals.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Top 5 Nearest Hospitals</h2>
            {hospitals.map((hospital) => (
              <div key={hospital.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{hospital.name}</h3>
                      {hospital.rating && (
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{hospital.rating}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 mb-1">{hospital.address}</p>
                    <p className="text-sm text-blue-600 font-medium">{hospital.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-green-600">{hospital.distance.toFixed(1)} km</p>
                    <p className="text-sm text-gray-500">away</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {hospital.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span className="text-sm">{hospital.phone}</span>
                    </div>
                  )}
                  {hospital.openHours && (
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{hospital.openHours}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => openInGoogleMaps(hospital)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </button>
                  <button
                    onClick={() => toggleSaveHospital(hospital.id)}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center justify-center ${
                      savedHospitals.has(hospital.id)
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Heart 
                      className={`w-4 h-4 ${savedHospitals.has(hospital.id) ? 'fill-current' : ''}`} 
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {searchPerformed && hospitals.length === 0 && !loading && (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No hospitals found</h3>
            <p className="text-gray-600">Try searching for a different location</p>
          </div>
        )}

        {/* Saved Hospitals Counter */}
        {savedHospitals.size > 0 && (
          <div className="fixed bottom-6 right-6 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg">
            <Heart className="w-4 h-4 inline mr-2" />
            {savedHospitals.size} Saved
          </div>
        )}
      </div>
    </div>
    </DashboardLayout>
  );
};

export default FindHospital;