import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:4000/tasks';

export default function App() {
  const [tasks, setTasks] = useState(null);
  const [error, setError] = useState(null);
  const [activeCount, setActiveCount] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}?owner=ana`)
      .then((res) => res.json())
      .then(setTasks)
      .catch((err) => setError(err.message));

    fetch(`${API_URL}/active-count?owner=ana`)
      .then((res) => res.json())
      .then((data) => setActiveCount(data.count))
      .catch(() => {});
  }, []);

  const realActiveCount = tasks ? tasks.filter((t) => t.status === 'active').length : null;

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 480, margin: '2rem auto' }}>
      <h1>Ana's Tasks</h1>

      <div
        style={{
          padding: '0.75rem 1rem',
          marginBottom: '1rem',
          background: '#FFF4E5',
          borderRadius: 6,
        }}
      >
        <strong>Active tasks (dashboard widget):</strong> {activeCount ?? '...'}
        <br />
        <small>
          (Task list below shows {realActiveCount ?? '...'} rows with status "active" -
          if these two numbers don't match, that's the bug.)
        </small>
      </div>

      {error && <p>Couldn't load tasks - is the backend running?</p>}
      {!error && tasks === null && <p>Loading tasks...</p>}
      {!error && tasks && tasks.length === 0 && <p>No tasks yet.</p>}
      {!error && tasks && tasks.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map((t) => (
            <li
              key={t.id}
              style={{
                padding: '0.5rem 0.75rem',
                marginBottom: '0.5rem',
                background: '#F4F6F8',
                borderRadius: 6,
              }}
            >
              {t.title} <em>({t.status})</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
