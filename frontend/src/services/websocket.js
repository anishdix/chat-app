let ws = null;

//connection to websocket
export const connectWebSocket = (token, onMessage) => {
  ws = new WebSocket(`wss://chat-app-n9h6.onrender.com/?token=${token}`);
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed');
  };
};

//send message to websocket
export const sendMessage = (content) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ content }));
  } else {
    console.error('WebSocket is not connected');
  }
};