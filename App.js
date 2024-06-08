import "react-native-gesture-handler";

import React from "react";
import {
  StyleShenativeet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SetTarget from "./src/SetTarget/SetTarget";
import { COLORS } from "./src/Constant/Constant";
import Home from "./src/Home/Home";
import DepositScreen from "./src/SetTarget/DepositScreen";
import Cashout from "./src/MyTarget/Cashout";
import Profile from "./src/Profile/Profile";
import AccountDetails from "./src/MyTarget/AccountDetails";
import TargetDetails from "./src/MyTarget/TargetDetails";
import LoginScreen from "./src/LoginSignUp/Login";
import SignupScreen from "./src/LoginSignUp/Signup";
import DataPlanCard from "./src/DataPlanCard/DataPlanCard";
import All_Target_History from "./src/MyTarget/All_Target_History";
import TargetHistory from "./src/MyTarget/TargetHistory";
import DataHistory from "./src/Home/DataHistory";
import ResetPassword from "./src/LoginSignUp/ResetPassword";

const Stack = createStackNavigator();
const App = () => {
  const userHasLoggedIn = false
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={COLORS.color_darkBlue}
          barStyle="white-content"
        />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={userHasLoggedIn? "Home": "LoginScreen"}
            screenOptions={{
              //animation:"slide",
              headerShown: true,
              headerStyle: {
                backgroundColor: COLORS.color_darkBlue, // Set the background color to primary
              },
              headerTintColor: COLORS.whiteTextColor, // Set the text color to your desired color

              lazy: true, // Enable lazy rendering
              //lazyPreloadDistance: 1000, // Set the preload distance to 500 pixels
              lazyPlaceholder: () => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
              ),
            }}
          >
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SetTarget"
              component={SetTarget}
              options={{ title: "Set Target" }}
            />
            <Stack.Screen
              name="DepositScreen"
              component={DepositScreen}
              options={{ title: "Deposit section" }}
            />
            <Stack.Screen
              name="TargetDetails"
              component={TargetDetails}
              options={{ title: "My Target" }}
            />
            <Stack.Screen
              name="All_Target_History"
              component={All_Target_History}
              options={{ title: "All target history" }}
            />
            <Stack.Screen
              name="TargetHistory"
              component={TargetHistory}
              options={{ title: "Target History" }}
            />
            <Stack.Screen
              name="Cashout"
              component={Cashout}
              options={{ title: "Cashout" }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ title: "Profile section" }}
            />
            <Stack.Screen
              name="AccountDetails"
              component={AccountDetails}
              options={{ title: "Account Details" }}
            />
            <Stack.Screen
              name="DataPlanCard"
              component={DataPlanCard}
              options={{ title: "Data Plan" }}
            />
            <Stack.Screen
              name="DataHistory"
              component={DataHistory}
              options={{ title: "Data History" }}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                title: "FoxThrift  Login",
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontSize: 24,
                  fontWeight: "bold",
                },
                headerLeft: null,
              }}
            />
            <Stack.Screen
              name="SignupScreen"
              component={SignupScreen}
              options={{
                title: "FoxThrift  Signup",
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontSize: 24,
                  fontWeight: "bold",
                },
                headerLeft: null,
              }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{
                title: "FoxThrift  ResetPassword",
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontSize: 24,
                  fontWeight: "bold",
                },
                headerLeft: null,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: 'center',
    backgroundColor: COLORS.whiteTextColor,
  },
});

export default App;
