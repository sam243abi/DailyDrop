import React, {useState} from 'react';
import {DatePickerIOS, View, StyleSheet} from 'react-native';

const App = () => {
  const [chosenDate, setChosenDate] = useState(new Date());

  return (
    <View style={styles.container}>
      <DatePickerIOS date={chosenDate} onDateChange={setChosenDate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;