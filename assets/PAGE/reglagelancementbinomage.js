import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image, Text } from 'react-native';
import DotsPattern from '../images/dots_pattern.png';
import WolfIcon from '../images/loup_garou.png';
import ReglageTitle from '../images/reglagebinomage_boutton.svg';
import SpecialiteLabel from '../images/SPECIALITE.svg';
import StartButton from '../images/commencer_boutton.svg';
import BackButton from '../images/button_retour.svg';
import { playSound } from '../../services/soundService';

const { width, height } = Dimensions.get('window');

export default function ReglageLancementBinomage({ navigation }) {
  const [speciality, setSpeciality] = useState('INFO');

  const handleBack = () => {
    playSound('button');
    navigation.goBack();
  };

  const handleStart = () => {
    playSound('button');
    navigation.navigate('RandomBinomage', { speciality });
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

      {/* Back Button (Top Right) */}
      <TouchableOpacity 
        style={styles.backButtonContainer}
        onPress={handleBack}
      >
        <BackButton width={40} height={40} />
      </TouchableOpacity>

      {/* Wolf Icon (PNG - Just the icon) */}
      <View style={styles.wolfIconContainer}>
        <Image source={WolfIcon} style={styles.wolfImage} resizeMode="contain" />
      </View>

      {/* Title Card */}
      <View style={styles.titleCardContainer}>
        <ReglageTitle width={width * 0.9} height={120} />
      </View>

      {/* Speciality Selection (Combobox style) */}
      <View style={styles.specialityContainer}>
        <View style={styles.labelWrapper}>
            <SpecialiteLabel width={100} height={40} />
        </View>
        
        <View style={styles.dropdown}>
          <TouchableOpacity 
            style={[styles.dropdownOption, speciality === 'INFO' && styles.selectedOption]} 
            onPress={() => { playSound('button'); setSpeciality('INFO'); }}
          >
             <Text style={[styles.dropdownText, speciality === 'INFO' && styles.selectedText]}>INFO</Text>
          </TouchableOpacity>
          
          <View style={styles.verticalDivider} />
          
          <TouchableOpacity 
            style={[styles.dropdownOption, speciality === 'EIT' && styles.selectedOption]} 
            onPress={() => { playSound('button'); setSpeciality('EIT'); }}
          >
             <Text style={[styles.dropdownText, speciality === 'EIT' && styles.selectedText]}>EIT</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Start Button */}
      <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={styles.startButtonWrapper}
            onPress={handleStart}
          >
            <StartButton width={width * 0.6} height={60} preserveAspectRatio="xMidYMid meet" />
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
    right: 20,
    zIndex: 10,
  },
  wolfIconContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 5,
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
  specialityContainer: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  labelWrapper: {
    marginBottom: 10,
  },
  dropdown: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownOption: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOption: {
    backgroundColor: '#f8f8f8', // Subtle highlight for selected
  },
  verticalDivider: {
    width: 1,
    height: '60%',
    backgroundColor: '#eee',
  },
  dropdownText: {
    fontFamily: 'Jersey25',
    fontSize: 28,
    color: '#ccc', // Gray for unselected
  },
  selectedText: {
    color: '#B22222', // Red for selected
  },
  bottomContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  startButtonWrapper: {
    width: width,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
