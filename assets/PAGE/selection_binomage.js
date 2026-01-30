import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import DotsPattern from '../images/dots_pattern.png';
import BackButton from '../images/button_retour.svg';
import TitleCard from '../images/selectionner_1.svg';
import BinomageButton from '../images/binomage_boutton.png';
import AjoutButton from '../images/ajout_boutton.png';
import { playSound } from '../../services/soundService';

const { width, height } = Dimensions.get('window');

export default function SelectionBinomage({ navigation }) {
  const handleBack = () => {
    playSound('button');
    navigation.goBack();
  };

  const handleNavigate = (screen) => {
    playSound('button');
    navigation.navigate(screen);
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

      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButtonContainer}
        onPress={handleBack}
      >
        <BackButton width={40} height={40} />
      </TouchableOpacity>

      {/* Title Card */}
      <View style={styles.titleCardContainer}>
        <TitleCard width={width * 0.9} height={150} />
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonsWrapper}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleNavigate('ReglageLancementBinomage')}
        >
          <Image source={BinomageButton} style={styles.buttonImage} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleNavigate('ReglageAjoutBinomage')}
        >
          <Image source={AjoutButton} style={styles.buttonImage} resizeMode="contain" />
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
    paddingTop: 60,
  },
  dots: {
    position: 'absolute',
    width: 500,
    height: 500,
    opacity: 0.5,
  },
  dotsTopLeft: {
    top: -80,
    left: -80,
    transform: [{ rotate: '-200.84deg' }],
  },
  dotsBottomRight: {
    bottom: -80,
    right: -100,
    transform: [{ rotate: '-50deg' }],
  },
  backButtonContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
  },
  titleCardContainer: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonsWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    width: width,
    height: 120,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
});