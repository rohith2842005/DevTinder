const express = require('express');
const connectDB = require('./database.js');  // change to require
const app = express();
async function startServer() {
    try {
        await connectDB();
        app.listen(3000, () => {
            console.log("Server started on port 3000");
        });
    } catch (err) {
        console.error("Failed to start server:", err);
    }
}
startServer();
const user=require('./user.js');
app.use(express.json());
app.post('/users',async(req,res)=>{
    try{
        const newUser=new user(req.body);
        await newUser.save();
        res.status(201).send(newUser);
    }
    catch(err){
        res.status(400).send(err);
    }
});