import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getMessages } from '../../services/api';
import { connectWebSocket, sendMessage } from '../../services/websocket';
import Message from '../Message/Message';
import MessageInput from '../Message/MessageInput';
import styles from './ChatWindow.module.css';

//main chat window compinent after login in
const ChatWindow = ({ token }) => {
  const [messages, setMessages] = useState([]);
  const messageListRef = useRef(null);

  const handleNewMessage = useCallback((message) => {
    setMessages((prevMessages) => {
      // Check if the message already exists in the list
      const messageExists = prevMessages.some(m => m._id === message._id);
      if (messageExists) {
        return prevMessages; 
      }
      // Add the new message and sort by timestamp
      return [...prevMessages, message].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    });
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await getMessages(token);
        // Sort message ,older ones come first
        setMessages(fetchedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    connectWebSocket(token, (data) => {
      if (data.type === 'message') {
        handleNewMessage(data.data);
      }
    });
  }, [token, handleNewMessage]);


  // basic scroll if theres more messages
  useEffect(() => {
    
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (content) => {
    sendMessage(content);
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.messageList} ref={messageListRef}>
        {messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;