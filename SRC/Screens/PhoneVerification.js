import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';

const PhoneVerification = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false); // State for checkbox

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Phone Number</Text>
      <Text style={styles.tit}>Let's Get Started</Text>
      <Image source={require('./PHV.jpg')} style={styles.image} />
      
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
      />
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setIsChecked(!isChecked)}
        >
          <Text style={styles.checkboxText}>
            {isChecked ? '☑️' : '⬜️'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.label}>I accept the Terms and Conditions</Text>
      </View>
      <TouchableOpacity
        style={styles.verifyButton}
        onPress={() => {
          if (isChecked) {
            navigation.navigate('OTP Verification');
          } else {
            alert('Please accept the Terms and Conditions.');
          }
        }}
      >
        <Text style={styles.verifyButtonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    top: -130,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    paddingLeft: 10,
    top: -190,
    borderRadius:5
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    top: -170,
  },
  tit: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    top: -140,
    paddingRight: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    top: -180,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxText: {
    fontSize: 24,
  },
  label: {
    fontSize: 16,
  },
  verifyButton: {
    backgroundColor: 'lightgreen', // Light green background
    borderColor: 'darkgreen',      // Dark green border
    borderWidth: 2,                // Border thickness
    paddingVertical: 15,           // Vertical padding
    paddingHorizontal: 40,         // Horizontal padding
    borderRadius: 10,              // Rounded corners
    marginTop: 20,
  },
  verifyButtonText: {
    color: 'darkgreen',            // Dark green text color
    fontWeight: 'bold',            // Bold text
    fontSize: 16,                  // Text size
    textAlign: 'center',
  },
});

export default PhoneVerification;
