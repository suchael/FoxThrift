import React from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";

const BankCard = () => {
  return (
    <View style={styles.bankCardWrapper}>
      <View style={[styles.bankCard, styles.bankCardTop]}></View>
      <View style={[styles.bankCard, styles.bankCardBottom]}></View>
    </View>
  );
};



const styles = StyleSheet.create({
  bankCardWrapper: {
    alignItems: 'center',
    marginTop: 25,
    position: "relative",
    // backgroundColor: "lightgray",
    height: 220,
    marginBottom: 10
  },
  bankCard: {
    height: 200,
    width: 300,
    borderRadius: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    elevation: 5,
    position: 'absolute',
  },
  bankCardTop: {
    backgroundColor: 'lightblue',
    zIndex: 2,
    transform: [{ translateY: -4 }, { translateX: -4 }], // Move the blue card slightly up and right
  },
  bankCardBottom: {
    backgroundColor: 'yellow',
    zIndex: 1,
    transform: [{ translateY: 8 }, { translateX: 8 }], // Move the yellow card slightly down and right
  },
  headerText: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default BankCard;
