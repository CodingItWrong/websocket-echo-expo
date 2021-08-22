import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, Text, TextInput} from 'react-native';

const wsUrl = 'ws://localhost:3000';

let socket;

function setUpWebSocket(onMessageReceived) {
  if (!socket) {
    socket = new WebSocket(wsUrl);
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
}

export default function App() {
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');

  function handleSend() {
    socket.send(newMessageText);
    setNewMessageText('');
  }

  useEffect(() => {
    setUpWebSocket(newMessage => {
      setMessages([...messages, newMessage]);
    });
  }, [messages]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <TextInput
          value={newMessageText}
          onChangeText={setNewMessageText}
          onSubmitEditing={handleSend}
        />
        {messages.map((message, index) => (
          <Text key={index}>{message}</Text>
        ))}
      </SafeAreaView>
    </>
  );
}
