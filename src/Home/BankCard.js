import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../Constant/Constant";

const BankCard = () => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
    Animated.timing(animatedValue, {
      toValue: isBalanceVisible ? 0 : 1,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const rotateInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity onPress={toggleBalanceVisibility}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Balance</Text>
            <Animated.View
              style={{ transform: [{ rotate: rotateInterpolate }] }}
            >
              <MaterialIcons name="visibility" size={24} color="white" />
            </Animated.View>
          </View>
          <Text style={styles.balance}>
            {isBalanceVisible ? "₦ 50,000" : "₦ ****"}
          </Text>
          <View style={styles.details}>
            <Text style={styles.text}>Full name: Sani Abdusallam</Text>
            <Text style={styles.text}>Bank Name: Moniepoint</Text>
            <Text style={styles.text}>Account Number: 09405059</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: COLORS.color_darkBlue,
    paddingHorizontal: 10,
    marginTop: -25,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    paddingVertical: 25,
    marginBottom: 20,
  },
  card: {
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.whiteTextColor,
  },
  balance: {
    fontSize: 25,
    marginTop: 2,
    marginBottom: 20,
    color: COLORS.whiteTextColor,
  },
  details: {
    paddingTop: 10,
  },
  text: {
    fontSize: 17,
    fontWeight: "500",
    marginVertical: 2,
    color: COLORS.whiteTextColor,
  },
});

export default BankCard;
