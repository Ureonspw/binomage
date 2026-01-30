import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image, Text } from 'react-native';
import DotsPattern from '../images/dots_pattern.png';
import LesBinomesSontTitle from '../images/lesbinomesont_icon.svg';
import ContainerFrame from '../images/CONTAINERIMAGEBINOMAGEICON.svg';
import ContinuerButton from '../images/continuerboutton.svg';
import { playSound } from '../../services/soundService';

const { width, height } = Dimensions.get('window');

export default function ResultatBinomage({ route, navigation }) {
  const { pairing, pairings, currentIndex, speciality } = route.params; 

  const handleContinue = () => {
    playSound('button');
    if (currentIndex + 1 < pairings.length) {
      navigation.navigate('RandomBinomage', {
        speciality,
        existingPairings: pairings,
        currentIndex: currentIndex + 1
      });
    } else {
      navigation.navigate('EndBinomage', { speciality });
    }
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

      {/* Speciality Text Label */}
      <View style={styles.specialityLabelContainer}>
        <Text style={styles.specialityText}>{speciality}</Text>
      </View>

      {/* Title Card */}
      <View style={styles.titleCardContainer}>
        <LesBinomesSontTitle width={width * 0.8} height={80} />
      </View>

      {/* Results Area */}
      <View style={styles.resultsWrapper}>
          {/* Parrain */}
          <View style={styles.participantSection}>
            <View style={styles.frameContainer}>
              <ContainerFrame width={width * 0.6} height={width * 0.6} />
              {pairing?.parrain?.imageUri && (
                 <View style={styles.imageOverlay}>
                    <Image source={{ uri: pairing.parrain.imageUri }} style={styles.previewImage} resizeMode="cover" />
                 </View>
              )}
            </View>
            <Text style={styles.participantName}>{pairing?.parrain?.name} (PARRAIN)</Text>
          </View>

          {/* Filleul */}
          <View style={styles.participantSection}>
            <View style={styles.frameContainer}>
              <ContainerFrame width={width * 0.6} height={width * 0.6} />
              {pairing?.filleul?.imageUri && (
                 <View style={styles.imageOverlay}>
                    <Image source={{ uri: pairing.filleul.imageUri }} style={styles.previewImage} resizeMode="cover" />
                 </View>
              )}
            </View>
            <Text style={styles.participantName}>{pairing?.filleul?.name} (FILLEUL)</Text>
          </View>
      </View>

      {/* Continuer Button at Bottom */}
      <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={styles.continuerButtonWrapper}
            onPress={handleContinue}
          >
            <ContinuerButton width={width * 0.7} height={70} preserveAspectRatio="xMidYMid meet" />
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
  specialityLabelContainer: {
    width: width * 0.85,
    alignItems: 'flex-end',
    marginBottom: -15,
    zIndex: 10,
    marginTop: 20,
  },
  specialityText: {
    fontFamily: 'Jersey25',
    fontSize: 28,
    color: '#B22222',
  },
  titleCardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  resultsWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around', // Distribute space between sections
    paddingVertical: 10,
  },
  imageOverlay: {
    position: 'absolute',
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  participantSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  frameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  participantName: {
    fontFamily: 'Jersey25',
    fontSize: 22,
    color: '#B22222',
    marginTop: -20,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bottomContainer: {
    width: '100%',
    paddingBottom: 30,
    alignItems: 'center',
  },
  continuerButtonWrapper: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  }
});