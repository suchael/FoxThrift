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
      setAuthenticating(true);
      setAuthError("");
      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to log in",
        fallbackLabel: "Enter your password",
      });

      setAuthenticating(false);

      if (auth.success) {
        setModalVisible(false);
        navigation.replace("Home");
      } else {
        setAuthError("Authentication failed");
      }
    } else {
      setAuthError(
        "Biometric authentication is not available. Please log in with email and password."
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
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

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
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {authenticating ? (
              <ActivityIndicator size="large" color={COLORS.color_darkBlue} />
            ) : (
              <>
                <Text style={styles.modalText}>
                  {authError || "Authentication successful"}
                </Text>
                {authError && (
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contWrapper: {
    flex: 1,
    justifyContent: "center",
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
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  biometricText: {
    marginLeft: 10,
    color: COLORS.color_darkBlue,
    fontSize: 18,
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
    elevation: 24,
    backgroundColor: COLORS.whiteTextColor,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: COLORS.color_darkBlue,
  },
  closeButton: {
    padding: 10,
    backgroundColor: COLORS.color_darkBlue,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
