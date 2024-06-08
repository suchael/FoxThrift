import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons"; // Assuming you're using Expo
import { COLORS } from "../Constant/Constant";

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
        // Add more history entries as needed
      ],
    },
    // Add more target details as needed
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
            <Text style={[styles.targetText, {color: COLORS.color_darkBlue}]}>
              Target:{" "}
              <Text style={styles.targetTextChild}>
                {target.amount}
              </Text>
            </Text>
            <Text style={styles.targetText}>
              Start Date:{" "}
              <Text style={styles.targetTextChild}>
                {target.startDate}
              </Text>
            </Text>
            <Text style={styles.targetText}>
              End Date:{" "}
              <Text style={styles.targetTextChild}>
                {target.endDate}
              </Text>
            </Text>
            <Text style={[styles.targetText, {color: COLORS.color_darkBlue}]}>
              Maturity Date:{" "}
              <Text style={styles.targetTextChild}>
                {target.maturityDate}
              </Text>
            </Text>
          </View>
          <AntDesign name="arrowright" size={24} color={COLORS.color_darkBlue}/>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.whiteTextColor,
    flex: 1,
  },
  targetCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fafafa",
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 15,
    borderWidth: 0.5,
    // borderColor: COLORS.color_darkBlue,
  },
  targetInfo: {
    flex: 1,
  },
  targetText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  targetTextChild: { fontWeight: "500", fontSize: 16, color: "black" },
});

export default All_Target_History;
