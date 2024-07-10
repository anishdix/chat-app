import React, { useState } from 'react';
import styles from './MessageInput.module.css';


//form input to send message
const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Send</button>
    </form>
  );
};

export default MessageInput;