const mongoose = require('mongoose');
require('dotenv').config();

const connection = async()=>{
    mongoose.connect(process.env.DB)
        .then(()=>console.log("mongo is ready!!!"));
}

module.exports = connection;