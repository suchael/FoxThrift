import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../Constant/Constant";

const DummyData = [
  { label: "Target Amount", value: "₦12,000" },
  { label: "Start Date", value: "May 1st, 2024" },
  { label: "End Date", value: "May 30th, 2024" },
  { label: "Accumulated Amount", value: "₦4,000" },
  { label: "Daily Payment", value: "₦1,000" },
];

const TargetDetails = () => {
  const navigation = useNavigation();

  const handlePay = () => {
    navigation.navigate("PaymentScreen"); // Replace with the actual screen name
  };

  const handleCashout = () => {
    Alert.alert(
      "Cashout Confirmation",
      "Cashing out will end the current target. Do you wish to proceed?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("Cashout", { amount: DummyData[0].value }), // Replace 'Cashout' with actual screen name
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Current Target Details</Text>
        {DummyData.map((data, index) => (
          <View style={styles.detailRow} key={index}>
            <Text style={styles.label}>{data.label}:</Text>
            <Text style={styles.value}>{data.value}</Text>
          </View>
        ))}
        <View style={styles.bottomBtnWrapper}>
          <TouchableOpacity style={styles.cashoutButton} onPress={handleCashout}>
            <Text style={styles.buttonText}>Cashout</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.payButton} onPress={handlePay}>
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.color_darkBlue,
    textAlign: "center",
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 8,
    borderRadius: 6,
    borderColor: "#E0E0E0",
    borderWidth: 0.3,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#555",
  },
  payButton: {
    backgroundColor: COLORS.color_darkBlue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  cashoutButton: {
    backgroundColor: "#ff5c5c",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  bottomBtnWrapper: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "600",
  },
});

export default TargetDetails;
