const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const courseRoute = require("./routes/courseRoute");
const paymentRoute = require("./routes/paymentRoute");
const profileRoute = require("./routes/profileRoute");
const userRoute = require("./routes/userRoute");

const cors = require("cors");
app.use(
  cors({
    origin: [
      "https://master-ed-new.netlify.app",
      "http://localhost:5173",
      "https://ed-tech-platform-client.onrender.com","mv.vkas.me"
    ],
    credentials: true,
  })
);
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
const path = require("path");
const fileUpload = require("express-fileupload");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

const { dbConnect } = require("./config/connectDatabase");
dbConnect();
const { ConnectToCloudinary } = require("./config/cloudinaryConnect");
ConnectToCloudinary();

app.use("/api/beta/auth", userRoute);
app.use("/api/beta/course", courseRoute);
// app.use("/api/beta/payment",paymentRoute);
app.use("/api/beta/profile", profileRoute);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Server Started at Port no. ${PORT}`);
});
