// //server.js

// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors')
// const TodoModel = require("./models/todoList")

// var app = express();
// app.use(cors());
// app.use(express.json());


// // Connect to your MongoDB database (replace with your database URL)
// mongoose.connect("mongodb+srv://joliehuang:todolist@cluster0.op5qo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

// // Check for database connection errors
// mongoose.connection.on("error", (error) => {
//     console.error("MongoDB connection error:", error);
// });

// // Get saved tasks from the database
// app.get("/getTodoList", (req, res) => {
//     TodoModel.find({})
//         .then((todoList) => res.json(todoList))
//         .catch((err) => res.json(err))
// });

// // Add new task to the database
// app.post("/addTodoList", (req, res) => {
//     TodoModel.create({
//         task: req.body.task,
//         status: req.body.status,
//         deadline: req.body.deadline, 
//     })
//         .then((todo) => res.json(todo))
//         .catch((err) => res.json(err));
// });

// // Update task fields (including deadline)
// app.post("/updateTodoList/:id", (req, res) => {
//     const id = req.params.id;
//     const updateData = {
//         task: req.body.task,
//         status: req.body.status,
//         deadline: req.body.deadline, 
//     };
//     TodoModel.findByIdAndUpdate(id, updateData)
//         .then((todo) => res.json(todo))
//         .catch((err) => res.json(err));
// });

// // Delete task from the database
// app.delete("/deleteTodoList/:id", (req, res) => {
//     const id = req.params.id;
//     TodoModel.findByIdAndDelete({ _id: id })
//         .then((todo) => res.json(todo))
//         .catch((err) => res.json(err));
// });

// app.listen(3001, () => {
//     console.log('Server running on 3001');
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/todoList');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://joliehuang:todolist@cluster0.op5qo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

// Create a new task
app.post("/addTodoList", async (req, res) => {
    try {
        const newTodo = await TodoModel.create({
            task: req.body.task,
            status: req.body.status,
            deadline: req.body.deadline,
        });
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
});

// Get all tasks
app.get("/getTodoList", async (req, res) => {
    try {
        const todos = await TodoModel.find({});
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
});

// // Get a single task by ID
// app.get('/api/todos/:id', async (req, res) => {
//     try {
//         const todo = await TodoModel.findById(req.params.id);
//         if (todo) {
//             res.status(200).json(todo);
//         } else {
//             res.status(404).json({ message: 'Task not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching task', error });
//     }
// });

// Update a task by ID
app.put("/updateTodoList/:id", async (req, res) => {
    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(
            req.params.id,
            {
                task: req.body.task,
                status: req.body.status,
                deadline: req.body.deadline,
            },
            { new: true }
        );
        if (updatedTodo) {
            res.status(200).json(updatedTodo);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
});

// Delete a task by ID
app.delete("/deleteTodoList/:id", async (req, res) => {
    try {
        const deletedTodo = await TodoModel.findByIdAndDelete(req.params.id);
        if (deletedTodo) {
            res.status(200).json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
});

// Run the server
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
