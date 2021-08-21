import React, {useState} from 'react';
import {SafeAreaView, StatusBar, Text, TextInput} from 'react-native';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');

  function handleSend() {
    setMessages([...messages, newMessageText]);
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
