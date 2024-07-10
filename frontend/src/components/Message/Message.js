import React from 'react';
import styles from './Message.module.css';

const Message = ({ message }) => {
  return (
    <div className={styles.message}>
      <span className={styles.sender}>{message.sender}: </span>
      <span className={styles.content}>{message.content}</span>
      <span className={styles.timestamp}>
        {new Date(message.timestamp).toLocaleTimeString()}
      </span>
    </div>
  );
};

export default Message;