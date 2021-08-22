import React, {useState} from 'react';
import {SafeAreaView, StatusBar, Text, TextInput} from 'react-native';
import useWebSocket from './useWebSocket';

const url = 'ws://localhost:3000';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');

  function onMessageReceived(newMessage) {
    setMessages([...messages, newMessage]);
  }
  const send = useWebSocket({url, onMessageReceived});

  function handleSend() {
    send(newMessageText);
    setNewMessageText('');
  }

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
