import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../Constant/Constant";

const BottomBtn = () => {
  const navigation = useNavigation();
  const [textColor, setTextColor] = useState(false);
  const [animatedValues, setAnimatedValues] = useState([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
  ]);

  const handlePress = (index) => {
    const newAnimatedValues = animatedValues.map((value, i) =>
      i === index ? new Animated.Value(1.2) : new Animated.Value(1)
    );

    setAnimatedValues(newAnimatedValues);

    Animated.sequence([
      Animated.timing(animatedValues[index], {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(animatedValues[index], {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        // Reset animation value after animation finishes
        setAnimatedValues((prevValues) =>
          prevValues.map((value, i) =>
            i === index ? new Animated.Value(1) : value
          )
        );
      }
    });

    // Navigate to the corresponding screen
    const screenToNavigate = buttons[index].to;
    navigation.navigate(screenToNavigate);
  };

  const buttons = [
    { icon: "home", text: "Home", to: "Home" },
    { icon: "person", text: "Profile", to: "Profile" },
  ];

  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => handlePress(index)}
        >
          <Animated.View
            style={[
              styles.buttonContent,
              { transform: [{ scale: animatedValues[index] }] },
            ]}
          >
            <View style={styles.gradient}>
              <MaterialIcons
                name={button.icon}
                size={24}
                color={COLORS.blackTextColor}
              />
              <Text style={styles.buttonText}>{button.text}</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: "100%",
    backgroundColor: COLORS.whiteTextColor,
    elevation: 10,
    shadowColor: "black",
    shadowOffset: { width: 10, height: -20 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.blackTextColor,
  },
});

export default BottomBtn;
