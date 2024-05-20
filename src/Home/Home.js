import "react-native-gesture-handler";

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
 
} from "react-native";

import { useNavigation } from "@react-navigation/native";


import {
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";

import { COLORS } from "../Constant/Constant";
import BottomBtn from "./BottomBtn";
import BottomSheet from "./BottomSheet";
import BankCard from "./BankCard";

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Entypo name="menu" size={30} color={COLORS.whiteTextColor} />
        <Text style={styles.headerText}>FoxThrift</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <BankCard />
        <WithdrawAndDeposit />
        <BottomSheet />
      </ScrollView>
      <BottomBtn />
    </View>
  );
};

const WithdrawAndDeposit = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.withdrawDepositWrapper}>
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Withdrawal")}>
        <MaterialCommunityIcons
          name="credit-card-fast-outline"
          size={24}
          color="white"
        />
        <Text style={styles.buttonText}>Withdraw</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("SetTarget")}>
        <MaterialIcons name="addchart" size={24} color="white" />
        <Text style={styles.buttonText}>Set target</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: 'center',
    // backgroundColor: COLORS.whiteTextColor,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: COLORS.whiteTextColor,
  },
  headerWrapper: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    gap: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.color_darkBlue,
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
    backgroundColor: COLORS.color_darkBlue,
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

export default Home;
