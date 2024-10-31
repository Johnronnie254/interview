import React, { useState } from 'react';
import axios from 'axios';
import { FaDownload, FaTimes } from 'react-icons/fa'; // Importing the 'X' icon
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
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
            setConvertedText(response.data.text); 
            setMessage('File uploaded and converted successfully!');
            setFile(null); // Clear the file input after successful upload
        } catch (error) {
            setMessage('Error uploading the file. Please try again.');
        }
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const fileBlob = new Blob([convertedText], { type: 'text/plain' });
        element.href = URL.createObjectURL(fileBlob);
        element.download = "converted_text.txt";
        document.body.appendChild(element);
        element.click();
    };

    // Function to remove the selected file
    const handleRemoveFile = () => {
        setFile(null);
        setMessage(''); // Clear any previous messages
    };

    return (
        <Container className="upload-form-container">
            <Card className="main-card">
                <Card.Body>
                    <h2 className="header">Transform Your Car Number Plate to Text</h2>
                    <p className="subheader">
                        Our application helps in efficiently converting car number plates into text, 
                        providing a simple and effective solution for registration and management.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="file-input-container">
                            <input 
                                type="file" 
                                name="image" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                                required 
                            />
                            {file && (
                                <span className="remove-file" onClick={handleRemoveFile}>
                                    <FaTimes /> {/* X icon to remove file */}
                                </span>
                            )}
                        </div>
                        <Button type="submit" variant="primary" className="upload-btn">Upload</Button>
                    </form>
                    {message && <p className="message">{message}</p>}
                    {convertedText && (
                        <div className="download-container">
                            <Button onClick={handleDownload} className="download-btn">
                                <FaDownload /> Download Text
                            </Button>
                        </div>
                    )}
                    <Row className="mt-4">
                        <Col md={4}>
                            <Card className="feature-card hoverable">
                                <Card.Body>
                                    <Card.Title>Fast Conversion</Card.Title>
                                    <Card.Text>
                                        Quickly convert images of car number plates to text format for easy access and management.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="feature-card hoverable">
                                <Card.Body>
                                    <Card.Title>Accurate Results</Card.Title>
                                    <Card.Text>
                                        Our advanced algorithms ensure high accuracy in text recognition from car number plates.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="feature-card hoverable">
                                <Card.Body>
                                    <Card.Title>Easy to Use</Card.Title>
                                    <Card.Text>
                                        A user-friendly interface that makes it easy for anyone to upload images and get results.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UploadForm;
