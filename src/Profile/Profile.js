import React, { useContext, useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import Icon from "react-native-vector-icons/MaterialIcons";

import { AppContext } from "../../AppContextProvider";
import { COLORS } from "../Constant/Constant";

const Profile = ({ route, navigation }) => {
  const { userData } = useContext(AppContext);
  const [biometricEnrolled, setBiometricEnrolled] = useState(false);

  useEffect(() => {
    const checkBiometrics = async () => {
      try {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        setBiometricEnrolled(hasHardware && isEnrolled);
      } catch (error) {
        console.error("Error checking biometric availability: ", error);
        Alert.alert("Error", "Failed to check biometric availability.");
      }
    };
    checkBiometrics();
  }, []);

  const handleBiometricRegister = useCallback(async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware) {
        Alert.alert("Error", "Biometric hardware not available on this device.");
        return;
      }

      if (!isEnrolled) {
        Alert.alert("Error", "Please enroll your biometrics in the device settings.");
        return;
      }

      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Register Biometrics",
      });

      if (biometricAuth.success) {
        await SecureStore.setItemAsync("biometricEnrolled", "true");
        Alert.alert("Success", "Biometric registration was successful.");
        setBiometricEnrolled(true);
      } else {
        Alert.alert("Failed", "Biometric registration was not successful.");
      }
    } catch (error) {
      console.error("Error during biometric registration: ", error);
      Alert.alert("Error", "Failed to register biometrics.");
    }
  }, []);

  const handleLogout = useCallback(() => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout cancelled"),
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await SecureStore.deleteItemAsync("email");
              await SecureStore.deleteItemAsync("token");
              await SecureStore.deleteItemAsync("user");
              await SecureStore.deleteItemAsync("biometricEnrolled");
              navigation.replace("LoginScreen");
            } catch (error) {
              console.error("Error during logout: ", error);
              Alert.alert("Error", "Failed to logout. Please try again.");
            }
          },
        },
      ],
      { cancelable: false }
    );
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>

      <View style={styles.profileInfo}>
        <Text style={styles.label}>Full Name:</Text>
        <Text style={styles.value}>{userData?.userData?.fullName || "N/A"}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{userData?.userData?.username || "N/A"}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userData?.userData?.email || "N/A"}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>{userData?.userData?.phoneNumber || "N/A"}</Text>
      </View>

      {!biometricEnrolled && (
        <TouchableOpacity style={styles.biometricButton} onPress={handleBiometricRegister}>
          <Icon name="fingerprint" size={35} color={COLORS.primaryColor} />
          <Text style={styles.biometricText}>Set Up Biometrics</Text>
        </TouchableOpacity>
      )}

      {/* <Text style={styles.poweredByText}>Powered by Eculis Code</Text> */}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: COLORS.whiteTextColor,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: COLORS.primaryColor,
  },
  profileInfo: {
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.darkText,
  },
  value: {
    fontSize: 16,
    color: COLORS.lightText,
  },
  biometricButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 10,
    marginVertical: 20,
    elevation: 5,
  },
  biometricText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: COLORS.primaryColor,
  },
  poweredByText: {
    fontSize: 14,
    color: COLORS.color_darkBlue,
    textAlign: "center",
    marginVertical: 10,
  },
  logoutButton: {
    backgroundColor: COLORS.color_darkBlue,
    padding: 10,
    borderRadius: 30,
    alignItems: "center",
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
  },
  logoutButtonText: {
    fontSize: 16,
    color: COLORS.whiteTextColor,
    fontWeight: "bold",
  },
});

export default Profile;
