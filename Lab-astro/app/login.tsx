import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert, 
  ScrollView 
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig'; 
import { Ionicons } from '@expo/vector-icons';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Email dan Password wajib diisi!');
      return;
    }

    setLoading(true);
    try {
      // Firebase Login Logic
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      
      Alert.alert('Sukses', 'Login berhasil!');
      // Navigator.pushReplacementNamed di Flutter menjadi router.replace di Expo
      router.replace('/(tabs)'); 
      
    } catch (error: any) {
      let errorMessage = 'Email atau Password salah!';
      if (error.code === 'auth/user-not-found') errorMessage = 'Pengguna tidak ditemukan!';
      
      Alert.alert('Login Gagal', errorMessage);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* AppBar dengan tombol Home seperti di Flutter kamu */}
      <Stack.Screen 
        options={{ 
          title: 'Login', 
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
              <Ionicons name="home" size={24} color="#6200EE" />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <View style={styles.formCard}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="email@contoh.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {loading ? (
          <ActivityIndicator size="large" color="#6200EE" style={{ marginTop: 20 }} />
        ) : (
          <View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.linkButton} 
              onPress={() => router.push('/register')}
            >
              <Text style={styles.linkText}>Belum punya akun? Daftar di sini</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F5F5F5',
  },
  formCard: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#FAFAFA'
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkText: {
    color: '#6200EE',
    fontSize: 14,
  },
});