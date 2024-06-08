import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Animatable from "react-native-animatable";
import { COLORS } from "../Constant/Constant";

export default function ResetPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter Email, Step 2: Enter Code, Step 3: Enter New Password
  const [message, setMessage] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleNextStep = () => {
    if (step === 1) {
      // Handle sending email with verification code
      // For now, we move to the next step
      setMessage("Please check your email, a 6 digit verification code was sent");
      setStep(2);
    } else if (step === 2) {
      // Handle verification of the code
      setMessage("Now set your new password");
      setStep(3);
    } else if (step === 3) {
      // Handle password reset
      if (newPassword === confirmPassword) {
        // Reset the password and navigate to Home
        navigation.replace("LoginScreen");
      } else {
        alert("Passwords do not match");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView contentContainerStyle={styles.contWrapper}>
        <Animatable.View animation="fadeInUpBig" style={styles.container}>
          <Text style={styles.title}>Reset Your Password</Text>

          {message ? (
            <Text style={styles.message}>{message}</Text>
          ) : null}

          {step === 1 ? (
            <View style={styles.inputContainer}>
              <Icon name="email" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#666"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          ) : step === 2 ? (
            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                placeholder="Enter verification code"
                placeholderTextColor="#666"
                style={styles.input}
                value={code}
                onChangeText={setCode}
                keyboardType="numeric"
                autoCapitalize="none"
              />
            </View>
          ) : (
            <>
              <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  placeholder="Enter new password"
                  placeholderTextColor="#666"
                  style={styles.input}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry={!newPasswordVisible}
                />
                <TouchableOpacity onPress={() => setNewPasswordVisible(!newPasswordVisible)}>
                  <Icon name={newPasswordVisible ? "visibility" : "visibility-off"} size={20} color="#666" />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  placeholder="Confirm new password"
                  placeholderTextColor="#666"
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!confirmPasswordVisible}
                />
                <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                  <Icon name={confirmPasswordVisible ? "visibility" : "visibility-off"} size={20} color="#666" />
                </TouchableOpacity>
              </View>
            </>
          )}
          
          <TouchableOpacity style={styles.button} onPress={handleNextStep}>
            <Text style={styles.buttonText}>
              {step === 1
                ? "Send Verification Code"
                : step === 2
                ? "Verify Code"
                : "Reset Password"}
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contWrapper: {
    justifyContent: "center",
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 15,
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
  message: {
    textAlign: "center",
    color: COLORS.color_darkBlue,
    fontSize: 17,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
