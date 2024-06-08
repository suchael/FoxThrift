import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Animatable from "react-native-animatable";
import * as LocalAuthentication from "expo-local-authentication";
import { COLORS } from "../Constant/Constant";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [authError, setAuthError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    const checkBiometrics = async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (hasHardware && isEnrolled) {
        setBiometricAvailable(true);
      }
    };
    checkBiometrics();
  }, []);

  const handleBiometricLogin = async () => {
    if (biometricAvailable) {
      setModalVisible(true);
      setAuthError("");
      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to log in",
        fallbackLabel: "Enter your phone password",
      });

      if (auth.success) {
        setAuthenticating(true);
        console.log("biometric login successful");

        setModalVisible(false);
        navigation.replace("Home");
      } else {
        setAuthError("Authentication failed");
        setAuthenticating(false);
        console.log("biometric login FAILED");
      }
    } else {
      setAuthError(
        "Biometric authentication is not available for your device. Please log in with email and password."
      );
    }
  };

  const handleLogin = () => {
    // Handle traditional login here
    navigation.replace("Home");
  };

  return (
    <ScrollView contentContainerStyle={styles.contWrapper}>
      <Animatable.View animation="fadeInUpBig" style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>
        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            placeholder="Email or Phone number"
            placeholderTextColor="#666"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ResetPassword")}
            style={[styles.btn, { marginVertical: 15 }]}
          >
            <Text style={styles.link}>Reset Password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignupScreen")}
            style={styles.btn}
          >
            <Text style={styles.text}>Don't have an account?</Text>
            <Text style={styles.link}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
      {biometricAvailable && (
        <View style={styles.biometricsWrapper}>
          <TouchableOpacity
            style={styles.biometricButton}
            onPress={handleBiometricLogin}
          >
            <View style={styles.fingerPrintWrapper}>
              <Icon
                name="fingerprint"
                size={40}
                color={COLORS.color_darkBlue}
              />
            </View>
            <Text style={styles.biometricText}>Login with Biometrics</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={authenticating}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          {authenticating && (
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <ActivityIndicator size="large" color={COLORS.color_darkBlue} />
                <Text style={styles.modalText}>Authenticating...</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contWrapper: {
    justifyContent: "center",
    backgroundColor: "white",
    flexGrow: 1,
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    margin: 20,
    marginTop: 50,
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
  biometricButton: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "white",
  },
  biometricText: {
    marginLeft: 10,
    color: COLORS.color_darkBlue,
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    color: COLORS.blackTextColor,
    fontSize: 16,
    fontWeight: "500",
  },
  link: {
    color: COLORS.color_darkBlue,
    fontWeight: "bold",
    fontSize: 18,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
  },
  biometricsWrapper: {},
  fingerPrintWrapper: {
    padding: 5,
    elevation: 15,
    backgroundColor: COLORS.whiteTextColor,
    borderWidth: 1,
    borderColor: COLORS.color_darkBlue,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.color_darkBlue,
  },
  closeButton: {
    padding: 10,
    backgroundColor: COLORS.color_darkBlue,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});
