import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../Constant/Constant";

const CurrentTarget = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { amount } = route.params;
  const amountWithoutSymbol = amount.replace("₦", "");
  const amountFloat = parseFloat(amountWithoutSymbol) * 1000;

  const handleProceed = () => {
    navigation.navigate("AccountDetails"); // Replace 'AccountDetails' with the actual screen name
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentWrapper}>
        {/* Display Amount */}
        <View style={styles.amountContainer}>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.currencySymbol}>₦{amountFloat}</Text>
        </View>

        {/* Proceed Button */}
        <TouchableOpacity style={styles.button} onPress={handleProceed}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f4f4f8",
    justifyContent: "center",
  },
  contentWrapper: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  label: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.color_darkBlue,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.color_pink,
  },
  button: {
    height: 50,
    backgroundColor: COLORS.color_darkBlue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1,
  },
});

export default CurrentTarget;
