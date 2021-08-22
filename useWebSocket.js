let socket;

export default function useWebSocket({url, onMessageReceived}) {
  if (!socket) {
    socket = new WebSocket(url);
    console.log('Attempting Connection...');

    socket.onopen = () => {
      console.log('Successfully Connected');
    };

    socket.onclose = event => {
      console.log('Socket Closed Connection: ', event);
      socket = null;
    };

    socket.onerror = error => {
      console.error('Socket Error: ', error);
    };
  }

  socket.onmessage = event => {
    onMessageReceived(event.data);
  };

  function send(data) {
    socket.send(data);
  }

  return send;
}
