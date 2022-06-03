const express = require('express');

const app = express()

app.get('/', (req,res) => {
    res.sendFile(`${__dirname}/views/index.html`)
});


const Port = process.env.PORT  || 3000
app.listen(Port);