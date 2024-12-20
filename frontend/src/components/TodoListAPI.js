import React, { useEffect, useState } from "react";
import axios from "axios";

function TodoListAPI() {
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        // Fetch the data from the API
        axios.get("http://127.0.0.1:3001/api/todos")
            .then((response) => {
                setTodoList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching the todo list:", error);
            });
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center">Todo List API Data</h2>
            <pre style={{ backgroundColor: "#f5f5f5", padding: "10px", borderRadius: "5px" }}>
                {JSON.stringify(todoList, null, 2)}
            </pre>
        </div>
    );
}

export default TodoListAPI;
