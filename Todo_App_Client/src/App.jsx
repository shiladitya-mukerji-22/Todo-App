import { useEffect, useState } from 'react'
import { Todo } from './components/Todo'
import axios from 'axios'
import { AddTodo } from './components/AddTodo'

function App() {
  const [todos, setTodos] = useState(null)
  const [showTodo, setShowTodo] = useState(false)

  const getTodos = async () => {
    const response = await axios.get('http://localhost:3000/getTodos')
    console.log(response.data)
    setTodos(response.data)
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <>
      <div id="app-header-div">
        <h1 style={{
          color: 'rgb(248, 154, 248)',
          fontSize: '60px',
          fontWeight: '700'
        }}>TODO APP</h1>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'right',
        marginRight: '110px'
      }}>
        <button style={{
          padding: '8px 15px',
          borderRadius: '30px',
          border: 'none',
          fontSize: '20px',
          fontWeight: '500'
        }} onClick={() => {
          setShowTodo(true)
        }}>Add Todo</button>
      </div>
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {
          todos && (
            <div style={{
              width: '90%',
              padding: '15px 10px',
              display: 'flex',
              flexWrap: 'wrap'
            }}>
              {todos.map((todo) => (
                <div key={todo.todo_id} style={{
                  width: 'calc(50% - 10px)',
                  margin: '5px'
                }}>
                  <Todo
                    todo_id={todo.todo_id}
                    todo_title={todo.title}
                    todo_description={todo.description}
                  />
                </div>
              ))}
            </div>
          )
        }
        {
          showTodo && (
            <div style={{
              width: '70%',
              padding: '15px 50px',
              display: 'flex',
              justifyContent: 'right'
            }}>
              <div style={{
                width: '100%', // Full width for the AddTodo component
                margin: '5px'
              }}>
                <AddTodo setShowTodo={setShowTodo} />
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}

export default App
