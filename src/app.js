const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');         
const productRoutes = require('./routes/productRoutes');   
const adminRoutes = require('./routes/adminRoutes');       
const vendorRoutes = require('./routes/vendorRoutes');     
const staffRoutes = require('./routes/staffRoutes');       
const buyerRoutes = require('./routes/buyerRoutes');    
const testRoutes = require('./routes/testRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

const authMiddleware = require('./middlewares/authMiddleware');
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: "Access Granted", user: req.user });
});

app.use('/api/admin', adminRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/buyer', buyerRoutes); 

app.use('/api/products', productRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use('/api', testRoutes);

console.log('JWT Secret:', process.env.JWT_SECRET);
