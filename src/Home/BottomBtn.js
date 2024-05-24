import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Linking, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
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

    Linking.canOpenURL(whatsappUrl).then((supported) => {
      if (supported) {
        setModalVisible(false); // Close modal
        return Linking.openURL(whatsappUrl);
      } else {
        Alert.alert("WhatsApp is not installed on your device");
      }
    }).catch((err) => console.error("An error occurred", err));
  };

  const handleNavigate = (screen) => {
    setModalVisible(false); // Close modal
    navigation.navigate(screen);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.bottomBtnWrapper}>
        <TouchableOpacity style={styles.circleButton} onPress={toggleModal}>
          <MaterialIcons
            name={modalVisible ? "close" : "arrow-upward"}
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </View>

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
            <TouchableOpacity style={styles.optionButton} onPress={handleWhatsApp}>
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
            <TouchableOpacity style={styles.optionButton} onPress={() => handleNavigate('TargetHistory')}>
              <MaterialIcons
                name="history"
                size={30}
                color={COLORS.color_darkBlue}
              />
              <Text style={styles.optionText}>Target History</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color={COLORS.color_darkBlue}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleNavigate('LoginScreen')}>
              <MaterialIcons
                name="logout"
                size={30}
                color={COLORS.color_darkBlue}
              />
              <Text style={styles.optionText}>Logout</Text>
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
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 10,
   
  },
  bottomBtnWrapper: {
    width: "100%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
  },
  circleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.color_darkBlue,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -30,
    elevation: 25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    paddingHorizontal: 10,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 30,
    alignItems: "flex-start",
    paddingBottom: 30,
    marginBottom: 100,
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
