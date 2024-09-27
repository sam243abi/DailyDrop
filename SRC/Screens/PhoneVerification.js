import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';

const PhoneVerification = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.in}>
          <Text style={styles.title}>Verify Your Phone Number</Text>
          <Text style={styles.tit}>Let's Get Started</Text>
          <Image source={require('./PHV.jpg')} style={styles.image} />
          
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
          />
          
          <View style={styles.cbContainer}>
            <TouchableOpacity
              style={styles.cb}
              onPress={() => setIsChecked(!isChecked)}
            >
              <Text style={styles.cbtext}>
                {isChecked ? '☑️' : '⬜️'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.label}>I accept the Terms and Conditions</Text>
          </View>
          
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              if (isChecked) {
                navigation.navigate('OTP Verification');
              } else {
                alert('Please accept the Terms and Conditions.');
              }
            }}
          >
            <Text style={styles.ButtonText}>Verify OTP</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  in: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    top: -80,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    paddingLeft: 10,
    top: -160,
    borderRadius: 5,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    top: -140,
  },
  tit: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    top: -80,
    paddingRight: 10,
  },
  cbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    top: -160,
  },
  cb: {
    marginRight: 8,
  },
  cbtext: {
    fontSize: 24,
  },
  label: {
    fontSize: 16,
  },
  Button: {
    backgroundColor: 'lightgreen',
    borderColor: 'darkgreen',
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
    top:-90
  },
  ButtonText: {
    color: 'darkgreen',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PhoneVerification;
