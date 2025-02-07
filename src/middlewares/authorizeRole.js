const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    console.log("User data from token:", req.user);
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Forbidden: No role found in token." });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: `Forbidden: Your role '${req.user.role}' does not have access.` });
    }
    next();
  };
};

module.exports = authorizeRoles;
