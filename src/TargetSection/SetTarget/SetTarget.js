import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  Animated,
  Modal,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../../Constant/Constant";
import { AppContext } from "../../../AppContextProvider";

const SetTarget = () => {
  const navigation = useNavigation();
  const { userData } = useContext(AppContext);
  console.log("userData: ", userData);

  const REGULAR_TAX = 0.022; // (i.e 2.2% )this is the tax for any deposit
  const END_TARGET_TAX = 0.15; //  (i.e 15% ) This is the tax when users wants to end target befor maturity

  const [targetAmount, setTargetAmount] = useState("");
  const [duration, setDuration] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [showDepositOptions, setShowDepositOptions] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [durationType, setDurationType] = useState(null);
  const [loading, setLoading] = useState(false);

  const depositOptionsOpacity = useRef(new Animated.Value(0)).current;
  const depositAmountOpacity = useRef(new Animated.Value(0)).current;
  const continueButtonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showDepositOptions) {
      Animated.timing(depositOptionsOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      depositOptionsOpacity.setValue(0);
    }
  }, [showDepositOptions]);

  useEffect(() => {
    if (depositAmount) {
      Animated.timing(depositAmountOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      depositAmountOpacity.setValue(0);
    }
  }, [depositAmount]);

  useEffect(() => {
    if (showContinueButton) {
      Animated.timing(continueButtonOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      continueButtonOpacity.setValue(0);
    }
  }, [showContinueButton]);

  const handleDurationTypeChange = (type) => {
    setDurationType(type);
    setModalVisible(true);
  };

  const handleDurationSelect = (value) => {
    setLoading(true);
    setTimeout(() => {
      setDuration(value);
      setModalVisible(false);
      calculateDepositAmount(value);
      setLoading(false);
    }, 500); // Simulate loading delay
  };

  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    });
    const formattedValue = formatter
      .format(value)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedValue.replace("NGN", "₦");
  };

  const calculateDepositAmount = (duration) => {
    const amount = parseFloat(targetAmount);
    if (isNaN(amount) || amount <= 0 || !durationType || !duration) {
      Alert.alert("Invalid Input", "Please ensure all inputs are valid.");
      return;
    }

    let calculatedDepositAmount;
    if (durationType) {
      calculatedDepositAmount = amount / duration;
    }

    setDepositAmount(formatCurrency(calculatedDepositAmount.toFixed(2)));
    setShowContinueButton(true);
  };

  const handleConfirmTargetAmount = () => {
    if (!targetAmount || isNaN(targetAmount) || parseFloat(targetAmount) <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid target amount.");
      return;
    }
    setShowDepositOptions(true);
    Keyboard.dismiss();
  };

  const amount_to_pay = parseFloat(depositAmount.replace(/[^0-9.-]+/g, ""));
  const tax = amount_to_pay * REGULAR_TAX; // This is the tax amount
  const taxedAmount_To_Pay = tax + amount_to_pay;
  const alertNavigation = () => {
    Alert.alert(
      "Payment Confirmation",
      `By clicking OK, you agree to be charged ₦${taxedAmount_To_Pay} from your wallet
      `,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("DepositScreen", {
              fullName: userData.userData.fullName,
              userEmail: userData.userData.email,
              targetAmount: parseFloat(targetAmount),
              durationType: durationType,
              periodicAmount: taxedAmount_To_Pay,
            });
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        {!showDepositOptions && (
          <View>
            <Text style={styles.header}>Welcome to FoxThrift!</Text>
            <Text style={styles.subHeader}>Now set your target</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.currencySymbol}>₦</Text>
              <TextInput
                style={[styles.input, { height: 50, fontSize: 18 }]}
                placeholder="Enter target amount"
                keyboardType="numeric"
                value={targetAmount}
                onChangeText={(value) => setTargetAmount(value)}
              />
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirmTargetAmount}
              >
                <Text style={styles.confirmButtonText}>Proceed</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {showDepositOptions && (
          <>
            <Animated.View
              style={{
                opacity: depositOptionsOpacity,
                borderWidth: 2,
                borderColor: "lightgray",
                elevation: 10,
                backgroundColor: COLORS.whiteTextColor,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                marginVertical: 10,
                width: "100%",
              }}
            >
              {depositAmount == "" && (
                <>
                  <Text style={styles.subHeader}>Now Choose a plan</Text>
                  <View style={styles.depositTypeContainer}>
                    <TouchableOpacity
                      style={[
                        styles.depositTypeButton,
                        durationType === "monthly" &&
                          styles.selectedDepositType,
                      ]}
                      onPress={() => handleDurationTypeChange("monthly")}
                    >
                      <Text
                        style={[
                          styles.depositTypeButtonText,
                          durationType === "monthly" && {
                            color: COLORS.whiteTextColor,
                          },
                        ]}
                      >
                        Monthly
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.depositTypeButton,
                        durationType === "weekly" && styles.selectedDepositType,
                      ]}
                      onPress={() => handleDurationTypeChange("weekly")}
                    >
                      <Text
                        style={[
                          styles.depositTypeButtonText,
                          durationType === "weekly" && {
                            color: COLORS.whiteTextColor,
                          },
                        ]}
                      >
                        Weekly
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.depositTypeButton,
                        durationType === "daily" && styles.selectedDepositType,
                      ]}
                      onPress={() => handleDurationTypeChange("daily")}
                    >
                      <Text
                        style={[
                          styles.depositTypeButtonText,
                          durationType === "daily" && {
                            color: COLORS.whiteTextColor,
                          },
                        ]}
                      >
                        Daily
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Animated.View>

            {depositAmount !== "" && (
              <Animated.View style={{ opacity: depositAmountOpacity }}>
                {duration && (
                  <View style={styles.selectedDurationContainer}>
                    <Text style={styles.selectedDurationText}>
                      {durationType.charAt(0).toUpperCase() +
                        durationType.slice(1)}{" "}
                      Duration: {duration}{" "}
                      {durationType === "monthly"
                        ? "months"
                        : durationType === "weekly"
                        ? "weeks"
                        : "days"}
                    </Text>
                  </View>
                )}
                <View style={styles.outputContainer}>
                  <View>
                    <Text
                      style={[
                        styles.outputLabel,
                        { color: COLORS.color_darkBlue },
                      ]}
                    >
                      {durationType.charAt(0).toUpperCase() +
                        durationType.slice(1)}{" "}
                      Payment of
                    </Text>

                    <Text
                      style={[
                        styles.outputText,
                        { color: COLORS.color_darkBlue },
                      ]}
                    >
                      ₦{taxedAmount_To_Pay}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.outputText,
                      { fontWeight: "500", fontSize: 15, marginTop: 20 },
                    ]}
                  >
                    Note: If you deposit ₦{taxedAmount_To_Pay} {durationType},
                    you will be able to meet up with your future target of ₦
                    {targetAmount} in {duration}{" "}
                    {durationType === "monthly"
                      ? "months"
                      : durationType === "weekly"
                      ? "weeks"
                      : "days"}
                  </Text>
                </View>
              </Animated.View>
            )}

            {showContinueButton && (
              <Animated.View
                style={{ opacity: continueButtonOpacity, width: "100%" }}
              >
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={alertNavigation}
                >
                  <Text style={styles.saveButtonText}>Continue</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>
                    Select {durationType} Duration
                  </Text>
                  {loading ? (
                    <ActivityIndicator
                      size="large"
                      color={COLORS.color_darkBlue}
                    />
                  ) : (
                    <ScrollView style={styles.modalOptionsContainer}>
                      {Array.from(
                        {
                          length:
                            durationType === "monthly"
                              ? 12
                              : durationType === "weekly"
                              ? 64
                              : 365,
                        },
                        (_, i) => i + 1
                      ).map((value) => (
                        <TouchableOpacity
                          key={value}
                          style={styles.modalOption}
                          onPress={() => handleDurationSelect(value)}
                        >
                          <Text style={styles.modalOptionText}>
                            {value}{" "}
                            {durationType === "monthly"
                              ? "months"
                              : durationType === "weekly"
                              ? "weeks"
                              : "days"}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.color_darkBlue,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.color_pink,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.blackTextColor,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  currencySymbol: {
    fontSize: 18,
    color: COLORS.blackTextColor,
  },
  input: {
    flex: 1,
    fontSize: 18,
    padding: 10,
  },
  confirmButton: {
    backgroundColor: COLORS.color_darkBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginLeft: 10,
  },
  confirmButtonText: {
    color: COLORS.whiteTextColor,
    fontSize: 16,
    fontWeight: "bold",
  },
  depositTypeContainer: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 3,
  },
  depositTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: COLORS.color_darkBlue,
    backgroundColor: COLORS.whiteTextColor,
    elevation: 10,
  },
  selectedDepositType: {
    backgroundColor: COLORS.color_darkBlue,
  },
  depositTypeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  selectedDurationContainer: {
    marginBottom: 20,
  },
  selectedDurationText: {
    fontSize: 17,
    fontWeight: "bold",
    // color: "red",
    textAlign: "center",
  },
  outputContainer: {
    backgroundColor: COLORS.whiteTextColor,
    borderWidth: 2,
    borderColor: COLORS.color_pink,
    elevation: 24,
    padding: 20,
    borderRadius: 10,
    marginBottom: 50,
  },
  outputLabel: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.blackTextColor,
    marginBottom: 5,
  },
  outputText: {
    fontSize: 25,
    fontWeight: "bold",
    color: COLORS.blackTextColor,
  },
  saveButton: {
    backgroundColor: COLORS.color_darkBlue,
    paddingVertical: 12,
    width: "100%",
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 20,
  },
  saveButtonText: {
    color: COLORS.whiteTextColor,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "40%",
    height: "60%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalOptionsContainer: {
    width: "100%",
  },
  modalOption: {
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
  modalOptionText: {
    fontSize: 16,
  },
});

export default SetTarget;
