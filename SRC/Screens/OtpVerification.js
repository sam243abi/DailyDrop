import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const OtpVerification = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);

  // Create an array of refs for each input field
  const inputRefs = useRef([]);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === '') {
      // Allow only numeric values or clear input
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus on next input if value is not empty and index is not the last
      if (value !== '' && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleResendOtp = () => {
    setTimer(60);
    alert('OTP has been resent!');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Enter OTP to Verify Your Identity</Text>
        <Text style={styles.title2}>Check for the OTP we sent and enter it here:</Text>

        {/* OTP Input Fields */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)} // Assign ref to input field
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleOtpChange(index, value)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
                  inputRefs.current[index - 1].focus(); // Focus on previous input if backspace is pressed
                }
              }}
            />
          ))}
        </View>

        {/* Timer */}
        <Text style={styles.timerText}>
          Wait for {timer > 0 ? `00:${timer.toString().padStart(2, '0')}` : '00:00'}
        </Text>

        {/* Resend OTP Button */}
        <TouchableOpacity 
          style={styles.resendButton}
          onPress={handleResendOtp}
          disabled={timer > 0}
        >
          <Text style={{ color: timer > 0 ? 'gray' : 'blue' }}>SEND AGAIN</Text>
        </TouchableOpacity>

        {/* Complete Profile Button */}
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => navigation.navigate('ProfileCompletion')}
        >
          <Text style={styles.loginButtonText}>Complete Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flexGrow: 1, // To make the content centered vertically
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  title2: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 5,
  },
  timerText: {
    fontSize: 16,
    marginBottom: 10,
  },
  resendButton: {
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: 'lightgreen',
    borderColor: 'darkgreen',
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  loginButtonText: {
    color: 'darkgreen',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OtpVerification;
