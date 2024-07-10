import React, { useState } from 'react';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ChatWindow from './components/Chat/ChatWindow';
import styles from './App.module.css';

function App() {
  const [token, setToken] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegisterSuccess = () => {
    setIsRegistering(false);
  };

  if (token) {
    return <ChatWindow token={token} />;
  }

  return (
    <div className={styles.app}>
      {isRegistering ? (
        <Register onRegisterSuccess={handleRegisterSuccess} />
      ) : (
        <div>
          <Login onLogin={setToken} />
          <p className={styles.registerPrompt}>
            Don't have an account?{' '}
            <button onClick={() => setIsRegistering(true)} className={styles.registerLink}>
              Register here
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;