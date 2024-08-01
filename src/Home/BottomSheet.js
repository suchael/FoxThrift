import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import BottomSheetTop from "./BottomSheetTop";
import { COLORS } from "../Constant/Constant";

const DummyData = [
  {
    id: 1,
    icon: "payment",
    amount: "₦ 6000",
    week: "Week 1",
    date: "Wednesday, 2nd Oct, 2024",
    status: "paid",
  },
  {
    id: 2,
    icon: "payment",
    amount: "₦ 6000",
    week: "Week 2",
    date: "Thursday, 3rd Oct, 2024",
    status: "pending",
  },
  {
    id: 3,
    icon: "payment",
    amount: "₦ 6000",
    week: "Week 3",
    date: "Friday, 4th Oct, 2024",
    status: "paid",
  },
  {
    id: 4,
    icon: "payment",
    amount: "₦ 6000",
    week: "Week 4",
    date: "Saturday, 5th Oct, 2024",
    status: "paid",
  },
  {
    id: 5,
    icon: "payment",
    amount: "₦ 6000",
    week: "Week 5",
    date: "Sunday, 6th Oct, 2024",
    status: "missed",
  },
  {
    id: 6,
    icon: "payment",
    amount: "₦ 6000",
    week: "Week 6",
    date: "Monday, 7th Oct, 2024",
    status: "paid",
  },
  // Add more dummy data as needed
];

const HistoryItem = ({ icon, amount, week, date, status, onPress }) => {
  const statusColor =
    status === "paid" ? "green" : status === "pending" ? "orange" : "red";

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onPress({ amount, week, date, status })}
    >
      <View
        style={[styles.iconWrapper, { backgroundColor: COLORS.color_blue }]}
      >
        <MaterialIcons name={icon} size={24} color={COLORS.whiteTextColor} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.amount}>{amount}</Text>
        <Text style={styles.week}>{week}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={{ color: statusColor, fontWeight: "bold", fontSize: 15 }}>{status}</Text>
      </View>
      <MaterialIcons
        name="keyboard-arrow-right"
        size={24}
        color="black"
        style={styles.rightIcon}
      />
    </TouchableOpacity>
  );
};

const PaymentModal = ({ visible, onClose, paymentDetails }) => {
  if (!visible || !paymentDetails) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Payment Details</Text>
            <Text style ={styles.dataHead}>Week: {paymentDetails.week}</Text>
            <Text style ={styles.dataHead}>Date: {paymentDetails.date}</Text>
            <Text style ={styles.dataHead}>Amount: {paymentDetails.amount}</Text>
            <Text style ={styles.dataHead}>Status: {paymentDetails.status}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const BottomSheet = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePaymentPress = (payment) => {
    setSelectedPayment(payment);
    setModalVisible(true);
  };

  const percentageProgress = "80"; // 50%
  return (
    <View style={styles.container}>
      <BottomSheetTop progress={percentageProgress}/>
      <View style={styles.bottomSheetWrapper}>
        <View style={styles.historyWrapper}>
          <View>
            <Text style={styles.history}>Type: Weekly payment</Text>
            <Text style={styles.history}>Amount: ₦ 50,000</Text>
          </View>
          <AntDesign name="barschart" size={26} color="black" />
        </View>
        {DummyData.map((item) => (
          <HistoryItem
            key={item.id}
            icon={item.icon}
            amount={item.amount}
            week={item.week}
            date={item.date}
            status={item.status}
            onPress={handlePaymentPress}
          />
        ))}
      </View>
      <PaymentModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        paymentDetails={selectedPayment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.color_darkBlue,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    elevation: 10,
    shadowColor: "black",
    marginTop: 15,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  bottomSheetWrapper: {
    backgroundColor: "white",
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 50,
    width: 50,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  week: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#888",
  },
  historyWrapper: {
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  history: {
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 5,
  },
  date: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#888",
  },
  rightIcon: {
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dataHead: {
    fontSize: 18,
    fontWeight: "500",
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.color_blue,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: COLORS.whiteTextColor,
    fontWeight: "bold",
  },
});

export default BottomSheet;
