const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const UserRoute = require("./routes/UserRoute");
const symptomRoute = require("./routes/symptomRoute");
const diagnosisRoute = require("./routes/diagnosisRoute");
const hospitalRoutes = require("./routes/hospitalRoute");
const geocodeRoute = require("./routes/geocode");
const hospitalsRoutes = require("./routes/hospitalsRoutes");
const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://medicheck-app.vercel.app', 'http://localhost:5173'], // Common frontend ports
  credentials: true
}));

app.use("/api/auth", UserRoute);
app.use("/api/symptoms", symptomRoute);
app.use("/api/diagnosis", diagnosisRoute);
app.use("/api/save-hospital", hospitalRoutes);
app.use('/api/geocode', geocodeRoute);
app.use("/api/hospitals", hospitalsRoutes);


mongoose.connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.log(err));
