import React, { useState } from 'react';
import { View, Text, Keyboard, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyBv5qP0vdJ4PR5Qvj9LjYv5SE0GWrhg-50');

const DeliveryAddress = () => {
  const navigation = useNavigation();
  const onSubmit = () => {
    navigation.navigate('Intro');
  };
  const [region, setRegion] = useState({
    latitude: 13.0827,
    longitude: 80.2707,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [marker, setMarker] = useState({
    latitude: 13.0827,
    longitude: 80.2707,
  });
  const [address, setAddress] = useState({
    apartment: '',
    street: '',
    city: '',
    postalCode: '',
    landmark: '',
  });


  const handleMapPress = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;

 
    setMarker({
      latitude,
      longitude,
    });


    try {
      const result = await Geocoder.from(latitude, longitude);
      const addressComponents = result.results[0].address_components;
      
      let street = '';
      let city = '';
      let postalCode = '';
      

      addressComponents.forEach(component => {
        if (component.types.includes('route')) {
          street = component.long_name;
        }
        if (component.types.includes('locality')) {
          city = component.long_name;
        }
        if (component.types.includes('postal_code')) {
          postalCode = component.long_name;
        }
      });


      setAddress({
        ...address,
        street: street || '',
        city: city || '',
        postalCode: postalCode || '',
        landmark: '',
      });


      setRegion({
        ...region,
        latitude,
        longitude,
      });

    } catch (error) {
      console.error(error);
      alert('Could not fetch address. Please try again.');
    }
  };

  const handleSearchLocation = () => {
    const searchAddress = `${address.street}, ${address.city}, ${address.postalCode}`;
    Geocoder.from(searchAddress)
      .then(json => {
        const location = json.results[0].geometry.location;
        setRegion({
          ...region,
          latitude: location.lat,
          longitude: location.lng,
        });
        setMarker({
          latitude: location.lat,
          longitude: location.lng,
        });
      })
      .catch(error => {
        alert('Could not find the location. Please try again.');
        console.error(error);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Where Should We Deliver?</Text>
          <Text style={styles.title2}>Enter your address or tap on the map</Text>

          <TextInput
            style={styles.input}
            placeholder="Apartment"
            value={address.apartment}
            onChangeText={(text) => setAddress((prev) => ({ ...prev, apartment: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Street"
            value={address.street}
            onChangeText={(text) => setAddress((prev) => ({ ...prev, street: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={address.city}
            onChangeText={(text) => setAddress((prev) => ({ ...prev, city: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Postal Code"
            value={address.postalCode}
            onChangeText={(text) => setAddress((prev) => ({ ...prev, postalCode: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Landmark"
            value={address.landmark}
            onChangeText={(text) => setAddress((prev) => ({ ...prev, landmark: text }))}
          />
          <MapView
            style={styles.map}
            region={region}
            onPress={handleMapPress} 
          >
            <Marker coordinate={marker} />
          </MapView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              //onPress={handleSearchLocation} 
              onPress={onSubmit}
            >
              <Text style={styles.buttonText}>Find Location</Text>
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
  map: {
    width: 380,
    height: 200,
    marginVertical: 20,
    top: -420
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    top:-80
  },
  title2: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    top:-90
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
    paddingLeft: 10,
    borderRadius: 5,
    top:130
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
    top:-140
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeliveryAddress;
