import React, { useState } from 'react';
import {View,Keyboard,Text,TouchableOpacity,StyleSheet,KeyboardAvoidingView,ScrollView,TextInput,TouchableWithoutFeedback,Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const ProfileCompletion = ({ navigation }) => {
  const [dob, setDob] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Handle Confirming the Date from Picker
  const handleConfirm = (date) => {
    const formattedDate = date.toLocaleDateString('en-GB');
    setDob(formattedDate);
    hideDatePicker();
  };

  // Function to handle manual input with auto-formatting
  const handleDobChange = (input) => {
    // Remove all non-digit characters
    const cleaned = ('' + input).replace(/\D/g, '');

    // Format as DD/MM/YYYY
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    }

    setDob(formatted);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      >
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrol}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>Complete Your Profile</Text>
            <Text style={styles.title2}>
              Fill in the details below so we can tailor our service just for you!
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="#B0B0B0"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="#B0B0B0"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#B0B0B0"
                keyboardType="email-address"
              />
              <Ionicons
                name="mail-outline"
                size={20}
                color="#B0B0B0"
                style={styles.icon}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="DOB"
                placeholderTextColor="#B0B0B0"
                value={dob}
                onChangeText={handleDobChange} // Handle manual input
                keyboardType="numeric"
                maxLength={10} // Limit input to DD/MM/YYYY format
              />
              <TouchableOpacity onPress={showDatePicker}>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color="#B0B0B0"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('DeliveryAddress')}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>

          {/* DateTime Picker Modal */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrol: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    top: -170,
  },
  title2: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    top: -160,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
    top: -150,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginLeft: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'lightgreen',
    borderColor: 'darkgreen',
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    top: -200,
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileCompletion;
