const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/?directConnection=true"

const connecttomongo = () => {
    mongoose.connect(mongoURI)
}

module.exports=connecttomongo;
