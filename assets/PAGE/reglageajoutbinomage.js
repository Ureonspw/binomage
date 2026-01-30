import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import DotsPattern from '../images/dots_pattern.png';
import WolfIcon from '../images/loup_garou.png';
import ReglageTitle from '../images/reglagebinomage_boutton.svg';
import SpecialiteLabel from '../images/SPECIALITE.svg';
import AjoutButton from '../images/AJOUT_BUTTON.svg';
import BackButton from '../images/button_retour.svg';
import { getParticipants } from '../../services/database';
import { playSound } from '../../services/soundService';

const { width, height } = Dimensions.get('window');

export default function ReglageAjoutBinomage({ navigation }) {
  const [speciality, setSpeciality] = useState('INFO');
  const [parrains, setParrains] = useState([]);
  const [filleuls, setFilleuls] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const pList = await getParticipants(speciality, 'PARRAIN');
      const fList = await getParticipants(speciality, 'FILLEUL');
      setParrains(pList);
      setFilleuls(fList);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  }, [speciality]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const handleBack = () => {
    playSound('button');
    navigation.goBack();
  };

  const handleSelectSpeciality = (spec) => {
    playSound('button');
    setSpeciality(spec);
  };

  const handleAjout = () => {
    playSound('button');
    navigation.navigate('AjoutPersonneBinomage', { speciality });
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

      {/* Wolf Icon */}
      <View style={styles.wolfIconContainer}>
        <Image source={WolfIcon} style={styles.wolfImage} resizeMode="contain" />
      </View>

      {/* Title Card */}
      <View style={styles.titleCardContainer}>
        <ReglageTitle width={width * 0.9} height={120} />
      </View>

      {/* Speciality Selection */}
      <View style={styles.specialityContainer}>
        <View style={styles.labelWrapper}>
            <SpecialiteLabel width={100} height={40} />
        </View>
        
        <View style={styles.dropdown}>
          <TouchableOpacity 
            style={[styles.dropdownOption, speciality === 'INFO' && styles.selectedOption]} 
            onPress={() => handleSelectSpeciality('INFO')}
          >
             <Text style={[styles.dropdownText, speciality === 'INFO' && styles.selectedText]}>INFO</Text>
          </TouchableOpacity>
          
          <View style={styles.verticalDivider} />
          
          <TouchableOpacity 
            style={[styles.dropdownOption, speciality === 'EIT' && styles.selectedOption]} 
            onPress={() => handleSelectSpeciality('EIT')}
          >
             <Text style={[styles.dropdownText, speciality === 'EIT' && styles.selectedText]}>EIT</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Parrain / Filleul Section */}
      <View style={styles.labelsSection}>
          <View style={styles.halfWidth}>
              <Text style={styles.infoTitle}>PARRAIN :</Text>
              <ScrollView style={styles.namesList}>
                {parrains.map((p) => (
                  <Text key={p.id} style={styles.participantName}>{p.name}</Text>
                ))}
                {parrains.length === 0 && <Text style={styles.emptyText}>Aucun</Text>}
              </ScrollView>
          </View>
          <View style={styles.halfWidth}>
              <Text style={styles.infoTitle}>FILLEUL :</Text>
              <ScrollView style={styles.namesList}>
                {filleuls.map((f) => (
                  <Text key={f.id} style={styles.participantName}>{f.name}</Text>
                ))}
                {filleuls.length === 0 && <Text style={styles.emptyText}>Aucun</Text>}
              </ScrollView>
          </View>
      </View>

      {/* Ajout Button */}
      <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={styles.buttonWrapper}
            onPress={handleAjout}
          >
            <AjoutButton width={width * 0.5} height={60} preserveAspectRatio="xMidYMid meet" />
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
  backButtonContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
  },
  wolfIconContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  wolfImage: {
    width: 100,
    height: 100,
  },
  titleCardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 30,
  },
  specialityContainer: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    marginBottom: 60,
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
    backgroundColor: '#f8f8f8',
  },
  verticalDivider: {
    width: 1,
    height: '60%',
    backgroundColor: '#eee',
  },
  dropdownText: {
    fontFamily: 'Jersey25',
    fontSize: 28,
    color: '#ccc',
  },
  selectedText: {
    color: '#B22222',
  },
  labelsSection: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 20,
  },
  halfWidth: {
    width: '45%',
    height: '100%',
  },
  infoTitle: {
    fontFamily: 'Jersey25',
    fontSize: 24,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    marginBottom: 10,
  },
  namesList: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: 10,
    flex: 1,
  },
  participantName: {
    fontFamily: 'Jersey25',
    fontSize: 18,
    color: '#B22222',
    marginBottom: 5,
  },
  emptyText: {
    fontFamily: 'Jersey25',
    fontSize: 16,
    color: 'white',
    fontStyle: 'italic',
  },
  bottomContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  buttonWrapper: {
    width: width,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  }
});