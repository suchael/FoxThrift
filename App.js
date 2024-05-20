import "react-native-gesture-handler";

import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SetTarget from "./src/SetTarget/SetTarget";
import { COLORS } from "./src/Constant/Constant";
import Home from "./src/Home/Home";
import DepositScreen from "./src/SetTarget/DepositScreen";
import Withdrawal from "./src/WithDrawAmount/Withdrawal";
import Profile from "./src/Profile/Profile";

const Stack = createStackNavigator();
const App = () => {
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
            initialRouteName="Home"
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
              name="Withdrawal"
              component={Withdrawal}
              options={{ title: "Withdrawal section" }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ title: "Profile section" }}
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
