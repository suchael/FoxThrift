import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import BottomSheetTop from "./BottomSheetTop";

const DummyData = [
  { id: 1, icon: "payment", amount: "$100", date: "May 20, 2024" },
  { id: 2, icon: "payment", amount: "$50", date: "May 18, 2024" },
  { id: 3, icon: "payment", amount: "$200", date: "May 15, 2024" },
  // Add more dummy data as needed
];

const HistoryItem = ({ icon, amount, date }) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => console.log("Item clicked")}
    >
      <MaterialIcons name={icon} size={24} color="black" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.amount}>{amount}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <MaterialIcons
        name="keyboard-arrow-right"
        size={24}
        color="black"
        style={styles.rightIcon}
      />
    </TouchableOpacity>
  );
};

const BottomSheet = () => {
  return (
    <View style={styles.container}>
      <BottomSheetTop />
      <View style={styles.bottomSheetWrapper}>
        <View style={styles.historyWrapper}>
          <Text style={styles.history}>History</Text>
          <AntDesign name="barschart" size={26} color="black" />
        </View>

        {DummyData.map((item) => (
          <HistoryItem
            key={item.id}
            icon={item.icon}
            amount={item.amount}
            date={item.date}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    elevation: 10,
    shadowColor: "black",

    marginTop: 15,
    // marginHorizontal: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
  },
  bottomSheetWrapper: {
    backgroundColor: "white",
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
   
    
  
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  historyWrapper: {
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "red",
  },
  history: {
    fontSize: 20,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#888",
  },
  rightIcon: {
    marginLeft: 10,
  },
});

export default BottomSheet;
