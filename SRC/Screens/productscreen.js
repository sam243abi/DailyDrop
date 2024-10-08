import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  FlatList,
  Modal,
  ScrollView
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const OtpVerification = ({ navigation }) => {
  const [count, setCount] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState('Select Delivery Slot');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeliveryDateModal, setShowDeliveryDateModal] = useState(false); // Modal visibility state
  const [selectedDays, setSelectedDays] = useState([]); // To track selected days

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Increase and decrease count
  const increaseCount = () => setCount(count + 1);
  const decreaseCount = () => setCount(count > 1 ? count - 1 : 1);

  // Handle date picker
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  // Toggle Dropdown
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Handle slot selection
  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
    setShowDropdown(false); // Close dropdown after selection
  };

  // Toggle delivery date modal
  const toggleDeliveryDateModal = () => {
    setShowDeliveryDateModal(!showDeliveryDateModal);
  };

  // Handle checkbox toggle
  const toggleDaySelection = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
    );
  };

  // Handle delivery date submit
  const submitDeliveryDates = () => {
    setShowDeliveryDateModal(false);
    console.log("Selected Days:", selectedDays);
  };

  // Delivery Slot Options
  const deliverySlots = ['Daily', 'Alternate Day', 'Every 3 Days', 'Weekly', 'Monthly'];

  return (
    <View style={styles.container}>
      {/* Product Section */}
      <View style={styles.productContainer}>
        <Image
          source={require('./images/waterCan.jpg')}
          style={styles.canImage}
        />
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={decreaseCount}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{count}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={increaseCount}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Select Delivery Slot */}
      <View style={styles.deliverySlotContainer}>
        <TouchableOpacity onPress={toggleDropdown} style={styles.deliverySlotButton}>
          <Text style={styles.deliverySlotText}>{selectedSlot}</Text>
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdownContainer}>
            {deliverySlots.map((slot) => (
              <TouchableOpacity
                key={slot}
                style={styles.dropdownItem}
                onPress={() => handleSlotSelection(slot)}
              >
                <Text style={styles.dropdownText}>{slot}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Subscription Start Date */}
      <View style={styles.datePickerContainer}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
          <Text style={styles.dateText}>
            {date.toDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
      </View>

      {/* Select Delivery Date Button */}
      <TouchableOpacity style={styles.deliveryDateButton} onPress={toggleDeliveryDateModal}>
        <Text style={styles.deliveryDateButtonText}>Select Delivery Date</Text>
      </TouchableOpacity>

      {/* Delivery Address */}
      <View style={styles.addressContainer}>
        <Text style={styles.addressText}>BX0X, Radiance Shine, OMR, Kazhipattur</Text>
      </View>

      {/* Deposit Information */}
      <View style={styles.depositContainer}>
        <Text style={styles.depositText}>
          Can Deposit of ₹150 per quantity will be collected during the first delivery.
        </Text>
      </View>

      {/* Start Subscription Button */}
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>Start Subscription</Text>
      </TouchableOpacity>

      {/* Delivery Date Modal */}
      <Modal
        visible={showDeliveryDateModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Delivery Days</Text>
            {daysOfWeek.map((day) => (
              <TouchableOpacity
                key={day}
                style={styles.checkboxContainer}
                onPress={() => toggleDaySelection(day)}
              >
                <Text style={styles.checkboxLabel}>{day}</Text>
                <Text style={styles.checkboxStatus}>
                  {selectedDays.includes(day) ? '✔' : ''}
                </Text>
              </TouchableOpacity>
            ))}

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={submitDeliveryDates}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  canImage: {
    width: 80,
    height: 80,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  deliverySlotContainer: {
    marginTop: 20,
  },
  deliverySlotButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliverySlotText: {
    fontSize: 16,
    color: '#000',
  },
  dropdownContainer: {
    backgroundColor: '#f0f0f0',
    marginTop: 5,
    borderRadius: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
  },
  dateText: {
    fontSize: 16,
  },
  deliveryDateButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  deliveryDateButtonText: {
    fontSize: 16,
    color: '#000',
  },
  addressContainer: {
    marginBottom: 20,
  },
  addressText: {
    fontSize: 16,
    color: '#000',
  },
  depositContainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  depositText: {
    fontSize: 14,
    color: '#555',
  },
  startButton: {
    backgroundColor: '#5cb85c',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Transparent dark background
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    maxHeight: '80%', // Prevents overflow if the content is large
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  checkboxLabel: {
    fontSize: 16,
  },
  checkboxStatus: {
    fontSize: 16,
    color: '#5cb85c',
  },
  submitButton: {
    backgroundColor: '#5cb85c',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default OtpVerification;

