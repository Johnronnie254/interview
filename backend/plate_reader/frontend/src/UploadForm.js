// src/components/UploadForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { FaDownload } from 'react-icons/fa';
import './UploadForm.css';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [convertedText, setConvertedText] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!file) {
            setMessage("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('http://localhost:8000/api/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setConvertedText(response.data.text); // Adjust based on your Django response format
            setMessage('File uploaded and converted successfully!');
        } catch (error) {
            setMessage('Error uploading the file. Please try again.');
        }
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([convertedText], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "converted_text.txt";
        document.body.appendChild(element);
        element.click();
    };

    return (
        <div className="upload-form-container">
            <h2>Upload Car Number Plate</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" name="image" accept="image/*" onChange={handleFileChange} required />
                <button type="submit">Upload</button>
            </form>
            {message && <p className="message">{message}</p>}
            {convertedText && (
                <div>
                    <button onClick={handleDownload} className="download-btn">
                        <FaDownload /> Download Text
                    </button>
                </div>
            )}
        </div>
    );
};

export default UploadForm;
