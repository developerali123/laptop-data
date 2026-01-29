import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// Middleware 1: User ko protect karne ke liye (Login check)
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Frontend har request ke 'Authorization' header mein token bhejega
  // Token aisa dikhega: "Bearer [token_string]"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 'Bearer' lafz ko hata kar sirf token hasil karein
      token = req.headers.authorization.split(" ")[1];

      // Token ko verify karein (secret key use karke)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Token se user ki ID nikal kar, database se user ka data hasil karein
      // Password ko chhor kar
      req.user = await User.findById(decoded.id).select("-password");

      // Sab theek hai, agle step (controller) pe jao
      next();
    } catch (error) {
      console.error(error);
      res.status(401); // 401 Unauthorized
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Middleware 2: Admin check karne ke liye
const admin = (req, res, next) => {
  // Yeh 'protect' middleware ke BAAD chalega
  // Toh 'req.user' pehle se mojood hoga
  if (req.user && req.user.role === "admin") {
    next(); // User admin hai, agle step pe jao
  } else {
    res.status(403); // 403 Forbidden
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
