"use client"
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';


type Event = any

export default function Lessons () {
  const [selectedOption, setSelectedOption] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [mediaUrls, setMediaUrls] = useState([]);

  const handleOptionChange = (event:Event) => {
    setSelectedOption(event.target.value);
  };

  const handleTextAreaChange = (event:Event) => {
    setTextAreaValue(event.target.value);
  };

  const handleMediaUpload = (event:Event) => {
    // Handle media upload here (e.g., upload to server, store URL, etc.)
    const file = event.target.files[0];
    // For simplicity, just set the URL directly (this won't work in a real scenario)
    setMediaUrls([...mediaUrls, URL.createObjectURL(file)]);
  };

  const handleSubmit = (event:Event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="">Select Option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        <textarea
          value={textAreaValue}
          onChange={handleTextAreaChange}
          placeholder="Enter markdown text..."
          rows={5}
          cols={50}
        />
        {mediaUrls.map((url) => (
          <img key={url} src={url} alt="Uploaded Media" style={{ maxWidth: '100px', maxHeight: '100px' }} />
        ))}
        <input type="file" accept="image/*" onChange={handleMediaUpload} />
        <button type="submit">Submit</button>
      </form>
      <ReactMarkdown>{textAreaValue}</ReactMarkdown>
    </div>
  );
};

