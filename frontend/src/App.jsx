// import { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//   const [todos, setTodos] = useState([]);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const fetchTodos = async () => {
//     const res = await axios.get('http://localhost:5000/api/todos');
//     setTodos(res.data);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editingId) {
//       await axios.put(`http://localhost:5000/api/todos/${editingId}`, { title, description });
//       setEditingId(null);
//     } else {
//       await axios.post('http://localhost:5000/api/todos', { title, description });
//     }
//     setTitle('');
//     setDescription('');
//     fetchTodos();
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/api/todos/${id}`);
//     fetchTodos();
//   };

//   const handleEdit = (todo) => {
//     setTitle(todo.title);
//     setDescription(todo.description || '');
//     setEditingId(todo._id);
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>MERN CRUD Todo App  ci cd pipline</h1>
      
//       <form onSubmit={handleSubmit}>
//         <input
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Title"
//           required
//         />
//         <input
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Description"
//         />
//         <button type="submit">{editingId ? 'Update' : 'Add'} Todo button</button>
//       </form>

//       <ul>
//         {todos.map(todo => (
//           <li key={todo._id}>
//             <strong>{todo.title}</strong> - {todo.description}
//             <button onClick={() => handleEdit(todo)}>Edit</button>
//             <button onClick={() => handleDelete(todo._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;



import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get("https://mern-crud-todo-app-docker-kubernetes-ci.onrender.com/api/todos");
    setTodos(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(
        `https://mern-crud-todo-app-docker-kubernetes-ci.onrender.com/api/todos/${editingId}`,
        { title, description }
      );
      setEditingId(null);
    } else {
      await axios.post(
        "https://mern-crud-todo-app-docker-kubernetes-ci.onrender.com/api/todos",
        { title, description }
      );
    }

    setTitle("");
    setDescription("");
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://mern-crud-todo-app-docker-kubernetes-ci.onrender.com/api/todos/${id}`);
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description || "");
    setEditingId(todo._id);
  };

  return (
    <div className="container">
      <div className="card">
     <h1 className="heading">
  🚀 Enterprise MERN CRUD Todo App | Docker, Kubernetes & CI/CD  devops
</h1>

        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            placeholder="Enter Todo Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="submit-btn" type="submit">
            {editingId ? "Update Todo" : "Add Todo"}
          </button>
        </form>

        {todos.length === 0 ? (
          <p className="empty">No Todos Found</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo._id} className="todo-item">
                <div className="todo-content">
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                </div>

                <div className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(todo)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(todo._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;