import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
    const [feedback, setFeedback] = useState('');
    const [sentiment, setSentiment] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        axios
            .post('http://127.0.0.1:5000/submit-feedback', { feedback, sentiment })
            .then((response) => {
                setMessage(response.data.message);
                setFeedback('');
                setSentiment('');
            })
            .catch((error) => {
                console.error('Error submitting feedback:', error);
                setMessage('An error occurred!');
            });
    };

    return (
        <div style={styles.appContainer}>
            <h1 style={styles.appTitle}>Feedback System</h1>

            <div style={styles.feedbackForm}>
                <h2 style={styles.formTitle}>Submit Feedback</h2>
                <input
                    type="text"
                    style={styles.inputField}
                    placeholder="Enter your feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />
                <input
                    type="text"
                    style={styles.inputField}
                    placeholder="Enter sentiment (positive/neutral/negative)"
                    value={sentiment}
                    onChange={(e) => setSentiment(e.target.value)}
                />
                <button style={styles.submitBtn} onClick={handleSubmit}>
                    Submit
                </button>
                <p>{message}</p>
            </div>
        </div>
    );
};

// Styles as JavaScript object
const styles = {
    appContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f4f9',
    },
    appTitle: {
        fontSize: '2.5em',
        color: '#333',
        marginBottom: '30px',
    },
    feedbackForm: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        // maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        margin: '0 auto',
    },
    formTitle: {
        fontSize: '1.8em',
        color: '#333',
        marginBottom: '20px',
        fontWeight: 'bold',
    },
    inputField: {
        width: '100%',
        padding: '12px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '1em',
        boxSizing: 'border-box',
    },
    submitBtn: {
        backgroundColor: '#4caf50',
        color: '#fff',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1.2em',
        cursor: 'pointer',
        width: '100%',
        transition: 'background-color 0.3s ease',
    },
};

export default FeedbackForm;
