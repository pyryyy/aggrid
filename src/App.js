import React, { useState, useRef } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function Todolist() {
  const [todo, setTodo] = useState({description: '', date: '', priority:''});
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const addTodo = (event) => {
    setTodos([...todos, todo]);
  }

  const columns = [
    { field: "description" , sortable: true , filter: true , floatingFilter: true },
    { field: "date", sortable: true , filter: true , floatingFilter: true },
    { field: "priority", sortable: true , filter: true , floatingFilter: true }
    ];

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todo, index) =>
        index != gridRef.current.getSelectedNodes()[0].id))
    }
    else {
      alert('Valitte ny perkele se rivi ekana, ei tää homma muute toimi!');
    }
  };

  return (
    <div>
      <input type="text" onChange={inputChanged} placeholder="Description" name="description" value={todo.description}/>
      <input type="date" onChange={inputChanged} placeholder="Date" name="date" value={todo.date}/>
      <input type="range" min="0" max="2" onChange={inputChanged} placeholder="Priority" name="priority" value={todo.priority}/>
      <label for="priority">Priority</label>
      <button onClick={addTodo}>Add</button>
      <button onClick={deleteTodo}>Delete</button>

      <div className="ag-theme-material"
            style={{height: '700px', width: '70%', margin: 'auto'}} >
        <AgGridReact
          ref={gridRef}
          onGridReady={ params => gridRef.current = params.api }
          rowSelection="single"
          animateRows="true"
          columnDefs={columns}
          rowData={todos}>
        </AgGridReact>
      </div>
        
    </div>
  );
};

export default Todolist;