const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://iNotebook:Dpz3t4VaAivZXBO2@atlascluster.hmqrnbm.mongodb.net/test";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connection with mongo established");
    })
}
module.exports = connectToMongo;
//Connection string to connect to MongoDB atlas
// mongodb+srv://iNotebook:Dpz3t4VaAivZXBO2@atlascluster.hmqrnbm.mongodb.net/test