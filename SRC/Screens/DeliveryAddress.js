import React from 'react';
import { View, Text, Keyboard, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DeliveryAddress = () => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Where Should We Deliver?</Text>
          <Text style={styles.title2}>Enter your Address so we can bring everything right to your doorstep</Text>

          <TextInput style={styles.input} placeholder="Apartment" />
          <TextInput style={styles.input} placeholder="Street" />
          <TextInput style={styles.input} placeholder="City" />
          <TextInput style={styles.input} placeholder="Postal Code" />
          <TextInput style={styles.input} placeholder="Landmark" />
          
          <Image source={require('./loc.jpg')} style={styles.image} />
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Learning')}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: {
    width: '90%',
    alignItems: 'center',
    marginTop: 40,
  },
  image: {
    width: 390,
    height: 300,
    resizeMode: 'contain',
    marginVertical: 20,
    top:-420,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    top:-20,
  },
  title2: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    top:-20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
    paddingLeft: 10,
    borderRadius: 5,
    zIndex: 1,
    top:150,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightgreen',
    borderColor: 'darkgreen',
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20, 
    top:-200,
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeliveryAddress;
