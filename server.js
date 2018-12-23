import express, { Router } from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import { logger } from "./helpers";
import route from "./routes/users";
import unauthoriziedRoute from "./routes/unauthorized";
import userNotFoundRoute from "./routes/userNotFound";
import { errors } from "./handlers";
import passportConfig from "./passport";

// Initiate App
const app = express();

const router = new Router();

// Middlewares.

app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:3000"
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);

// Database Connection

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://localhost/jointifybackend",
      {
        useNewUrlParser: true,
        autoIndex: false
      }
    );
    console.log("mongoDB connected");
  } catch (err) {
    console.log(err);
  }
};

// 1- fire up the db connection
connectDB();

// Routes.

// 1- Root path.

app.get("/", (req, res) => {
  res.send("Api root");
});

// 2- User Routes.

app.use("/users", route);

// 3- Error Handling Middlewares.

router.use(errors.notFound, errors.format, errors.handler);

// 4- Unauthorized route

app.use(unauthoriziedRoute);

// 5- User Not Found Route

app.use(userNotFoundRoute);

// Start Server.

const PORT = process.env.PORT || 9001;
app.listen(PORT, err => {
  if (err) throw err;
  logger.info(`> Ready on http://localhost:${PORT}`);
});
