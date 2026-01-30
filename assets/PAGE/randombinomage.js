import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image, Text, Animated, Easing, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import DotsPattern from '../images/dots_pattern.png';
import WolfIcon from '../images/loup_garou.png';
import LesBinomesSontTitle from '../images/lesbinomesont_icon.svg';
import LoopCircleIcon from '../images/boucle_cercle_icon.svg';
import { getParticipants } from '../../services/database';
import { generatePairings } from '../../utils/pairing';
import { playSuspenseSound, stopSound } from '../../services/soundService';

const { width, height } = Dimensions.get('window');

export default function RandomBinomage({ route, navigation }) {
  const params = route.params || {};
  const speciality = params.speciality || 'INFO';
  const currentIndex = params.currentIndex || 0;
  
  const [pairings, setPairings] = useState(params.existingPairings || []);
  const [isLoading, setIsLoading] = useState(!params.existingPairings);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Sync state with params if they change (e.g. when coming back for next index)
  useEffect(() => {
    if (params.existingPairings) {
      setPairings(params.existingPairings);
      setIsLoading(false);
    }
  }, [params.existingPairings]);

  // Initial fetch
  useEffect(() => {
    if (!params.existingPairings) {
      const init = async () => {
        console.log(`[RandomBinomage] Initializing for ${speciality}`);
        try {
          const parrains = await getParticipants(speciality, 'PARRAIN');
          const filleuls = await getParticipants(speciality, 'FILLEUL');
          console.log(`[RandomBinomage] Loaded: ${parrains.length} parrains, ${filleuls.length} filleuls`);
          
          if (parrains.length === 0 || filleuls.length === 0) {
            console.log("[RandomBinomage] Not enough participants");
            setPairings([]);
            setIsLoading(false);
            return;
          }

          const generated = generatePairings(parrains, filleuls);
          console.log(`[RandomBinomage] Generated ${generated.length} pairings`);
          setPairings(generated);
          setIsLoading(false);
        } catch (error) {
          console.error("[RandomBinomage] Init error:", error);
          setIsLoading(false);
        }
      };
      init();
    }
  }, [speciality, params.existingPairings]);

  // Animation and Delay Logic
  useFocusEffect(
    useCallback(() => {
      console.log(`[RandomBinomage] Screen Focused. Index: ${currentIndex}, Pairings: ${pairings.length}`);
      
      let timer;
      if (!isLoading) {
        if (pairings.length > 0 && currentIndex < pairings.length) {
          console.log("[RandomBinomage] Starting animation and timer");
          
          // Play Random Suspense Sound
          playSuspenseSound();

          // Reset and Start rotation
          rotateAnim.setValue(0);
          Animated.loop(
            Animated.timing(rotateAnim, {
              toValue: 1,
              duration: 2000,
              easing: Easing.linear,
              useNativeDriver: false,
            })
          ).start();

          // Random timer between 6 and 15 seconds
          const randomDelay = Math.floor(Math.random() * (15000 - 6000 + 1)) + 6000;
          console.log(`[RandomBinomage] Result in ${randomDelay / 1000}s`);

          timer = setTimeout(() => {
            console.log("[RandomBinomage] Navigating to ResultatBinomage");
            stopSound(); // Stop suspense sound before transition
            navigation.navigate('ResultatBinomage', {
              pairing: pairings[currentIndex],
              pairings: pairings,
              currentIndex: currentIndex,
              speciality: speciality
            });
          }, randomDelay);

        } else if (pairings.length === 0) {
          console.log("[RandomBinomage] Empty pairings alert");
          Alert.alert(
            "Oups", 
            "Il n'y a pas assez de participants (Parrains et Filleuls) pour cette spécialité.",
            [{ text: "OK", onPress: () => navigation.goBack() }]
          );
        }
      }

      return () => {
        console.log("[RandomBinomage] Screen Blurred / Cleanup");
        if (timer) clearTimeout(timer);
        rotateAnim.stopAnimation();
        stopSound(); // Ensure sound stops if user leaves screen
      };
    }, [pairings, currentIndex, speciality, isLoading])
  );

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#B22222" />
      </View>
    );
  }

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

      {/* Speciality Text Label */}
      <View style={styles.specialityLabelContainer}>
        <Text style={styles.specialityText}>{speciality}</Text>
      </View>

      {/* Title Card */}
      <View style={styles.titleCardContainer}>
        <LesBinomesSontTitle width={width * 0.9} height={120} />
      </View>

      {/* Repetition Circle Icon (Perfectly Centered Animation) */}
      <View style={styles.centerContainer}>
        <View style={styles.rotationWrapper}>
          <Animated.View style={[styles.animatedContainer, { transform: [{ rotate: rotation }] }]}>
            <LoopCircleIcon width={320} height={320} />
          </Animated.View>
        </View>
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
  specialityLabelContainer: {
    width: width * 0.85,
    alignItems: 'flex-end',
    marginBottom: -20,
    zIndex: 10,
  },
  specialityText: {
    fontFamily: 'Jersey25',
    fontSize: 36,
    color: '#B22222',
  },
  titleCardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 0,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: -40, // Adjust to balance with the title above
  },
  rotationWrapper: {
    width: 320,
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(255,0,0,0.1)', // Debug: uncomment to see the box
  },
  animatedContainer: {
    width: 320,
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loopButton: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});