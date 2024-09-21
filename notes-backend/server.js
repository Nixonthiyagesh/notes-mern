const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routeUrls = require("./routes/router");
const cors = require("cors");

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, () =>
  console.log("database connected")
);

app.use(express.json());
app.use(
  cors({
    origin: "https://notes-mern-fe.onrender.com", // Allow only your frontend domain
    credentials: true, // If you need to include cookies or authorization headers
  })
);
app.use("/notes", routeUrls);

const port = process.env.port || 4000

app.listen(port, () =>
  console.log("listening localhost "+port)
);
