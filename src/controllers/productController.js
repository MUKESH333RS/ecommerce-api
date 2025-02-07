let products = [];   
let nextId = 1;      

const createProduct = (req, res) => {
  const { name, description, category, price_old, price_new, vendor_id } = req.body;

  if (!name || !price_old || !price_new) {
    return res.status(400).json({ message: "Name, old price, and new price are required." });
  }

  const product = {
    id: nextId++,
    name,
    description: description || "",
    category: category || "",
    price_old: parseFloat(price_old).toFixed(2),
    price_new: parseFloat(price_new).toFixed(2),
    vendor_id: vendor_id || null,
    created_at: new Date()
  };

  products.push(product);
  res.status(201).json({ message: "Product created successfully", product });
};


const getProducts = (req, res) => {
  const productsWithDiscount = products.map(product => {
    const discountAmount = (product.price_old - product.price_new).toFixed(2);
    const discountPercentage = product.price_old > 0
      ? ((discountAmount / product.price_old) * 100).toFixed(2)
      : "0.00";
    return { ...product, discountAmount, discountPercentage };
  });
  res.json(productsWithDiscount);
};

const getProductById = (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === parseInt(id));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
};


const updateProduct = (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex(p => p.id === parseInt(id));
  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { name, description, category, price_old, price_new } = req.body;
  const existingProduct = products[productIndex];

  const updatedProduct = {
    ...existingProduct,
    name: name || existingProduct.name,
    description: description || existingProduct.description,
    category: category || existingProduct.category,
    price_old: price_old ? parseFloat(price_old).toFixed(2) : existingProduct.price_old,
    price_new: price_new ? parseFloat(price_new).toFixed(2) : existingProduct.price_new,
  };

  products[productIndex] = updatedProduct;
  res.json({ message: "Product updated successfully", product: updatedProduct });
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex(p => p.id === parseInt(id));
  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products.splice(productIndex, 1);
  res.json({ message: "Product deleted successfully" });
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
