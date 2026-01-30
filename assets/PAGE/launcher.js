import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import TitreSplashScreen from '../images/titresplashscreen.png';
import Year2026 from '../images/2026.svg';
import StartButton from '../images/Boutton_Commencer.svg';
import DotsPattern from '../images/dots_pattern.png';
import { playSound } from '../../services/soundService';

const { width, height } = Dimensions.get('window');

export default function Launcher({ navigation }) {
  const handlePress = async () => {
    await playSound('splash');
    navigation.navigate('SelectionBinomage');
  };

  return (
    <View style={styles.container}>
      {/* Background Decorations */}
      <Image 
        source={DotsPattern} 
        style={[styles.dots, styles.dotsTopLeft]} 
        resizeMode="contain" 
      />
      <Image 
        source={DotsPattern} 
        style={[styles.dots, styles.dotsBottomRight]} 
        resizeMode="contain" 
      />

      {/* Main Card (Title) */}
      <View style={styles.cardContainer}>
        <Image 
          source={TitreSplashScreen} 
          style={styles.mainTitleImage} 
          resizeMode="contain" 
        />
      </View>

      {/* Year */}
      <View style={styles.yearContainer}>
        <Year2026 width={width * 0.5} height={100} />
      </View>

      {/* Bottom Section (Start Button) */}
      <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={styles.buttonWrapper}
            onPress={handlePress}
          >
              <StartButton 
                width={width * 0.95} 
                height={120} 
                preserveAspectRatio="xMidYMid meet" 
              />
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#89CFF0',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 100,
  },
  dots: {
    position: 'absolute',
    width: 600,
    height: 600,
    opacity: 0.5,
  },
  dotsTopLeft: {
    top: -100,
    left: -100,
    transform: [{ rotate: '-200.84deg' }],
  },
  dotsBottomRight: {
    bottom: -100,
    right: -120,
    transform: [{ rotate: '-50deg' }],
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
    zIndex: 5,
  },
  mainTitleImage: {
    width: width * 0.9,
    height: 300, 
  },
  yearContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    width: width,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
