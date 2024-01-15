import React, { useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal'

export const Todo = ({ todo_id, todo_title, todo_description, todo_completed }) => {

    const [title, setTitle] = useState(todo_title);
    const [description, setDescription] = useState(todo_description);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState(null)


    const confirmUpdateTodo = () => {
        setModalContent(
            <div style={{
                backgroundColor: 'white', // Modal background color
                padding: '20px', // Padding around the content
                borderRadius: '10px', // Rounded corners
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // A subtle shadow
                textAlign: 'center', // Center align the text
            }}>
                <h3>Are you sure you want to update this todo?</h3>
                <br />
                <div style={{
                    display: 'flex',
                    justifyContent: 'center', // Center the buttons
                    gap: '20px', // Space between buttons
                }}>
                    <button
                        style={{
                            padding: '10px 20px', // Button padding
                            backgroundColor: '#4CAF50', // Green color for update
                            color: 'white', // Text color
                            border: 'none', // No border
                            borderRadius: '5px', // Rounded corners
                            cursor: 'pointer', // Pointer cursor on hover
                        }}
                        onClick={handleUpdate}
                    >
                        Yes, Update
                    </button>
                    <button
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#cccccc',
                            color: 'black',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                        onClick={() => setIsModalOpen(false)}
                    >
                        No
                    </button>
                </div>
            </div>
        );
        setIsModalOpen(true);
    }


    const confirmDeleteTodo = () => {
        setModalContent(
            <div style={{
                backgroundColor: 'white', // Modal background color
                padding: '20px', // Padding around the content
                borderRadius: '10px', // Rounded corners
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // A subtle shadow
                textAlign: 'center', // Center align the text
            }}>
                <h3>Are you sure you want to delete this todo?</h3>
                <br />
                <div style={{
                    display: 'flex',
                    justifyContent: 'center', // Center the buttons
                    gap: '20px', // Space between buttons
                }}>
                    <button
                        style={{
                            padding: '10px 20px', // Button padding
                            backgroundColor: '#ff6262', // Red color for delete
                            color: 'white', // Text color
                            border: 'none', // No border
                            borderRadius: '5px', // Rounded corners
                            cursor: 'pointer', // Pointer cursor on hover
                        }}
                        onClick={handleDelete}
                    >
                        Yes, Delete
                    </button>
                    <button
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#cccccc',
                            color: 'black',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                        onClick={() => setIsModalOpen(false)}
                    >
                        No
                    </button>
                </div>
            </div>
        );
        setIsModalOpen(true);
    }


    const handleUpdate = async () => {
        try {
            
            await axios.put('https://todoapp-kc5d.onrender.com/updateTodo', {
                title: title,
                description: description
            }, {
                params: { todo_id: todo_id }
            })
            setIsModalOpen(false)
            window.location.reload()
        } catch (error) {
            console.log('Error while updating', error)
        }
    }

    const handleDelete = async () => {
        try {
            
            await axios.delete('https://todoapp-kc5d.onrender.com/deleteTodo', {
                params: { todo_id: todo_id }
            });

            window.location.reload()
        } catch (error) {
            console.error('Error while deleting:', error)
        }
    }

    const handleCompleteTodo = async () => {
        try {
            await axios.put('https://todoapp-kc5d.onrender.com/updateTodo', {
                completed: true
            }, {
                params: { todo_id: todo_id }
            })
            alert('Todo completed');
            window.location.reload()
        } catch (error) {
            console.log('Error while completing todo:', error)
        }
    }


    return (
        <div className="card-wrapper">
            <textarea value={title} onChange={(e) => {
                setTitle(e.target.value);
            }}></textarea>
            <hr style={{
                marginBottom: '10px'
            }}></hr>
            <textarea value={description} onChange={(e) => {
                setDescription(e.target.value);
            }}></textarea>
            <div className="button-section">
                <button onClick={handleCompleteTodo}>{todo_completed? 'Completed': 'Complete'}</button>
                <button onClick={confirmUpdateTodo}>Update</button>
                <button onClick={confirmDeleteTodo}>Delete</button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={{
                    overlay: {
                        position: 'fixed', // Fixed position
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
                    },
                    content: {
                        position: 'absolute', // Absolute positioning
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)', // Center the modal
                        width: '500px',
                        height: 'auto', // Auto height based on content
                        borderRadius: '10px', // Match the content's border radius
                    }
                }}
            >
                {modalContent}
            </Modal>

        </div>
    )
}
