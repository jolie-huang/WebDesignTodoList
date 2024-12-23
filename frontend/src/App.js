//App.js


import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Todo from "./components/Todo";


function App() {
  const headStyle = {
      textAlign: "center",
  };
  return (
      <div>
          <h1 style={headStyle}>Todo List</h1>
          <p style={{ textAlign: 'center' }}>
              <a href="/api/todos" target="_blank" rel="noopener noreferrer">
                  View REST API
              </a>
          </p>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Todo />} />
              </Routes>
          </BrowserRouter>
      </div>
  );
}


export default App;