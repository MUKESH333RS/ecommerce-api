const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/authorizeRole');

router.get(
  '/',
  authMiddleware,
  authorizeRoles('vendor'),
  (req, res) => {
    res.json({ message: "Welcome, Vendor!" });
  }
);

module.exports = router;
