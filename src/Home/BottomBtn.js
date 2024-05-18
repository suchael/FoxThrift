import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const BottomBtn = () => {
  const [animatedValue] = useState(new Animated.Value(1));

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(animatedValue, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.buttonWrapper,
          { transform: [{ scale: animatedValue }] },
        ]}
      >
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <MaterialIcons name="home" size={24} color="black" />
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[
          styles.buttonWrapper,
          { transform: [{ scale: animatedValue }] },
        ]}
      >
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <MaterialIcons name="search" size={24} color="black" />
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[
          styles.buttonWrapper,
          { transform: [{ scale: animatedValue }] },
        ]}
      >
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <MaterialIcons name="person" size={24} color="black" />
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "100%",
    backgroundColor: "white",
    elevation: 10, // Elevation for Android devices
    shadowColor: "black", // Shadow color
    shadowOffset: { width: 10, height: -20 }, // Offset to make shadow appear on top
    shadowOpacity: 0.3, // Opacity of the shadow
    shadowRadius: 4, // Radius of the shadow blur
  },

  buttonWrapper: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    // flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 2,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default BottomBtn;
