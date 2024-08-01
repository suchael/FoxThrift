import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../Constant/Constant";

const BottomSheetTop = ({ progress }) => {
  // Calculate the width of the progress bar dynamically based on the progress percentage
  const progressBarWidth = `${progress}%`;

  return (
    <View style={styles.container}>
      <View style={styles.leftView}>
        <Text style={[styles.leftText, styles.textShadow]}>Current Target</Text>
        <Text style={[styles.amount, styles.textShadow]}>₦ 7,000,000</Text>
      </View>
      <View style={styles.centerView} />
      <View style={styles.rightView}>
        <Text style={[styles.rightText, styles.textShadow]}>Progress</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: progressBarWidth }]} />
          {/* <Text style={styles.progressText}>{progress}%</Text> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  leftView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  leftText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    
  },
  amount: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 5,
  },
  centerView: {
    width: 2,
    backgroundColor: "white",
    height: 20,
  },
  rightView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  rightText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  progressBarContainer: {
    width: "80%",
    backgroundColor: "white",
    marginTop: 5,
    position: "relative",
  },
  progressBar: {
    height: 15,
    backgroundColor: COLORS.color_blue, // Green color for progress bar
    borderRadius: 1,
    elevation: 24,
  },
  progressText: {
    fontSize: 15,
    // color: "white",
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    fontWeight: "bold",
    position: "absolute",
    textAlign: "center",
    top: -3,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default BottomSheetTop;
