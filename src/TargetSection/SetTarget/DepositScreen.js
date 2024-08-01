import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const userId = 2;
const userEmail = "succhycomic45417@gmail.com";
const userName = "scah21145";

const UserDashboard = () => {
  const [accountDetails, setAccountDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const createVirtualAccount = async () => {
      try {
        const response = await axios.post('http://192.168.43.244:3099/api/create-virtual-account', {
          userId,
          userEmail,
          userName,
        });
        setAccountDetails(response.data);
      } catch (error) {
        console.error('Error creating virtual account', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    createVirtualAccount();
  }, []); // Empty dependency array to run only once on component mount

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {accountDetails ? (
        <>
          <Text style={styles.text}>Account Number: {accountDetails.accountNumber}</Text>
          <Text style={styles.text}>Bank Name: {accountDetails.bankName}</Text>
        </>
      ) : (
        <Text style={styles.text}>Failed to create virtual account.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    margin: 10,
  },
});

export default UserDashboard;
