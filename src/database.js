const mongoose = require('mongoose');
const url="mongodb+srv://musunururohith2_db_user:aNiqbDgiGcrd16MF@jspractice.6qk0rlr.mongodb.net/DevtinderDb";
function connectDB() {
   
        mongoose.connect(url);
        console.log("Connected to MongoDB");
}
module.exports = connectDB;

