const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

app.get('/', async(req,res) => {
    res.json({msg: 'Welcome to contact keeper API'});
})

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));


// Listen on PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));