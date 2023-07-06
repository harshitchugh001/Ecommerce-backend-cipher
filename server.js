const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();

const port = 8080;


mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.MONGO_URI, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
     })
    .then(() => console.log("DB Connected"));

mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`);
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(express.json());
//product management
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');

app.use('/api/product', productRoutes);
app.use('/api/user', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
