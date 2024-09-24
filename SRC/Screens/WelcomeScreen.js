import React from 'react';
import { View, Text, Button,Image, StyleSheet,TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation(); // Hook to get access to navigation

  const handleScreenPress = () => {
    navigation.navigate('Phone Number Verification'); // Navigate to PhoneVerification page
  };
  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
      <View style={styles.container}>
        <Image source={require('./Welcome Page.png')}
        style={styles.image} />
        <Text style={styles.title}>Welcome Back to </Text>
        <Text style={styles.Drop}>Daily Drop </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
    top:-130
  },
  image: {
    width: 300,
    height:300,
    resizeMode: 'contain',
    top: -150,
  },
  Drop: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'green',
    top:-130
  },
});

export default WelcomeScreen;
