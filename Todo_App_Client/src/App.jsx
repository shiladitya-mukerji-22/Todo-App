import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AddTodo } from './components/AddTodo';
import { Todo } from './components/Todo';

function App() {
    const [todos, setTodos] = useState(null);
    const [showTodo, setShowTodo] = useState(false);

    const getTodos = async () => {
        const response = await axios.get('https://todoapp-kc5d.onrender.com/getTodos');
        console.log(response.data);
        setTodos(response.data);
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <>
            <div id="app-header-div">
                <h1>TODO APP</h1>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '90%', 
                margin: '10px auto', 
                padding: '0 10px' 
            }}>
                <button className="add-todo-button" onClick={() => setShowTodo(true)}>Add Todo</button>
            </div>
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {todos && (
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
                                    todo_completed={todo.completed}
                                />
                            </div>
                        ))}
                    </div>
                )}
                {showTodo && (
                    <div style={{
                        width: '70%',
                        padding: '15px 50px',
                        display: 'flex',
                        justifyContent: 'right'
                    }}>
                        <div style={{
                            width: '100%',
                            margin: '5px'
                        }}>
                            <AddTodo setShowTodo={setShowTodo} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
