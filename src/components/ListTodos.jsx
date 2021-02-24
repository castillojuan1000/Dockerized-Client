import React, { useEffect, useState } from 'react';
import { EditTodo } from './EditTodo'


export const ListTodos = () => {
  const [todos, setTodos] = useState([])

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData)

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getTodos();

  }, [])

  const deleteTodo = async (id) => {
    try {
      const todoToBeDeleted = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      })
      setTodos(todos.filter(todo => todo.todo_id !== id))

    } catch (error) {
      console.log(error.message)
    }
  }


  return <div className='text-center mt-5'>
    <table className="table table-dark table-striped">
      <thead>
        <tr>
          <th>Description</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          todos.map(todo =>
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>

                <EditTodo todo={todo} />
              </td>
              <td><button type="button" className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
            </tr>
          )
        }
      </tbody>
    </table>
  </div>
}

