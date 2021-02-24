import React, { useState } from 'react'

export const EditTodo = ({ todo }) => {
  const { description, todo_id } = todo;
  const [newTodo, setNewTodo] = useState(description)


  const updateTodo = async (e) => {
    e.preventDefault();

    try {
      const body = { description: newTodo }
      const todoToBeUpdated = await fetch(`http://localhost:5000/todos/${todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })

      //this is to refresh the page after we update the todo
      window.location = '/'
    } catch (error) {
      console.log(error.message)
    }
  }


  return (
    <>

      <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo_id}`}>
        Edit
      </button>


      <div className="modal" id={`id${todo_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">


            <div className="modal-header">
              <h4 className="modal-title" style={{ color: 'black' }}>Edit Todo</h4>
              <button type="button" className="close" data-dismiss="modal" onClick={() => setNewTodo(description)}>&times;</button>
            </div>


            <div className="modal-body">
              <input className='form-control' type='text' value={newTodo} onChange={e => setNewTodo(e.target.value)} />
            </div>


            <div className="modal-footer">
              <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={(e) => updateTodo(e)}>Edit</button>
              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setNewTodo(description)}>Close</button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}