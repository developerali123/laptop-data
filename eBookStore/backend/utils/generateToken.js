import jwt from "jsonwebtoken";

// Yeh function user ki ID le kar ek naya token generate karta hai
const generateToken = (id) => {
  return jwt.sign(
    { id }, // Data jo token mein save hoga (payload)
    process.env.JWT_SECRET, // Aapki .env file se secret key
    { expiresIn: "30d" } // Token 30 din mein expire hoga
  );
};

export default generateToken;
