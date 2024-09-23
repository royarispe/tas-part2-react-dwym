import logo from './logo.svg';
import './App.css';
import react, {useEffect, useState} from 'react';

//TA5
const HideandSeek = () => {
  const [hide, setHide] = useState(false);

  return (
    <div>
      <h1>-TA5-</h1>
      <p>{hide ? 'Leones' : ''}</p>
      <button onClick={() => setHide(!hide)}>¿Que hay atrás de la puerta?</button>
    </div>
  );
}

//TA6-7-8

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTask, setEditingTask] = useState('');

  //TA6
  const addTask = () => {
    setTasks([...tasks, task]);
    setTask('');
  }

  //TA7
  const deleteTask = (index) => {
    setTasks(tasks.filter((task, i) => i !== index));
  }

  //TA8
  const editTask = (index) => {
    setEditingIndex(index);
    setEditingTask(tasks[index]);
  }

  const saveTask = (index) => {
    const updatedTasks = tasks.map((t, i) => (i === index ? editingTask : t));
    setTasks(updatedTasks);
    setEditingIndex(null);  // Termina la edición
    setEditingTask('');
  }


  return (
    <div>
      <h1>-TA6-</h1>
      <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Nueva Tarea" />
      <button onClick={addTask}>Agregar tarea</button>

      <ul>
        {tasks.map((t, i) => (
          <li key={i}>
            {editingIndex === i ? (
              <span>
                <input 
                  value={editingTask} 
                  onChange={(e) => setEditingTask(e.target.value)} 
                />
                <button onClick={() => saveTask(i)} style={{ marginLeft: '10px' }}>Guardar</button>
              </span>
            ) : (
              <span>
                {t}
                <button onClick={() => deleteTask(i)} style={{ marginLeft: '10px' }}>X</button>
                <button onClick={() => editTask(i)} style={{ marginLeft: '10px' }}>Editar</button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

//TA9
const useCounter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return { count, increment, decrement, reset };
}

const Counter = () => {
  const { count, increment, decrement, reset } = useCounter();

  return (
    <div>
      <h1>-TA9-</h1>
      <p>{count}</p>
      <button onClick={increment}>Incrementar</button>
      <button onClick={decrement}>Decrementar</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}


//TA10
const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchUsers();
  }, []); // El array vacío asegura que useEffect se ejecute solo una vez

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>Nombre de usuario:</strong> {user.username} <br />
            <strong>Email:</strong> {user.email} <br/><br/>
          </li>
        ))}
      </ul>
    </div>
  );
}

//TA11
const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Función para convertir segundos en formato hora:minuto:segundo
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    const formatNumber = (num) => (num < 10 ? `0${num}` : num);

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(secs)}`;
  };

  return (
    <div>
      <h1>Temporizador</h1>
      <p>{formatTime(seconds)}</p>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <div className="App-style">
        <div id="ta5" className='tas'>
          <HideandSeek />
        </div>
        <div id="ta6" className='tas'>
          <TaskList />
        </div>
        <div id="ta9" className='tas'>
          <Counter />
        </div>
        <div id="ta10" className='tas'>
          <UserList />
        </div>
        <div id="ta11" className='tas'>
          <Timer />
        </div>
      </div>
    </div>
  );
}

export default App;
