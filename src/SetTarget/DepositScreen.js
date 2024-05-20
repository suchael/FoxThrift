import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DepositScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Payment Confirmation</Text>
      <Text style={styles.text}>You have been charged successfully!</Text>
      <Text style={styles.text}>Thank you for using our service.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default DepositScreen;
