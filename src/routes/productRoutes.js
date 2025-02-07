const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Optionally, if you want to protect product modification routes with authentication and role-based access,
// you can import and use the following middleware:
// const authMiddleware = require('../middlewares/authMiddleware');
// const authorizeRoles = require('../middlewares/authorizeRole');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
