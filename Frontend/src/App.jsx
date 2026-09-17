import { useState, useEffect } from 'react';
import TaskItem from './TaskItem.jsx';
import './index.css';

export default function App() {
  // In vanilla JS, lista traia direct in DOM (elementele <li> erau "sursa de adevar").
  // In React, lista traieste in state - JSX-ul e doar o "oglinda" a acestui state.
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');

  // Echivalentul loadTasks() - se ruleaza o singura data, la montarea componentei
  // (in vanilla JS era apelat manual, la finalul scriptului)
useEffect(() => {
    fetch('/api/tasks')
      .then(res => {
        if (!res.ok) throw new Error(`Server a răspuns cu status ${res.status}`);
        return res.json();
      })
      .then(data => setTasks(data))
      .catch(err => console.error('Eroare la încărcarea task-urilor:', err));
  }, []);

  // Echivalentul addTask() - trimite catre server, apoi actualizeaza state-ul local
async function handleAddTask() {

    const text = newTaskText.trim();

    if (text === '') return;

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      if (res.ok) {
        const task = await res.json();
        setTasks(prev => [...prev, task]);
        setNewTaskText('');
      } else {
        const err = await res.json();
        console.error('Eroare server:', err);
      }
    } catch (err) {
      console.error('Eroare rețea/fetch:', err);
    }
  }
  // Echivalentul PUT din edit - actualizeaza task-ul pe server, apoi in state
  async function handleUpdateTask(id, newText) {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newText })
    });

    if (res.ok) {
      setTasks(prev =>
        prev.map(t => (t.id === id ? { ...t, text: newText } : t))
      );
    }
  }

  // Echivalentul DELETE - sterge de pe server, apoi filtreaza din state
  async function handleDeleteTask(id) {
  
    const confirmed = window.confirm('Sigur vrei să ștergi acest task?');
    if (!confirmed) return;
    
    const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  }

  return (
    <div className="container">
      <h1>My ToDo Tasks</h1>

      <div className="add-task">
        <input
          type="text"
          value={newTaskText}
          onChange={e => setNewTaskText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAddTask()}
          placeholder="Add a NEW Task"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </ul>
    </div>
  );
}
