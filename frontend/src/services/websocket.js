let ws = null;

export const connectWebSocket = (token, onMessage) => {
  ws = new WebSocket(`ws://localhost:3000?token=${token}`);
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed');
  };
};

export const sendMessage = (content) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ content }));
  } else {
    console.error('WebSocket is not connected');
  }
};