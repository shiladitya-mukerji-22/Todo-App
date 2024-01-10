import { useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal'

export const AddTodo = ({ setShowTodo }) => {
    const [titleText, setTitleText] = useState("")
    const [descriptionText, setDescriptionText] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState(null)

    // Function to confirm saving the todo
    const confirmSaveTodo = () => {
        setModalContent(
            <div>
                <center>
                    <h3>Are you sure you want to save this todo?</h3>
                </center>
                <br />
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <button style={{
                        marginTop: '0px',
                        marginLeft: '120px'
                    }} onClick={handleSave}>Yes, Save</button>
                    <button style={{
                        marginRight: '120px'
                    }} onClick={() => setIsModalOpen(false)}>No</button>
                </div>
            </div>
        );
        setIsModalOpen(true);
    };

    // Function to save the todo after confirmation
    const handleSave = async () => {
        try {
            await axios.post('http://localhost:3000/createTodo', {
                title: titleText,
                description: descriptionText
            });
            setIsModalOpen(false);
            setShowTodo(false);
            window.location.reload()
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    const handleCancel = () => {
        setShowTodo(false);
    };

    return (
        <div className="card-wrapper">
            <textarea placeholder='Enter a Title' onChange={(e) => setTitleText(e.target.value)}></textarea>
            <hr></hr>
            <textarea placeholder='Enter a Description' onChange={(e) => setDescriptionText(e.target.value)}></textarea>
            <div className="button-section">
                <button onClick={confirmSaveTodo}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
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
    );
}
