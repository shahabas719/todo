

import './App.css'
import { useState, useEffect } from 'react'

function App() {

  const [toDos, setToDos] = useState(() => {

    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];

  });


  const [toDo, setToDo] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(toDos));
  }, [toDos]);




  const deleteTodo = (id) => {
    setToDos(toDos.filter((todo) => todo.id !== id));
  };




  return (  
    <div className="app">
      <div className="mainHeading">
        <h1> « T⬤D⬤ List »</h1>      
      </div>
      <div className="subHeading">
        <br />
        <h2>Things▸To Get Done..❒⏹❒⏹</h2>
      </div>
      <div className="input">
        <input value={toDo} onChange={(e) => setToDo(e.target.value)} type="text" placeholder="🖊️  Add item..." />
        <i onClick={() => { if (toDo.trim()) { setToDos([...toDos, { id: Date.now(), text: toDo, status: false }]); setToDo('') } }} style={{ color: 'black' }} className="fa-solid fa-square-plus"></i>
      </div>
      <div className="todos">


        {
          toDos.map((obj) => {

            return (
              <div className="todo" key={obj.id}>
                <div className="left">
                  <input onChange={(e) => {
                    setToDos(toDos.map(obj2 =>
                      obj2.id === obj.id

                        ? {

                          ...obj2, status: e.target.checked
                        }
                        : obj2
                    ));

                  }}
                    checked={obj.status} type="checkbox" />
                  <p className={obj.status ? "completed" : ""}>{obj.text}</p>
                </div>

                <div className="right">
                  <i onClick={() => deleteTodo(obj.id)}

                    style={{ cursor: "pointer", color: "black" }} className="fa-solid fa-circle-xmark"></i>
                </div>
              </div>
              )
          })
          
        }

      </div>
      
    </div>
    


  )

  
}

export default App;


