import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

type tareas = React.FormEvent<HTMLFormElement>;

interface Ititle {
  nameTitle: string;
  done: boolean;
}

interface Itask {
  nameTask: string;
  done: boolean;
}

interface IDate {
  nameDate: string;
  done: boolean;
}

function App(): JSX.Element {
  const [nuevaTitulo, setNuevaTitulo] = useState<string>('');
  const [nuevaTarea, setNuevaTarea] = useState<string>('');
  const [nuevaFecha, setNuevafecha] = useState<string>('');
  const [title, setTitle] = useState<Ititle[]>([]);
  const [task, setTask] = useState<Itask[]>([]);
  const [date, setDate] = useState<IDate[]>([]);

  const tareaRealizada = (evento: tareas) => {
    evento.preventDefault();
    addTitle(nuevaTitulo);
    addTarea(nuevaTarea);
    addfecha(nuevaFecha);
    // Limpiar los inputs después de guardar
    setNuevaTitulo('');
    setNuevaTarea('');
    setNuevafecha('');
  };

  const addTitle = (nameTitle: string) => {
    const newTitle = [...title, { nameTitle, done: false }];
    setTitle(newTitle);
  };

  const addTarea = (nameTask: string) => {
    const newTask = [...task, { nameTask, done: false }];
    setTask(newTask);
  };

  const addfecha = (nameDate: string) => {
    const newDate = [...date, { nameDate, done: false }];
    setDate(newDate);
  };

  const eliminarTarea = (index: number) => {
    const newTitle = [...title];
    newTitle.splice(index, 1);
    setTitle(newTitle);

    const newTask = [...task];
    newTask.splice(index, 1);
    setTask(newTask);

    const newDate = [...date];
    newDate.splice(index, 1);
    setDate(newDate);
  };

  useEffect(() => {
    mostrarDatos();
  }, [title, task, date]);

  const mostrarDatos = () => {
    console.log("Title:", title);
    console.log("Task:", task);
    console.log("Date:", date);
  };

  return (
    <Fragment>
      <div className="container">
        <h1>Registro de actividades</h1>
        <form onSubmit={tareaRealizada}>
          <div className="form-group">
            <label>Ingresa la tarea</label>
            <input type="text" className="form-control" value={nuevaTitulo} onChange={evento => setNuevaTitulo(evento.target.value)} />
          </div>
          <div className="form-group">
            <label>Descripción de la tarea</label>
            <input type="text" className="form-control" value={nuevaTarea} onChange={evento => setNuevaTarea(evento.target.value)} />
          </div>
          <div className="form-group">
            <label>Fecha</label>
            <input type="text" className="form-control" value={nuevaFecha} onChange={evento => setNuevafecha(evento.target.value)} />
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">Guardar</button>
            {title.map((item, index) => (
              <button key={index} className="btn btn-danger" onClick={() => eliminarTarea(index)}>Eliminar</button>
            ))}
          </div>
        </form>
        <div className="actividades">
          <h2>Actividades registradas:</h2>
          <ul>
            {title.map((item, index) => (
              <li key={index}>
                {item.nameTitle}
              </li>
            ))}
          </ul>
          <ul>
            {task.map((item, index) => (
              <li key={index}>{item.nameTask}</li>
            ))}
          </ul>
          <ul>
            {date.map((item, index) => (
              <li key={index}>{item.nameDate}</li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
