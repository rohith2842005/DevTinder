const mongoose = require('mongoose');
const url="mongodb+srv://musunururohith2_db_user:lUxP1a3Z8GDNJtGV@jspractice.6qk0rlr.mongodb.net/DevtinderDb";
function connectDB() {
   
        mongoose.connect(url);
        console.log("Connected to MongoDB");
}
module.exports = connectDB;

