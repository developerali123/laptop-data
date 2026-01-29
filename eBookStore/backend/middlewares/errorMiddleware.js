// 404 errors ke liye (jab koi route match na ho)
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Error ko agle middleware (errorHandler) pe bhej dega
};

// General error handler (koi bhi error aane par yeh chalega)
const errorHandler = (err, req, res, next) => {
  // Kabhi kabhi error 200 status ke saath aata hai, usse 500 set karo
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // Error ko JSON format mein bhej do
  res.json({
    message: err.message,
    // Stack trace sirf development mode mein dikhao
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
