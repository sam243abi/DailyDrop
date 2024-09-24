// src/screens/OtpVerification.js
import React from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

const OtpVerification = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP Verify Your Identity</Text>
      <Text style={styles.title2}>Check for the Otp We send and Enter the Otp Here </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        maxLength={6}
      />
      <Button 
      style={styles.bt}
        title="Complete Profile" 
        onPress={() => navigation.navigate('ProfileCompletion')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    top:-290
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    paddingLeft: 10,
    top:-240,
  },
  title2: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
    top:-270
  },
  bt: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    top:-270
  },
});

export default OtpVerification;
