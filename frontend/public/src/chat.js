import React, { useState } from 'react';
import axios from 'axios';

function Chat() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/chat', { question });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      setAnswer('Error connecting to backend');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Ask your AI Assistant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type a question..."
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Send</button>
      </form>
      {answer && <p style={{ marginTop: '20px' }}><strong>Answer:</strong> {answer}</p>}
    </div>
  );
}

export default Chat;
