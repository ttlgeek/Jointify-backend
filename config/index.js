require("dotenv").config({
  path: require("path").resolve(__dirname, "/.env")
}); // eslint-disable-line global-require

import passport from "passport";

export const NODE_ENV = process.env.NODE_ENV
  ? process.env.NODE_ENV.toLowerCase()
  : "development";
export const IS_DEV = NODE_ENV === "development";
export const IS_PROD = NODE_ENV === "production";
export const IS_TEST = NODE_ENV === "test";
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 9001;
export const JWT_SECRET =
  process.env.JWT_SECRET || "2EGC+1mwpmHXEnvi6YH96ycsbVwZ4Zymwe63Buzc";
export const passportAuth = passport.authenticate("local", {
  session: false,
  failureRedirect: "/userNotFound"
});
export const passportJWT = passport.authenticate("jwt", {
  session: false,
  failureRedirect: "/unauthorized"
});
