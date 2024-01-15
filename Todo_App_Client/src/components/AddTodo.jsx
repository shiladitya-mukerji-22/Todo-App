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
            <div style={{
                backgroundColor: 'white', // Modal background color
                padding: '20px', // Padding around the content
                borderRadius: '10px', // Rounded corners
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // A subtle shadow
                textAlign: 'center', // Center align the text
            }}>
                <h3>Are you sure you want to save this todo?</h3>
                <br />
                <div style={{
                    display: 'flex',
                    justifyContent: 'center', // Center the buttons
                    gap: '20px', // Space between buttons
                }}>
                    <button
                        style={{
                            padding: '10px 20px', // Button padding
                            backgroundColor: '#4CAF50', // Green color for save
                            color: 'white', // Text color
                            border: 'none', // No border
                            borderRadius: '5px', // Rounded corners
                            cursor: 'pointer', // Pointer cursor on hover
                        }}
                        onClick={handleSave}
                    >
                        Yes, Save
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
    };


    // Function to save the todo after confirmation
    const handleSave = async () => {
        try {
            
            await axios.post('https://todoapp-kc5d.onrender.com/createTodo', {
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
            <hr style={{
                marginBottom: '10px'
            }}></hr>
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
    );
}
