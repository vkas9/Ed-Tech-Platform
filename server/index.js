const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const courseRoute = require("./routes/courseRoute");
const paymentRoute = require("./routes/paymentRoute");
const profileRoute = require("./routes/profileRoute");
const userRoute = require("./routes/userRoute");
const { dbConnect } = require("./config/connectDatabase");
const  typeDefs  = require("./graphql/typedefs/index");
const  resolvers  = require("./graphql/resolvers/index");

const PORT = process.env.PORT || 8080;

const startServer = async () =>
{
  const app = express();

  // Middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(
    cors({
      origin: [
        process.env.NETHOST,
        process.env.LOCALHOST,
        process.env.RENDERHOST,process.env.MVHOST,process.env.TEST999,process.env.LIVEHOST
      ],
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "public")));
  app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  }));

  // Set view engine
  app.set("view engine", "ejs");

  // Connect to database
  dbConnect();

  // Routes
  app.use("/api/beta/auth", userRoute);
  app.use("/api/beta/course", courseRoute);
  app.use("/api/beta/payment", paymentRoute);
  app.use("/api/beta/profile", profileRoute);

  // GraphQL server
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
  // Root route
  app.get("/", (_, res) => {
    res.render("index");
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer().catch((error) => {
  console.error('Error starting the server:', error);
});
