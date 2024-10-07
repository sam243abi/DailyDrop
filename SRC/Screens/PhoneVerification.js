import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Image, 
  TouchableOpacity, 
  Animated, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Platform 
} from 'react-native';

const PhoneVerification = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const keyboardHeight = useState(new Animated.Value(0))[0];

  const handlePhoneNumberChange = (text) => {
    const formattedText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(formattedText);
  };

  const handleVerifyOTP = () => {
    if (!isChecked) {
      alert('Please accept the Terms and Conditions.');
      return;
    }
    
    if (phoneNumber.length !== 10) {
      setErrorMessage('*Phone number must be exactly 10 digits');
    } else {
      setErrorMessage('');
      navigation.navigate('OTP Verification');
    }
  };

  useEffect(() => {
    // Using different keyboard events for iOS (keyboardWillShow) vs Android (keyboardDidShow)
    const keyboardShowEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const keyboardHideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const keyboardDidShowListener = Keyboard.addListener(keyboardShowEvent, (event) => {
      Animated.timing(keyboardHeight, {
        duration: Platform.OS === 'ios' ? 250 : 100, // Faster animation duration
        toValue: event.endCoordinates.height,
        useNativeDriver: false,
      }).start();
    });

    const keyboardDidHideListener = Keyboard.addListener(keyboardHideEvent, () => {
      Animated.timing(keyboardHeight, {
        duration: Platform.OS === 'ios' ? 250 : 100, // Faster animation duration
        toValue: 0,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // Translate the entire form based on keyboard visibility
  const translateY = keyboardHeight.interpolate({
    inputRange: [0, 300], // Adjust as per your layout
    outputRange: [0, -160], // Moves the form up when the keyboard opens
    extrapolate: 'clamp',
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Animated.View style={[styles.inner, { transform: [{ translateY }] }]}>
          <Text style={styles.title}>Verify Your Phone Number</Text>
          <Text style={styles.subtitle}>Let's Get Started</Text>
          <Image source={require('./images/PHV.jpg')} style={styles.image} />
          <View style={styles.phoneInputContainer}>
            <View style={styles.prefixContainer}>
              <Text style={styles.prefixText}>+91</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              maxLength={10}
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
            />
          </View>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
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
            onPress={handleVerifyOTP}
          >
            <Text style={styles.ButtonText}>Verify OTP</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    paddingHorizontal: 10,
  },
  prefixContainer: {
    justifyContent: 'center',
    paddingRight: 10,
  },
  prefixText: {
    fontSize: 16,
    color: 'gray',
  },
  input: {
    flex: 1,
    height: 40,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  cbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  },
  ButtonText: {
    color: 'darkgreen',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PhoneVerification;
