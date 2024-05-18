import "react-native-gesture-handler";

import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import BankCard from "./src/Home/BankCard";
import BottomSheet from "./src/Home/BottomSheet";
import BottomBtn from "./src/Home/BottomBtn";

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.headerText}>FoxThrift</Text>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <BankCard />
            <WithdrawAndDeposit />
            <BottomSheet />
          </ScrollView>
          <BottomBtn/>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const WithdrawAndDeposit = () => {
  return (
    <View style={styles.withdrawDepositWrapper}>
      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons
          name="credit-card-fast-outline"
          size={24}
          color="white"
        />
        <Text style={styles.buttonText}>Withdraw</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <MaterialIcons name="addchart" size={24} color="white" />
        <Text style={styles.buttonText}>Deposit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: 'center',
    backgroundColor: "white",
  },
  headerText: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
  },
  scrollViewContent: {
    paddingVertical: 20,
    paddingBottom: 100,
  },

  withdrawDepositWrapper: {
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    // backgroundColor: "red",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 24,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 10,
    color: "white",
  },
});

export default App;
