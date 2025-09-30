const express = require('express');
const app = express();
app.listen(3000, () => console.log('Server running on port 3000'));
app.get("/user", (req, res) => {
    res.json({ name: "John Doe", age: 30 });
});
app.post("/user", (req, res) => {
    res.status(201).json({ message: "User created" });
});
app.put("/user/:id", (req, res) => {
    res.json({ message: `User ${req.params.id} updated` });
}); 
app.delete("/user/:id", (req, res) => {
    res.json({ message: `User ${req.params.id} deleted` });
}   );
app.patch("/user/:id", (req, res) => {
    res.json({ message: `User ${req.params.id} partially updated` });
}   );
