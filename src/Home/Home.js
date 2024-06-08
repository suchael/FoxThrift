import "react-native-gesture-handler";

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
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
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "yellow",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/Avatar.png")}
            style={{ width: "100%", height: "100%", borderRadius: 20 }}
          />
        </View>
        <View>
          <Text style={styles.welcomeText}>Welcome back</Text>
          <Text style={styles.headerText}>Sani_Abdusallam</Text>
        </View>
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
      <TouchableOpacity
        style={[
          styles.button,
          {
            borderBottomEndRadius: 25,
            borderTopEndRadius: 25,
          },
        ]}
        onPress={() => navigation.navigate("TargetDetails")}
      >
        <MaterialCommunityIcons
          name="credit-card-fast-outline"
          size={24}
          color="white"
        />
        <Text style={styles.buttonText}>My Target</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          {
            borderTopStartRadius: 30,
            borderBottomStartRadius: 30,
          },
        ]}
        onPress={() => navigation.navigate("SetTarget")}
      >
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
    backgroundColor: COLORS.whiteTextColor,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 5,
    color: COLORS.whiteTextColor,
  },
  welcomeText: {
    fontSize: 17,
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
