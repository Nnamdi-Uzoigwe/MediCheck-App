const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const UserRoute = require("./routes/UserRoute");
const symptomRoute = require("./routes/symptomRoute");
const diagnosisRoute = require("./routes/diagnosisRoute");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", UserRoute);
app.use("/api/symptoms", symptomRoute);
app.use("/api/diagnosis", diagnosisRoute);


mongoose.connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.log(err));
