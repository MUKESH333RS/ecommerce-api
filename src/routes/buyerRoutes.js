const express = require('express');
const router = express.Router();
const authorizeRoles = require("../middlewares/authorizeRole");
const authenticateUser = require("../middlewares/authMiddleware");

router.get('/', authenticateUser, authorizeRoles('user'), (req, res) => {
  res.json({ message: "Welcome, Buyer!", user: req.user });
});

module.exports = router;
