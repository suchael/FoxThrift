import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Animatable from "react-native-animatable";
import * as LocalAuthentication from "expo-local-authentication";
import axios from "axios";

import { COLORS } from "../Constant/Constant";
import { LOCAL_IP_ADDRESS, SIGNUP_URL } from "../Constant/URL";

export default function SignupScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

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
      Alert.alert("Biometric registration successful");
      // Handle the success scenario here
    } else {
      Alert.alert("Biometric registration failed");
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(SIGNUP_URL, {
        fullName,
        username,
        email,
        phoneNumber,
        password,
      });

      if (response.status === 201) {
        Alert.alert(
          "Signup successful",
          "Please check your email for confirmation."
        );
        navigation.navigate("LoginScreen");
      } else {
        console.log(
          "Signup failed:",
          response.data.error || "Something went wrong. Please try again."
        );
        Alert.alert(
          "Signup failed",
          response.data.error || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Alert.alert(
          "Signup failed",
          "Email already exists. Please use a different email."
        );
      } else {
        console.error("Error:", error);
        Alert.alert("Signup failed", "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contWrapper}>
      <Animatable.View animation="fadeInUpBig" style={styles.container}>
        <Text style={styles.title}>Create an Account</Text>
        <View style={styles.inputContainer}>
          <Icon name="person" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            placeholder="Fullname"
            placeholderTextColor="#666"
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="none"
          />
        </View>
        {fullName.length > 2 && (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              marginTop: -16,
              marginBottom: 20,
              color: COLORS.color_darkBlue,
            }}
          >
            Please ensure that your full name matches the one on your bank
            details.
          </Text>
        )}

        <View style={styles.inputContainer}>
          <Icon name="person" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            placeholder="Username"
            placeholderTextColor="#666"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="phone" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            placeholder="Phone number"
            placeholderTextColor="#666"
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#666"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Icon
              name={passwordVisible ? "visibility" : "visibility-off"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.biometricButton}
          onPress={handleBiometricRegister}
        >
          <Icon name="fingerprint" size={30} color={COLORS.color_darkBlue} />
          <Text style={styles.biometricText}>Register Biometrics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => navigation.navigate("LoginScreen")}
            style={styles.btn}
          >
            <Text style={styles.text}>Already have an account?</Text>
            <Text style={styles.link}> Log In</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contWrapper: {
    // flex: 1,
    justifyContent: "center",
    // backgroundColor: "red"
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    fontSize: 17,
  },
  inputIcon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: COLORS.color_darkBlue,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  biometricButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  biometricText: {
    marginLeft: 10,
    color: COLORS.color_darkBlue,
    fontWeight: "bold",
    fontSize: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    color: COLORS.blackTextColor,
    fontSize: 17,
    fontWeight: "500",
  },
  link: {
    color: COLORS.color_darkBlue,
    fontWeight: "bold",
    fontSize: 20,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
  },
});
