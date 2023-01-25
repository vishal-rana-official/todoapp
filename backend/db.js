const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/todoapp";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log('connected to todo app mongo database')
    })
}
mongoose.set('strictQuery', true);

module.exports = connectToMongo;