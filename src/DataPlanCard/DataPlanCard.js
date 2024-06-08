import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../Constant/Constant";
import { useNavigation } from "@react-navigation/native";
import { Network_bundle } from "./Network_bundle";

const DataPlanCard = () => {
  const [networkModalVisible, setNetworkModalVisible] = useState(false);
  const [planModalVisible, setPlanModalVisible] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("MTN");
  const [selectedPlan, setSelectedPlan] = useState("Select Plan");
  const [planBundle, setPlanBundle] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));

  const navigation = useNavigation();

  const networks = ["MTN", "GLO", "Airtel", "9mobile"];
  const plans = ["Daily Plan", "Weekly Plan", "Monthly Plan"];

  const toggleModal = (modalSetter) => {
    modalSetter((prev) => !prev);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleNavigate = (screen) => {
    setNetworkModalVisible(false);
    setPlanModalVisible(false);
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Buy Data Plan</Text>

        <Text style={styles.label}>Select Network</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => toggleModal(setNetworkModalVisible)}
        >
          <Text style={styles.dropdownText}>{selectedNetwork}</Text>
          <FontAwesome name="angle-down" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.label}>Select Plan</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => toggleModal(setPlanModalVisible)}
        >
          <Text style={styles.dropdownText}>
            {planBundle.length != 0 ? planBundle : "Select plan"}
          </Text>
          <FontAwesome name="angle-down" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.label}>Mobile Number to be credited</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g 08100233456"
          keyboardType="numeric"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />

        <TouchableOpacity
          style={styles.proceedButton}
          onPress={() => handleNavigate("DataPlanCard")}
        >
          <Text style={styles.proceedButtonText}>Proceed</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={networkModalVisible}
        onRequestClose={() => setNetworkModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setNetworkModalVisible(false)}
          activeOpacity={1}
        >
          <Animated.View
            style={[
              styles.modalContent,
              { opacity: fadeAnim },
              { padding: 20 },
            ]}
          >
            <Text style={styles.modalHeader}>Select Network</Text>
            <ScrollView>
              {networks.map((network, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedNetwork(network);
                    setNetworkModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      { color: "black", fontWeight: "bold" },
                    ]}
                  >
                    {network}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={planModalVisible}
        onRequestClose={() => setPlanModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setPlanModalVisible(false)}
          activeOpacity={1}
        >
          <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
            <TouchableWithoutFeedback
              style={{ padding: 20 }}
              onPress={() => setPlanModalVisible(true)}
            >
              <View style={{paddingBottom: 50}}>
                <Text style={[styles.modalHeader, { textAlign: "center" }]}>
                  Available Plans
                </Text>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                  {Object.keys(Network_bundle).map((network, networkIndex) => (
                    <View key={networkIndex}>
                      <Text
                        style={[
                          styles.modalHeader,
                          { textAlign: "center", marginVertical: 10 },
                        ]}
                      >
                        {network} Plans
                      </Text>
                      {Object.values(Network_bundle[network])
                        .flat()
                        .map((item, itemIndex) => (
                          <TouchableOpacity
                            key={itemIndex}
                            style={styles.planList}
                            onPress={() => {
                              setPlanModalVisible(false);
                              setPlanBundle(item);
                            }}
                          >
                            <Text style={styles.planText}>{item}</Text>
                          </TouchableOpacity>
                        ))}
                    </View>
                  ))}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.whiteTextColor,
    paddingBottom: 10,
  },
  scrollViewContent: {
    paddingHorizontal: 10,
    // backgroundColor: "red",
    // flexGrow: 1,
    paddingBottom: 10,
  },
  card: {
    width: "90%",
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "lightgray",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
    // alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.color_darkBlue,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    borderRadius: 8,
    elevation: 10,
    borderWidth: 2,
    backgroundColor: "white",
    borderColor: "lightgray",
    marginTop: 3,
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    elevation: 10,
    backgroundColor: "white",
    borderColor: "lightgray",
    marginTop: 3,
    marginBottom: 15,
    fontSize: 16,
    color: "black",
  },
  proceedButton: {
    width: "100%",
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: COLORS.color_darkBlue,
    marginTop: 20,
    elevation: 24,
    alignItems: "center",
  },
  proceedButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    maxHeight: "65%",
    backgroundColor: "white",
    overflow: "hidden",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.color_darkBlue,
  },
  modalItem: {
    paddingVertical: 15,
  },
  planBtn: {
    paddingVertical: 10,
    marginTop: 2,
  },
  planList: {
    backgroundColor: "lightgray",
    elevation: 10,
    marginBottom: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
  planText: {
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center",
  },
  modalItemText: {
    fontSize: 18,
    color: COLORS.color_darkBlue,
  },
});

export default DataPlanCard;
