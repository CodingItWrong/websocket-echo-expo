import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
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
        <View style={styles.container}>
          <TextInput
            value={newMessageText}
            onChangeText={setNewMessageText}
            onSubmitEditing={handleSend}
            placeholder="Enter message and press return"
            style={styles.textInput}
          />
          {messages.map((message, index) => (
            <Text key={index}>{message}</Text>
          ))}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    marginBottom: 10,
  },
});
