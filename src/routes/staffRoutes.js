const express = require('express');
const router = express.Router();
const authorizeRoles = require("../middlewares/authorizeRole");
const authenticateUser = require("../middlewares/authMiddleware");

router.get('/', authenticateUser, authorizeRoles('staff'), (req, res) => {
  res.json({ message: "Welcome, Staff!", user: req.user });
});

module.exports = router;
