import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Linking,
  Alert,
} from "react-native";
import {
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { COLORS } from "../Constant/Constant";
import { useNavigation } from "@react-navigation/native";

const BottomBtn = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleWhatsApp = () => {
    const phoneNumber = "+2349015936616"; // WhatsApp phone number
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}`;

    Linking.canOpenURL(whatsappUrl)
      .then((supported) => {
        if (supported) {
          setModalVisible(false); // Close modal
          return Linking.openURL(whatsappUrl);
        } else {
          Alert.alert("WhatsApp is not installed on your device");
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  const handleNavigate = (screen) => {
    setModalVisible(false); // Close modal
    navigation.navigate(screen);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.sideButton}
        onPress={() => handleNavigate("DataPlanCard")}
      >
        <MaterialCommunityIcons
          name="access-point-network"
          size={28}
          color="black"
        />
        <Text style={styles.sideButtonText}>Cheap Data</Text>
      </TouchableOpacity>
      <View style={styles.bottomBtnWrapper}>
        <TouchableOpacity style={styles.circleButton} onPress={toggleModal}>
          <MaterialIcons
            name={modalVisible ? "close" : "arrow-upward"}
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.sideButton}
        onPress={() => handleNavigate("DataHistory")}
      >
        <MaterialCommunityIcons name="timer-sand" size={28} color="black" />
        <Text style={styles.sideButtonText}>Data History</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleWhatsApp}
            >
              <MaterialIcons
                name="message"
                size={30}
                color={COLORS.color_darkBlue}
              />
              <Text style={styles.optionText}>Join Us on WhatsApp</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color={COLORS.color_darkBlue}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleNavigate("All_Target_History")}
            >
              <MaterialIcons
                name="history"
                size={30}
                color={COLORS.color_darkBlue}
              />
              <Text style={styles.optionText}>All target History</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color={COLORS.color_darkBlue}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleNavigate("LoginScreen")}
            >
              <MaterialIcons
                name="logout"
                size={30}
                color="red"
              />
              <Text style={[styles.optionText, {color: "red"}]}>Logout</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color={COLORS.color_darkBlue}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 10,
    elevation: 24,
    borderTopWidth: 0.5,
    borderColor: "lightgray",
  },
  bottomBtnWrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 3,
    borderRadius: 32,
    elevation: 24,

    marginBottom: 0,
  },
  circleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.color_darkBlue,
    justifyContent: "center",
    alignItems: "center",
    // elevation: 10,
  },
  sideButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: COLORS.color_darkBlue,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  sideButtonText: {
    color: "black",
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    paddingHorizontal: 10,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 30,
    alignItems: "flex-start",
    paddingBottom: 30,
    marginBottom: 100,
    elevation: 24,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
  },
  optionText: {
    marginLeft: 10,
    fontSize: 18,
    color: COLORS.color_darkBlue,
    flex: 1,
  },
});

export default BottomBtn;
