const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const courseRoute = require("./routes/courseRoute");
const paymentRoute = require("./routes/paymentRoute");
const profileRoute = require("./routes/profileRoute");
const userRoute = require("./routes/userRoute");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(
  cors({
    origin: [
      process.env.NETHOST,
      process.env.LOCALHOST,
      process.env.RENDERHOST,process.env.MVHOST,process.env.TEST999
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


app.get("/", (req, res) => {
  res.render("index");
});
app.use("/api/beta/auth", userRoute);
app.use("/api/beta/course", courseRoute);
app.use("/api/beta/payment",paymentRoute);
app.use("/api/beta/profile", profileRoute);

app.listen(PORT, () => {
  console.log(`Server Started at Port no. ${PORT}`);
});
