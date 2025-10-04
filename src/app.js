const express = require('express');
const connectDB = require('./database.js');
const signinvalidation = require('./utils/signinvalidation.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const jwtSecret = "jwt_secret_key";

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
const user = require('./user.js');
app.use(express.json());
app.use(cookieParser());
app.post('/signin', async (req, res) => {
    data = req.body;
    try {
        signinvalidation(data);
        if (data.password) {
            const saltRounds = 10; 
            data.password = await bcrypt.hash(data.password, saltRounds);
        }
        const newuser = new user(data);
        await newuser.save();
        res.status(201).send(newuser);
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
});
app.get('/login', async (req, res) => {
    try {
        const { emailid, password } = req.body;
        if (!emailid || !password) {
            return res.status(400).send({ error: "Email and password are required" });
        }
        const existingUser = await user.findOne({ emailid });
        if (!existingUser) {
            return res.status(400).send({ error: "Invalid email or password" });
        }
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            return res.status(400).send({ error: "Invalid email or password" });
        }
        const token = jwt.sign({ _id: existingUser._id.toString() }, jwtSecret, { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 3600000 });
        res.status(200).send({ message: "Login successful", user: existingUser });
        
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});
app.get('/finduserbyid', async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).send({ error: "Unauthorized: No token provided" });
        }
        const id=jwt.verify(token, jwtSecret)._id;
        console.log(id);
    }
    catch (err) {
        res.status(401).send({ error: "Unauthorized: Invalid token" });
    }
});   


