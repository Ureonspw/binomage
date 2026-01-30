import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import DotsPattern from '../images/dots_pattern.png';
import WolfIcon from '../images/loup_garou.png';
import BinomageInfoTitle from '../images/binomage_info.svg';
import TerminerGraphic from '../images/TERMINER.svg';
import AcceuilButton from '../images/ACCEUIL_BUTTON.png';
import { playSound } from '../../services/soundService';

const { width, height } = Dimensions.get('window');

export default function EndBinomage({ route, navigation }) {
  const { speciality } = route.params || { speciality: 'INFO' }; 

  const handleAcceuil = () => {
    playSound('button');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Launcher' }],
    });
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

      {/* Wolf Icon (PNG - Just the icon) */}
      <View style={styles.wolfIconContainer}>
        <Image source={WolfIcon} style={styles.wolfImage} resizeMode="contain" />
      </View>

      {/* Title Card */}
      <View style={styles.titleCardContainer}>
        <BinomageInfoTitle width={width * 0.9} height={120} />
      </View>

      {/* Main Content - TERMINER */}
      <View style={styles.centerContainer}>
        <TerminerGraphic width={width * 0.8} height={150} />
      </View>

      {/* Acceuil Button (Smaller) */}
      <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={styles.buttonWrapper}
            onPress={handleAcceuil}
          >
            <Image source={AcceuilButton} style={styles.buttonImage} resizeMode="contain" />
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
    paddingTop: 80,
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
  wolfIconContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  wolfImage: {
    width: 100,
    height: 100,
  },
  titleCardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 40,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  bottomContainer: {
    width: '100%',
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    width: width * 0.7,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  }
});