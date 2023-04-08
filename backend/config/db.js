const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
require('dotenv').config();
const mongoURI = process.env.mongoURI;
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connnected to Mongo');
    } catch (error) {
        console.log({ msg: 'Something went wrong while connecting to mongoDb',Error: error })
    }
}
module.exports = connectToMongo;