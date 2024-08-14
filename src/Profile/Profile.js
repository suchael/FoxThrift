import React, { useContext, useEffect, useState } from "react";
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
      const has_Fingerprint_Hardware = await LocalAuthentication.hasHardwareAsync();
      const user_has_enroll_biometric = await LocalAuthentication.isEnrolledAsync();
      console.log("user_has_enroll_biometric: ", user_has_enroll_biometric);
      setBiometricEnrolled(has_Fingerprint_Hardware && user_has_enroll_biometric);
    };
    checkBiometrics();
  }, []);

  const handleBiometricRegister = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware) {
      Alert.alert("Biometric hardware not available");
      return;
    }

    if (!isEnrolled) {
      Alert.alert("Please enroll your biometrics in the device settings first");
      return;
    }

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Register Biometrics",
    });

    if (biometricAuth.success) {
      await SecureStore.setItemAsync("biometricEnrolled", "true");
      Alert.alert("Biometric registration successful");
      setBiometricEnrolled(true);
    } else {
      Alert.alert("Biometric registration failed");
    }
  };

  const handleLogout = () => {
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
            await SecureStore.deleteItemAsync("email");
            await SecureStore.deleteItemAsync("token");
            await SecureStore.deleteItemAsync("user");
            await SecureStore.deleteItemAsync("biometricEnrolled");
            navigation.replace("LoginScreen");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Full Name:</Text>
        <Text style={styles.value}>{userData.userData.fullName}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{userData.userData.username}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userData.userData.email}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>{userData.userData.phoneNumber}</Text>
      </View>

      {!biometricEnrolled && (
        <TouchableOpacity
          style={styles.biometricButton}
          onPress={handleBiometricRegister}
        >
          <Icon name="fingerprint" size={35} />

          <Text style={styles.biometricText}>Set Up Biometrics</Text>
        </TouchableOpacity>
      )}

        <Text style={[styles.buttonText, {color: COLORS.color_darkBlue, textAlign: "center"}]}>Powered by Eculis Code</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
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
  },
  profileInfo: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  value: {
    fontSize: 18,
    color: "#555",
  },
  biometricButton: {
    backgroundColor: COLORS.whiteTextColor,
    borderWidth: 3,
    borderColor: COLORS.color_darkBlue,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
    elevation: 10,
  },
  biometricText: {
    // color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 10,
    backgroundColor: COLORS.color_darkBlue,
    padding: 12,
    borderRadius: 40,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
