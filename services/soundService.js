import { Audio } from 'expo-av';

// Configure Audio mode for iOS to play even in silent mode
Audio.setAudioModeAsync({
  allowsRecordingIOS: false,
  staysActiveInBackground: false,
  interruptionModeIOS: 1, // interruptionModeIOS.DoNotMix
  playsInSilentModeIOS: true,
  shouldDuckAndroid: true,
  interruptionModeAndroid: 1, // interruptionModeAndroid.DoNotMix
  playThroughEarpieceAndroid: false,
});

const sounds = {
  splash: require('../assets/sounds/splashscreenbutton.mp3'),
  button: require('../assets/sounds/allbuttonsound.mp3'),
  suspense: [
    require('../assets/sounds/suspence/AKATSUKI.mp3'),
    require('../assets/sounds/suspence/mercon.mp3'),
    require('../assets/sounds/suspence/nouveau1.mp3'),
    require('../assets/sounds/suspence/nouveau2.mp3'),
  ],
  resultat_fanfare: require('../assets/sounds/resultats/tantantannnnnn.mp3'),
  resultat_validation: require('../assets/sounds/resultats/validation.mp3'),
};

let soundObject = null;

export const playSound = async (type) => {
  try {
    const { sound } = await Audio.Sound.createAsync(sounds[type]);
    console.log(`[SoundService] Playing: ${type}`);
    await sound.playAsync();
    
    // Automatically unload after playing
    sound.setOnPlaybackStatusUpdate(status => {
      if (status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch (error) {
    console.log("[SoundService] Error playing sound:", error);
  }
};

export const playSuspenseSound = async () => {
    try {
      if (soundObject) {
        await soundObject.unloadAsync();
      }
      
      const randomIndex = Math.floor(Math.random() * sounds.suspense.length);
      const { sound } = await Audio.Sound.createAsync(sounds.suspense[randomIndex]);
      soundObject = sound;
      console.log(`[SoundService] Playing suspense: ${randomIndex}`);
      await soundObject.playAsync();
      return soundObject;
    } catch (error) {
      console.log("[SoundService] Error playing suspense:", error);
    }
};

export const stopSound = async () => {
    if (soundObject) {
        try {
            await soundObject.stopAsync();
            await soundObject.unloadAsync();
            soundObject = null;
        } catch (error) {
            console.log("[SoundService] Error stopping sound:", error);
        }
    }
};
