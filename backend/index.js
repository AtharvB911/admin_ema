const express = require("express");
const connectDB = require("./config/db"); 
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.use('/api/events', require('./routes/event')); // Add this line to include the event routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
