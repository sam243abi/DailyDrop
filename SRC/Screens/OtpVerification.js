import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const OtpVerification = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
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
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleResendOtp = () => {
    setTimer(60); // Reset the timer
    alert('OTP has been resent!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP to Verify Your Identity</Text>
      <Text style={styles.title2}>Check for the OTP we sent and enter it here:</Text>
      
      {/* OTP input boxes */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleOtpChange(index, value)}
          />
        ))}
      </View>

      {/* Timer and Resend button */}
      <Text style={styles.timerText}>
        Wait for {timer > 0 ? `00:${timer.toString().padStart(2, '0')}` : '00:00'}
      </Text>
      <TouchableOpacity 
        style={styles.resendButton}
        onPress={handleResendOtp}
        disabled={timer > 0}
      >
        <Text style={{ color: timer > 0 ? 'gray' : 'blue' }}>SEND AGAIN</Text>
      </TouchableOpacity>

      {/* Login button */}
      <TouchableOpacity 
        style={styles.loginButton}
        onPress={() => navigation.navigate('ProfileCompletion')}
      >
        <Text style={styles.loginButtonText}>Complete Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title2: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
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
