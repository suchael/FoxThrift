import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons"; // Assuming you're using Expo
import { COLORS } from "../../Constant/Constant";

const All_Target_History = () => {
  const navigation = useNavigation();

  const allTargetDetails = [
    {
      id: 1,
      amount: "₦12,000",
      startDate: "Feb 12th, 2021",
      endDate: "Feb 26th, 2021",
      maturityDate: "Feb 28th, 2021",
      type: "Weekly",
      history: [
        {
          amount: "₦2,000",
          week: "Week 1",
          date: "Wednesday, 2nd Oct, 2021",
          status: "Paid",
        },
        {
          amount: "₦2,000",
          week: "Week 2",
          date: "Monday, 10th Oct, 2021",
          status: "Missed",
        },
      ],
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {allTargetDetails.map((target) => (
        <TouchableOpacity
          key={target.id}
          style={styles.targetCard}
          onPress={() => navigation.navigate("TargetHistory", { target })}
        >
          <View style={styles.targetInfo}>
            <Text style={[styles.targetTitle, { color: COLORS.color_darkBlue }]}>
              Target Amount:{" "}
              <Text style={styles.targetAmount}>{target.amount}</Text>
            </Text>
            <Text style={styles.targetText}>
              Start Date:{" "}
              <Text style={styles.targetTextChild}>{target.startDate}</Text>
            </Text>
            <Text style={styles.targetText}>
              End Date:{" "}
              <Text style={styles.targetTextChild}>{target.endDate}</Text>
            </Text>
            <Text style={styles.targetText}>
              Maturity Date:{" "}
              <Text style={styles.targetTextChild}>{target.maturityDate}</Text>
            </Text>
          </View>
          <AntDesign name="arrowright" size={24} color={COLORS.color_darkBlue} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: COLORS.whiteTextColor,
    flexGrow: 1,
  },
  targetCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 0.8,
    borderColor: "#e0e0e0",
  },
  targetInfo: {
    flex: 1,
  },
  targetTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  targetAmount: {
    fontWeight: "600",
    fontSize: 18,
    color: COLORS.color_primary, // Accent color for amount
  },
  targetText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.color_darkGray,
    marginBottom: 5,
  },
  targetTextChild: {
    fontWeight: "500",
    fontSize: 15,
    color: COLORS.color_black, // Subtle color for dates and extra details
  },
});

export default All_Target_History;
