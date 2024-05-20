import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { COLORS } from "../Constant/Constant";

const BankCard = () => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [animatedValue] = useState(new Animated.Value(1));
  const [fadeAnim] = useState(new Animated.Value(0));
  const HiddenBalance = "₦ ****";
  const balanceText = "₦ 200.00"; // Assuming the actual balance value

  const handlePress = () => {
    setIsBalanceVisible(!isBalanceVisible);
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 0.95,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.spring(animatedValue, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
    if (isBalanceVisible) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.bankCardWrapper}>
      <Animated.View
        style={[
          styles.bankCard,
          styles.bankCardTop,
          { transform: [{ scale: animatedValue }] },
        ]}
      >
        <TouchableOpacity onPress={handlePress} style={styles.cardContent}>
          <View style={styles.row}>
            <View
              style={[
                styles.column,
                { flex: 1, justifyContent: "space-between" },
              ]}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={[styles.headerText]}>Balance</Text>
                  {isBalanceVisible ? (
                    <Feather
                      name="eye"
                      size={24}
                      color={COLORS.whiteTextColor}
                    />
                  ) : (
                    <Feather name="eye-off" size={24} color="white" />
                  )}
                </View>
                {!isBalanceVisible && (
                  <Text style={[styles.headerText, styles.balanceText]}>
                    {HiddenBalance}
                  </Text>
                )}
                <Animated.Text
                  style={[
                    styles.headerText,
                    styles.balanceText,
                    { opacity: fadeAnim, transform: [{ scale: fadeAnim }] },
                  ]}
                >
                  {isBalanceVisible ? balanceText : HiddenBalance}
                </Animated.Text>
              </View>
              <View>
                <Text style={[styles.text, styles.name]}>
                  Full name: Sani Abdusallam
                </Text>
                <Text style={[styles.text, styles.name]}>
                  Bank Name: Moniepoint
                </Text>
                <Text style={[styles.text, styles.name]}>
                  Account Number: 09405059
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
      <View style={[styles.bankCard, styles.bankCardBottom]}>
        {/* <Image
          source={require("../../assets/card2.png")}
          style={styles.image}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bankCardWrapper: {
    alignItems: "center",
    marginTop: 25,
    position: "relative",
    height: 220,
    marginBottom: 10,
  },
  bankCard: {
    height: 200,
    width: 300,
    borderRadius: 16,
    marginVertical: 8,
    position: "absolute",
  },
  bankCardTop: {
    backgroundColor: "rgba(173, 216, 230, 0.3)", // Light blue with transparency for glassmorphism effect
    zIndex: 2,
    borderWidth: 2,
    borderColor: COLORS.color_blue,
    padding: 15,
  },
  bankCardBottom: {
    backgroundColor: COLORS.color_blue,
    zIndex: 1,
    transform: [{ translateY: 4 }, { translateX: 4 }],
    elevation: 24,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  column: {
    flex: 1,
    paddingVertical: 15,
    height: 200,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.blackTextColor,
  },
  text: {
    fontSize: 18,
    color: COLORS.whiteTextColor,
  },
  name: {
    fontWeight: "bold",
  },
  balanceText: {
    fontSize: 25,
    // color: COLORS.whiteTextColor,
    // textShadowColor: COLORS.color_pink,
    // textShadowOffset: { width: 2, height: 2 },
    // textShadowRadius: 5,
    fontWeight: "bold",
    color: COLORS.blackTextColor,
  },
  imageWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  silverPanel: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "silver",
    elevation: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
});

export default BankCard;
