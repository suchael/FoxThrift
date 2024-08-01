import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import WebView from "react-native-webview";

const PaymentWebView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { fullName, userEmail, targetAmount, durationType, periodicAmount } =
    route.params;

  console.log("route: ", route);
  const contractCode = "4558828096";
  const apiKey = "MK_TEST_CN727JQ2ZG";

  const htmlContent = `
    <html>
    <head>

        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        button {
            background-color: #004E89; /* Green */
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            border-radius: 12px;
            transition: background-color 0.3s ease;
        }
        button:hover {
            background-color: "#004E89";
        }
    </style>
        <script type="text/javascript" src="https://sdk.monnify.com/plugin/monnify.js"></script>
        <script>
            function payWithMonnify() {
                MonnifySDK.initialize({
                    amount: "${periodicAmount}",
                    currency: "NGN",
                    reference: new String((new Date()).getTime()),
                    customerFullName: "${fullName}",
                    customerEmail: "${userEmail}",
                    apiKey: "${apiKey}",
                    contractCode: "${contractCode}",
                    paymentDescription: "Payment for VTU databundle",
                    metadata: {
                        "name": "Damilare",
                        "age": 45
                    },
                    
                    onLoadStart: () => {
                        console.log("loading has started");
                    },
                    onLoadComplete: () => {
                        console.log("SDK is UP");
                    },
                    onComplete: function(response) {
                        console.log("Payment completed:", response);
                    },
                    onClose: function(data) {
                        console.log("Payment closed:", data);
                    }
                });
            }
        </script>
    </head>
    <body>
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
            <button type="button" onclick="payWithMonnify()">Pay With Monnify</button>
        </div>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: htmlContent }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PaymentWebView;
