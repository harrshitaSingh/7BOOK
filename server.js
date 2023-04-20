const express = require("express");
const apiRoutes = require("./routes/apiRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const dbConnect = require("./middlewares/db.js");

require("dotenv").config();
//Initialising database
dbConnect();

//Initialising Express
const app = express();

app.use(express.json());

//Basic Routes
app.use("/api", apiRoutes);
app.use("/auth", authRoutes);

const path = require("path");

// Step 1:
app.use(express.static(path.join(__dirname, "client/build")));
// Step 2:
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
const PORT = process.env.PORT;
app.listen(PORT || 80, () => console.log("Server Running"));
