const adminMiddleware = (req, res, next) => {
  if (req.isAdmin || req.isStaff) {
    return next();
  }

  return res.status(403).json({ message: "Access denied. Admin/Staff only." });
};

export default adminMiddleware;
