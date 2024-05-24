import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../Constant/Constant";

const Cashout = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { amount } = route.params;
  const amountWithoutSymbol = amount.replace("₦", ""); // Remove the currency symbol
  const amountFloat = parseFloat(amountWithoutSymbol) * 1000; // Convert the remaining number to float and multiply by 1000 to convert it back to 6000

  const percentageTax = 0.022;

  const handleProceed = () => {
    navigation.navigate("AccountDetails"); // Replace 'AccountDetails' with the actual screen name
  };

  const calculateCharges = (amount) => {
    return (parseFloat(amountWithoutSymbol) * percentageTax).toFixed(2); // Use amountWithoutSymbol instead of amount
  };

  const charges = amountFloat ? calculateCharges(amountFloat) : "0.00";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <View style={styles.amountContainer}>
          <Text style={styles.label}>Total:</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>₦{amountFloat}</Text>
          </View>
        </View>

        <View style={styles.chargesContainer}>
          <Text style={styles.chargesText}>Charges:</Text>
          <Text style={styles.chargesAmount}>₦{charges}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleProceed}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
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
  },
  amountContainer: {
    flexDirection: "row",
    // justifyContent: 'space-between',
    alignItems: "center",
    marginBottom: 40,
    gap: 20,
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },

  currencySymbol: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.color_pink,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  warningText: {
    fontSize: 14,
    color: COLORS.color_darkBlue,
    marginBottom: 10,
  },
  chargesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  chargesText: {
    fontSize: 18,
    color: "#333",
  },
  chargesAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    height: 50,
    backgroundColor: COLORS.color_darkBlue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Cashout;
