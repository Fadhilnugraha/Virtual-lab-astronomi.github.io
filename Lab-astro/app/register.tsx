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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Memanggil auth dari config kita

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    // Validasi Password (Sama seperti logic Flutter kamu)
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password tidak cocok!');
      return;
    }

    if (email === '' || password === '') {
      Alert.alert('Error', 'Email dan Password tidak boleh kosong!');
      return;
    }

    setLoading(true);
    try {
      // Firebase Register Logic
      await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
      
      Alert.alert('Sukses', 'Akun berhasil dibuat!', [
        { text: 'OK', onPress: () => router.back() } // Kembali ke halaman Login
      ]);
    } catch (error: any) {
      // Mapping error Firebase 
      let errorMessage = 'Terjadi kesalahan';
      if (error.code === 'auth/email-already-in-use') errorMessage = 'Email sudah terdaftar!';
      if (error.code === 'auth/weak-password') errorMessage = 'Password terlalu lemah!';
      
      Alert.alert('Registrasi Gagal', errorMessage);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: 'Daftar Akun Baru', headerShown: true }} />
      
      <View style={styles.formCard}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan Email"
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

        <Text style={styles.label}>Konfirmasi Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Ulangi Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {loading ? (
          <ActivityIndicator size="large" color="#6200EE" style={{ marginTop: 20 }} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Daftar</Text>
          </TouchableOpacity>
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
    padding: 20,
    borderRadius: 15,
    elevation: 4,
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
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});