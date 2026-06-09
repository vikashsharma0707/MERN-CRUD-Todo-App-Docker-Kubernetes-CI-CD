import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get('https://mern-crud-ci-cd-simpe-pipeline.onrender.com/api/todos');
    setTodos(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`https://mern-crud-ci-cd-simpe-pipeline.onrender.com/api/todos/${editingId}`, { title, description });
      setEditingId(null);
    } else {
      await axios.post('https://mern-crud-ci-cd-simpe-pipeline.onrender.com/api/todos', { title, description });
    }
    setTitle('');
    setDescription('');
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://mern-crud-ci-cd-simpe-pipeline.onrender.com/api/todos/${id}`);
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description || '');
    setEditingId(todo._id);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>MERN CRUD Todo App  ci cd pipline</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Todo button</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <strong>{todo.title}</strong> - {todo.description}
            <button onClick={() => handleEdit(todo)}>Edit</button>
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;