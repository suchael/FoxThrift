import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../Constant/Constant';

const { height } = Dimensions.get('window');

const Home = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.color_darkBlue, '#FFFFFF']}
        style={styles.gradient}
      >
        <Animatable.View animation="zoomIn" duration={2000} style={styles.logoContainer}>
          <Image
            source={require("../../assets/FoxThriftLogo.jpg")}
            style={styles.logo}
          />
        </Animatable.View>
        <Animatable.Text animation="fadeInUp" delay={2000} duration={1500} style={styles.appName}>
          FoxThrift
        </Animatable.Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,  // Adjust as necessary
    height: 150, // Adjust as necessary
    borderRadius: 75,
    resizeMode: 'contain', // Ensures the logo is not distorted
  },
  appName: {
    fontSize: 32, // Large font size for visibility
    fontWeight: 'bold',
    color: 'black', // Dark color for contrast on white background
    marginTop: 20, // Space between logo and text
  },
});

export default Home;
