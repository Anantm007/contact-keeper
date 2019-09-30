const express = require('express');

const app = express();

app.get('/', async(req,res) => {
    res.json({msg: 'Welcome to contact keeper API'});
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server starten on port  ${PORT}`));