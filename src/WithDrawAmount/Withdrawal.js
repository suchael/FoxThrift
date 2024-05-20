import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Modal, FlatList } from 'react-native';
import { COLORS } from '../Constant/Constant';

const Withdrawal = () => {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const banks = [
    'Wema Bank', 'UBA', 'GT Bank', 'Opay', 'Palmpay', 'Moniepoint'
  ];

  const handleWithdrawal = () => {
    if (!bankName || !accountNumber || !accountName || !withdrawalAmount) {
      Alert.alert('Incomplete Form', 'Please fill out all fields.');
      return;
    }
    // Perform withdrawal logic here, e.g., call an API
    Alert.alert('Withdrawal Submitted', 'Your withdrawal request has been submitted successfully.');
    // Reset form fields after submission
    setBankName('');
    setAccountNumber('');
    setAccountName('');
    setWithdrawalAmount('');
  };

  const renderBankItem = ({ item }) => (
    <TouchableOpacity style={styles.bankItem} onPress={() => { setBankName(item); setModalVisible(false); }}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Withdrawal Form</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bank Name</Text>
        <TouchableOpacity style={styles.bankInput} onPress={() => setModalVisible(true)}>
          <Text>{bankName || 'Select Bank'}</Text>
        </TouchableOpacity>
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={banks}
                renderItem={renderBankItem}
                keyExtractor={(item) => item}
              />
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Account Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Account Number"
          keyboardType="numeric"
          value={accountNumber}
          onChangeText={setAccountNumber}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name on the Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Account Name"
          value={accountName}
          onChangeText={setAccountName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Amount to Withdraw</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.nairaSymbol}>₦</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="Enter Amount"
            keyboardType="numeric"
            value={withdrawalAmount}
            onChangeText={setWithdrawalAmount}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleWithdrawal}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  bankInput: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    maxHeight: 300,
    width: '80%',
  },
  bankItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    padding: 10,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    padding: 10,
  },
  nairaSymbol: {
    fontSize: 18,
    marginRight: 5,
  },
  amountInput: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: COLORS.color_darkBlue, // Updated to color_darkBlue
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Withdrawal;
