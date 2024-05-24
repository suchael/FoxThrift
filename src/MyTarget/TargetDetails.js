import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../Constant/Constant";

const DummyData = [
    { label: "Target Amount:", value: "₦12,000" },
    { label: "Start date:", value: "May 1st, 2024" },
    { label: "End date:", value: "May 30th, 2024" },
    { label: "Accumulated amount:", value: "₦4,000" },
    { label: "Daily payment of:", value: "₦1,000" },
  ];
const TargetDetails = () => {
  const navigation = useNavigation();

  const handlePay = () => {
    navigation.navigate("PaymentScreen"); // Replace 'PaymentScreen' with the actual screen name
  };

  const handleCashout = () => {
    Alert.alert(
      "Notification",
      "Cashing out means you want to end the current target",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => navigation.navigate("Cashout", {
            amount: DummyData[0].value
          }), // Replace 'Cashout' with the actual screen name
        },
      ],
      { cancelable: false }
    );
  };
 
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        {DummyData.map((data, index) => (
          <View style={styles.detailRow} key={index}>
            <Text style={styles.label}>{data.label}:</Text>
            <Text style={styles.value}>{data.value}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.payButton} onPress={handlePay}>
          <Text style={styles.buttonText}>Pay now</Text>
        </TouchableOpacity>
        <View style={styles.bottomBtnWrapper}>
          <TouchableOpacity
            style={styles.cashoutButton}
            onPress={handleCashout}
          >
            <Text style={styles.buttonText}>Cashout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    fontSize: 18,
    color: "#555",
  },
  payButton: {
    height: 50,
    width: "60%",
    backgroundColor: COLORS.color_darkBlue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginBottom: 20,
  },
  cashoutButton: {
    height: 50,
    backgroundColor: "#ff5c5c",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  bottomBtnWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TargetDetails;
