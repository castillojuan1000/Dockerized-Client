import React, { useState } from 'react';

export const InputTodo = () => {
  const [description, setDescription] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //setting a const body to {description: descrittion } its an object
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })

      window.location = '/'
      setDescription('')



    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <>
      <h1 className='text-center mt-5'>PERN Todo List</h1>
      <form className='d-flex mt-5' onSubmit={handleSubmit}>
        <input type='text' className='form-control' value={description} onChange={e => setDescription(e.target.value)} />
        <button type='submit' className='btn btn-success' >Add </button>
      </form>
    </>
  )
}

