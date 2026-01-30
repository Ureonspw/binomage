import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image, Text, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DotsPattern from '../images/dots_pattern.png';
import BackButton from '../images/button_retour.svg';
import ContainerFrame from '../images/CONTAINERIMAGEBINOMAGEICON.svg';
import EnregistrerButton from '../images/ENREGISTRER_BOUTTON.svg'; 
import { addParticipant } from '../../services/database';
import { playSound } from '../../services/soundService';

const { width, height } = Dimensions.get('window');

export default function AjoutPersonneBinomage({ route, navigation }) {
  const { speciality } = route.params || { speciality: 'INFO' };
  const [role, setRole] = useState('PARRAIN');
  const [name, setName] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    playSound('button');
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    playSound('button');
    if (!name.trim()) {
      Alert.alert("Erreur", "Veuillez entrer un nom.");
      return;
    }

    try {
      await addParticipant(name.trim(), role, speciality, imageUri);
      Alert.alert("Succès", `${name} a été ajouté en tant que ${role} (${speciality})`);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erreur", "Impossible d'enregistrer le participant.");
    }
  };

  const handleBack = () => {
    playSound('button');
    navigation.goBack();
  };

  const handleSelectRole = (newRole) => {
    playSound('button');
    setRole(newRole);
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

      {/* Role Selection */}
      <View style={styles.section}>
        <Text style={styles.label}>ROLE - {speciality}</Text>
        <View style={styles.dropdown}>
          <TouchableOpacity 
            style={[styles.dropdownOption, role === 'PARRAIN' && styles.selectedOption]} 
            onPress={() => handleSelectRole('PARRAIN')}
          >
             <Text style={[styles.dropdownText, role === 'PARRAIN' && styles.selectedText]}>PARRAIN</Text>
          </TouchableOpacity>
          
          <View style={styles.verticalDivider} />
          
          <TouchableOpacity 
            style={[styles.dropdownOption, role === 'FILLEUL' && styles.selectedOption]} 
            onPress={() => handleSelectRole('FILLEUL')}
          >
             <Text style={[styles.dropdownText, role === 'FILLEUL' && styles.selectedText]}>FILLEUL</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Nom Input */}
      <View style={styles.section}>
        <Text style={styles.label}>NOM</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            value={name} 
            onChangeText={setName} 
            placeholder="ENTREZ LE NOM"
            placeholderTextColor="#ccc"
          />
        </View>
      </View>

      {/* Photo Section */}
      <View style={styles.section}>
        <Text style={styles.label}>PHOTO</Text>
        <TouchableOpacity style={styles.frameWrapper} onPress={pickImage}>
            <View style={styles.frameContent}>
              <ContainerFrame width={width * 0.55} height={width * 0.55} />
              {imageUri && (
                <View style={styles.imageOverlay}>
                  <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="cover" />
                </View>
              )}
            </View>
        </TouchableOpacity>
      </View>

      {/* Save Button */}
      <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={styles.buttonWrapper}
            onPress={handleSave}
          >
            <EnregistrerButton width={width * 0.7} height={70} preserveAspectRatio="xMidYMid meet" />
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
    paddingTop: 120,
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
  section: {
    width: '100%',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Jersey25',
    fontSize: 24,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
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
  inputContainer: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  input: {
    fontFamily: 'Jersey25',
    fontSize: 24,
    color: '#B22222',
    textAlign: 'center',
  },
  frameWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  frameContent: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
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
  bottomContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  buttonWrapper: {
    width: width,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  }
});