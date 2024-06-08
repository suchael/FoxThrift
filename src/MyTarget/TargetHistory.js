import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { COLORS } from "../Constant/Constant";

const TargetHistory = () => {
  const route = useRoute();
  const { target } = route.params;

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "#28a745"; // Green
      case "Missed":
        return "#dc3545"; // Red
      case "Pending":
        return "#ffc107"; // Yellow
      default:
        return "#333"; // Default color
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Target: {target.amount}</Text>
        <Text style={styles.headerText}>Target Type: {target.type}</Text>
      </View>
      <View style={styles.historySection}>
        <Text style={styles.historyHeader}>History</Text>
        {target.history.map((entry, index) => (
          <View key={index} style={styles.historyCard}>
            <Text style={[styles.historyText, {fontWeight: "bold"}]}>Amount: {entry.amount}</Text>
            <Text style={styles.historyText}>Week: {entry.week}</Text>
            <Text style={styles.historyText}>Date: {entry.date}</Text>
            <Text
              style={[
                styles.historyText,
                { color: getStatusColor(entry.status), fontWeight: "bold" },
              ]}
            >
              Status: {entry.status}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.whiteTextColor,
    flex: 1,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  historySection: {
    marginTop: 10,
  },
  historyHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  historyCard: {
    backgroundColor: COLORS.whiteTextColor,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 15,
  },
  historyText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
});

export default TargetHistory;
