const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require("./models/todoList");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to your MongoDB database (replace with your database URL)
mongoose.connect("mongodb+srv://joliehuang:todolist@cluster0.op5qo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Check for database connection errors
mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
});

// Serve the front-end files (if using static files)
// Replace 'public' with the directory containing your front-end
app.use(express.static("public"));

// Get saved tasks from the database
app.get("/getTodoList", (req, res) => {
    TodoModel.find({})
        .then((todoList) => res.json(todoList))
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Add new task to the database
app.post("/addTodoList", (req, res) => {
    TodoModel.create({
        task: req.body.task,
        status: req.body.status,
        deadline: req.body.deadline,
        description: req.body.description,
    })
        .then((todo) => res.json(todo))
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Update task fields (including deadline)
app.put("/updateTodoList/:id", (req, res) => {
    const id = req.params.id;
    const updateData = {
        task: req.body.task,
        status: req.body.status,
        deadline: req.body.deadline,
        description: req.body.description,
    };
    TodoModel.findByIdAndUpdate(id, updateData, { new: true })
        .then((todo) => res.json(todo))
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Delete task from the database
app.delete("/deleteTodoList/:id", (req, res) => {
    const id = req.params.id;
    TodoModel.findByIdAndDelete(id)
        .then((todo) => res.json({ message: "Task deleted successfully", todo }))
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Serve JSON data when clicking "View Products JSON"
app.get("/viewProductsJSON", (req, res) => {
    TodoModel.find({})
        .then((todoList) => res.json(todoList))
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Start the server
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
