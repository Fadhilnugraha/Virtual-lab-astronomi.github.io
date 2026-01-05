import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Switch, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebaseConfig'; 
import { useRouter } from 'expo-router'; 

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter(); 

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#fff' }]}>
      <SafeAreaView style={[styles.appBar, { backgroundColor: isDarkMode ? '#333' : '#2196F3' }]}>
        <Text style={styles.appBarTitle}>Lab-Astro</Text>
        
        <View style={styles.actionIcons}>
          {}
          <Ionicons name="moon" size={20} color="white" />
          <Switch value={isDarkMode} onValueChange={setIsDarkMode} />

          {}
          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={() => router.push('/login')}
          >
            <Text style={styles.loginButtonText}>Masuk</Text>
          </TouchableOpacity>

          {}
          <TouchableOpacity 
            style={styles.profileButton} 
            onPress={() => router.push('/user_detail')}
          >
            <Ionicons name="person-circle" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ImageBackground 
        source={require('../../assets/images/bghome.jpg')} 
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Pelajari astronomi</Text>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.push('/course')}
          >
            <Text style={styles.buttonText}>Mulai Jelajahi</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  appBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15, 
    paddingBottom: 15, 
    paddingTop: 50 
  },
  appBarTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  actionIcons: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  

  loginButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },

  profileButton: {
    marginLeft: 5,
  },

  backgroundImage: { flex: 1 },
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.45)', 
    justifyContent: 'flex-end', 
    alignItems: 'flex-end', 
    padding: 24 
  },
  title: { fontSize: 26, fontWeight: 'bold', color: 'white', marginBottom: 20 },
  button: { backgroundColor: '#7C4DFF', padding: 15, borderRadius: 12 },
  buttonText: { color: 'white', fontWeight: 'bold' }
});