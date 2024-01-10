import React,{ useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal'

export const Todo = ({ todo_id, todo_title, todo_description }) => {

    const [title, setTitle] = useState(todo_title);
    const [description, setDescription] = useState(todo_description);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    

    const confirmUpdateTodo = () => {
        console.log('entered confirmUpdateTodo')
        setModalContent(
            <div>
                <center>
                    <h3>Are you sure you want to update this todo?</h3>
                </center>
                <br />
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <button style={{
                        marginLeft: '120px'
                    }} onClick={handleUpdate}>Yes, Update</button>
                    <button style={{
                        marginRight: '120px'
                    }} onClick={() => setIsModalOpen(false)}>No</button>
                </div>
            </div>
        );
        setIsModalOpen(true);
    }

    const handleUpdate = async () => {
        console.log('entered handleUpdate')
        try {
            await axios.put('http://localhost:3000/updateTodo', {
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
            console.log('entered delete')
            await axios.delete('http://localhost:3000/deleteTodo', {
                params: { todo_id: todo_id }
            });
            alert('todo Deleted')
            window.location.reload()
        } catch (error) {
            console.error('Error while deleting:', error)
        }
    }


    return (
        <div className="card-wrapper">
            <textarea value={title} onChange={(e) => {
                setTitle(e.target.value);
            }}></textarea>
            <hr></hr>
            <textarea value={description} onChange={(e) => {
                setDescription(e.target.value);
            }}></textarea>
            <div className="button-section">
                <button onClick={confirmUpdateTodo}>Update</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={{
                    overlay: {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    },
                    content: {
                        position: 'static', // Override default absolute positioning
                        width: '500px',
                        height: '130px'
                    }
                }}>
                {modalContent}
            </Modal>
        </div>
    )
}
