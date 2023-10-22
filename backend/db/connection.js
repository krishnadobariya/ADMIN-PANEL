const mongoose = require('mongoose');
require('dotenv').config();

//DATABSE CONECTION
mongoose.connect(process.env.DATABSE)
    .then(() => {
        console.log("Database Connected Successfully");
    }).catch((err) => {
        console.log("Database Not Connected", err);
    })