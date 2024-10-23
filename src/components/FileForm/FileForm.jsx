import { IconFile, IconFileUpload, IconSend } from '@tabler/icons-react';
import { useState } from 'react';
import './FileForm.css';

/**
 * * File form component
 * @returns Component file form
 */
function FileForm() {
    // * Hook
    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState(null);

    // * Functions
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        console.log(file);
    };

    const handleUpload = async () => {
        const allowedTypes = ['audio/wav'];
        if (file) {
            if (!allowedTypes.includes(file.type)) {
                alert('Please upload a valid audio file wav.');
                return;
            }
            setMessages([...messages, { text: `Uploaded file: ${file.name}`, sender: "user" }]);

            // Call the query function
            try {
                const result = await query(file);
                setMessages(prevMessages => [...prevMessages, { text: `Transcription: ${result.text}`, sender: "system" }]);
            } catch (error) {
                console.error("Error during transcription:", error);
                alert('An error occurred while processing the file.');
            } finally {
                setFile(null);
            }
        } else {
            alert('Please choose a file to upload.');
        }
    };

    // Query function to send the file to the API
    const query = async (file) => {
        const data = await file.arrayBuffer(); // Read the file as an ArrayBuffer
        const response = await fetch(
            "https://api-inference.huggingface.co/models/openai/whisper-large-v3",
            {
                headers: {
                    Authorization: "Bearer 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",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: data,
            }
        );
        const result = await response.json();
        return result;
    };

    return (
        <div className="flex flex-col items-center justify-center flex-grow w-full max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Speech to text Malagasy</h1>
            <div className="bg-gray-800 w-full h-96 rounded-lg p-4 overflow-y-auto mb-8">
                {messages.map((message, index) => (
                    <div key={index} className={`mb-4 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                        <div className={`inline-block p-2 rounded-lg ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}>
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex gap-4 items-center w-full max-w-lg">
                <label className="flex-grow bg-white text-black py-2 px-4 rounded-full cursor-pointer flex items-center space-x-2">
                    <i className="ti ti-upload"></i>
                    <span>{file ? file.name : "Choose File"}</span>
                    <input type="file" className="hidden" onChange={handleFileChange} />
                </label>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-full" onClick={handleUpload}>Upload</button>
            </div>
        </div>
    );
}

export default FileForm;