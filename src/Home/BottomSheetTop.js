import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../Constant/Constant';

const BottomSheetTop = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftView}>
        <Text style={styles.leftText}>Target</Text>
        <Text style={styles.amount}>₦ 7,000,000</Text>
      </View>
      <View style={styles.centerView} />
      <View style={styles.rightView}>
        <Text style={styles.rightText}>Progress</Text>
        <View style={styles.progressBar} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
   
    flex: 1,
  },
  leftView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  leftText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  amount: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  centerView: {
    width: 2,
    backgroundColor: 'white',
    height: 20,
  },
  rightView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  rightText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBar: {
    width: '80%',
    height: 10,
    backgroundColor: COLORS.color_blue, // Green color for progress bar
    marginTop: 5,
  },
});

export default BottomSheetTop;
