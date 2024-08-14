// AccountDetails.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  BackHandler,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../Constant/Constant";

const banks = [
  "Access Bank",
  "GTBank",
  "First Bank",
  "Zenith Bank",
  "UBA",
  "FCMB",
  "Ecobank",
  "Sterling Bank",
  "Union Bank",
  "Wema Bank",
  "Opay",
];

const AccountDetails = () => {
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleProceed = () => {
    if (!bank || accountNumber.length !== 10 || !accountName) {
      alert("Please fill out all fields correctly");
      return;
    }
    setAlertModalVisible(true);
  };

  const handleBankSelect = (selectedBank) => {
    setBank(selectedBank);
    setModalVisible(false);
  };

  const handleAccountNameChange = (text) => {
    setAccountName(text);
    setShowNote(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Bank Name</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownText}>{bank || "Select a bank"}</Text>
        <FontAwesome name="angle-down" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.label}>Account Number</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter 10-digit account number"
        maxLength={10}
        value={accountNumber}
        onChangeText={setAccountNumber}
      />
      <Text style={styles.label}>Name on the Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter account name"
        value={accountName}
        onChangeText={handleAccountNameChange}
      />
      {showNote && (
        <Text style={styles.noteText}>
          Note: You can only drop a name that matches with the account name of
          your bank.
        </Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleProceed}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>

      {/* bank modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={{ flex: 1 }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalHeader}>Select Bank</Text>
              <FlatList
                data={banks}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => handleBankSelect(item)}
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Alert modal */}
      <Modal visible={alertModalVisible} transparent animationType="slide">
        <TouchableOpacity
          onPress={() => {
            setAlertModalVisible(false);
            navigation.navigate("Home");
          }}
          style={{ flex: 1 }}
        >
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modalContainer,
                { height: "40%", alignItems: "center" },
              ]}
            >
              <FontAwesome name="check-square-o" size={120} color="green" />
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>Success</Text>
              <Text style={{ fontSize: 18, textAlign: "center" }}>
                You will be credited within 24 hours
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  dropdownText: {
    fontSize: 16,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  noteText: {
    fontSize: 14,
    color: "red",
    marginBottom: 20,
  },
  button: {
    height: 50,
    backgroundColor: COLORS.color_darkBlue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
    // alignItems: "center",
    height: "70%",
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalItem: {
    padding: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  modalItemText: {
    fontSize: 16,
  },
});

export default AccountDetails;
