import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
// import clients from '../utils/redis.js'

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      console.log(req.headers.authorization);
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //give user details from token

      req.id = decoded.id;

      next();
    } catch (err) {
      console.error(err);
      res.status(401);
      throw new Error("Not Authorized , token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

export { protect };
