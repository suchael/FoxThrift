import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import MTN from '../../assets/NetworkLogo/MTN.jpg'; // Replace with the correct path
import placeholder from '../../assets/NetworkLogo/MTN.jpg'; // Placeholder image
import GLO from '../../assets/NetworkLogo/GLO.png'; // Placeholder image
import AIRTEL from '../../assets/NetworkLogo/AIRTEL.jpeg'; // Placeholder image
import ETISALAT from '../../assets/NetworkLogo/ETISALAT.png'; // Placeholder image

// Placeholder paths for other logos
// import GLO from '../NetworkLogo/GLO.jpg';
// import AIRTEL from '../NetworkLogo/AIRTEL.jpg';
// import ETISALAT from '../NetworkLogo/ETISALAT.jpg';

const dataHistory = [
  {
    network: 'MTN',
    plan: '1GB',
    cost: '₦1,000',
    time: 'Feb 12th, 2024, 10:00 AM',
  },
  {
    network: 'ETISALAT',
    plan: '2GB',
    cost: '₦1,500',
    time: 'Feb 13th, 2024, 11:00 AM',
  },
  {
    network: 'AIRTEL',
    plan: '2GB',
    cost: '₦1,500',
    time: 'Feb 13th, 2024, 11:00 AM',
  },
  {
    network: 'GLO',
    plan: '2GB',
    cost: '₦1,500',
    time: 'Feb 13th, 2024, 11:00 AM',
  },
];

const getNetworkLogo = (network) => {
  switch (network) {
    case 'MTN':
      return MTN;
    case 'GLO':
      return GLO; // Replace with GLO when available
    case 'AIRTEL':
      return AIRTEL; // Replace with AIRTEL when available
    case 'ETISALAT':
      return ETISALAT; // Replace with ETISALAT when available
    default:
      return placeholder;
  }
};

const DataHistory = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {dataHistory.map((data, index) => (
        <View key={index} style={styles.historyCard}>
          <Image source={getNetworkLogo(data.network)} style={styles.logo} />
          <View style={styles.details}>
            <Text style={styles.networkName}>{data.network}</Text>
            <Text style={styles.dataPlan}>{data.plan}</Text>
            <Text style={styles.cost}>Cost: {data.cost}</Text>
            <Text style={styles.time}>{data.time}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  networkName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dataPlan: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#555',
    marginVertical: 2,
  },
  cost: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#555',
  },
  time: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default DataHistory;
