require('dotenv').config();

const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

const connectDatabase = require("./db/connectDB");

const PORT = process.env.PORT || 5520;
const userRoute = require("./routes/userRoute");
const agentRoute = require("./routes/agentRoute")
const authRoute = require("./routes/authRoute");
const {verifyAccessToken} = require("./middleware/accessToken");
// const adminRoute = require("./routes/adminRoute");
// const agentRoute = require("./routes/agentRoute");

app.use(cors({ origin: ["http://127.0.0.1:5500", "http://localhost:8080"] }));
app.use(morgan("tiny"));
app.use(express.json());


app.use("/api/user", userRoute);
app.use("/api/auth/", authRoute);
app.use("/api/secure/", (req, res, next) => { verifyAccessToken(req, res, next) });
app.use("/api/agent/", agentRoute);
// app.use("/api/admin", adminRoute);

const start = async () => {
  try {
    // Initialize database
    await connectDatabase(process.env.MONGO_URI)

    // Express
    app.listen(PORT, function () {
      console.log(`Server is running on port ${PORT}....`);
    });
  } catch (error) {
    console.log(error)
  }
}

start()