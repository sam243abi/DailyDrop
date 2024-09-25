import React from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

const ProfileCompletion = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Your Profile</Text>
      
      {/* Input fields for user details */}
      <TextInput 
        style={styles.input} 
        placeholder="First Name" 
        
      />
      <TextInput 
        style={styles.input} 
        placeholder="Last Name" 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        keyboardType="email-address" 
      />
      
      {/* Button to navigate to Delivery Address screen */}
      <Button
        title="Enter Delivery Address"
        onPress={() => navigation.navigate('DeliveryAddress')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',  // Corrected from 'alignitems' to 'alignItems'
  },
  title: {
    fontSize: 24,         // Corrected from 'fontsize' to 'fontSize'
    fontWeight: 'bold',   // Corrected from 'fontweight' to 'fontWeight'
    marginBottom: 20,
  },
  input: {
    height: 40, 
    borderColor: 'gray',  // Corrected from 'bordercolor' to 'borderColor'
    borderWidth: 1, 
    marginBottom: 20, 
    width: '80%', 
    paddingLeft: 10,
  },
});

export default ProfileCompletion;
