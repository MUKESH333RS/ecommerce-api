const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); 
const authorizeRoles = require('../middlewares/authorizeRole');    

router.get(
  '/',
  authMiddleware,
  authorizeRoles('admin'),
  (req, res) => {
    res.json({ message: "Welcome, Admin!" });
  }
);

module.exports = router;
