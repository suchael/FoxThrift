import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { FontAwesome5, MaterialIcons } from "@expo/vector-icons"; // Import FontAwesome5 for icons
import { COLORS } from "../Constant/Constant";

const Profile = () => {
  const navigation = useNavigation();

  const handleWhatsAppContact = () => {
    // Logic for contacting via WhatsApp
  };

  const handleLogout = () => {
    navigation.navigate("LoginScreen")
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileInfo}>
        <FontAwesome5
          name="user-circle"
          size={100}
          color="#333"
          style={styles.icon}
        />
        <Text style={styles.name}>Sanni Abdulsalam</Text>
        <Text style={styles.email}>sanni.abdulsalam@example.com</Text>
      </View>
      <TouchableOpacity
        style={styles.whatsappButton}
        onPress={handleWhatsAppContact}
      >
        <FontAwesome5
          name="whatsapp"
          size={24}
          color="#fff"
          style={styles.whatsappIcon}
        />
        <Text style={styles.whatsappText}>Contact Us via WhatsApp</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.whatsappButton, {backgroundColor: COLORS.color_darkBlue}]}
        onPress={handleWhatsAppContact}
      >
        <FontAwesome5
          name="history"
          size={24}
          color="#fff"
          style={styles.whatsappIcon}
        />
        <Text style={styles.whatsappText}>Target History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 30,
  },
  icon: {
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  whatsappButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#25D366",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20,
  },
  whatsappIcon: {
    marginRight: 10,
  },
  whatsappText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#FF4500",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
