import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { auth, db } from './firebaseConfig'; 
import { doc, getDoc, setDoc } from 'firebase/firestore'; 
import { Ionicons } from '@expo/vector-icons';

export default function UserDetailPage() {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    const loadUserData = async () => {
      // Jika user tidak ditemukan, langsung stop loading dan suruh login
      if (!user) {
        setFetching(false);
        Alert.alert("Error", "Sesi berakhir, silakan login kembali.");
        router.replace('/login');
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        // Tambahkan batas waktu/timeout secara logis
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || '');
          setGrade(data.grade || '');
        }
      } catch (error: any) {
        console.error("Firestore Error:", error);
        Alert.alert("Gagal Memuat Data", "Pastikan internet aktif dan database Firestore sudah diaktifkan.");
      } finally {
        setFetching(false);
      }
    };

    loadUserData();
  }, [user]);

  const handleSave = async () => {
    if (!name || !grade) {
      Alert.alert('Peringatan', 'Mohon isi Nama dan Kelas.');
      return;
    }

    setLoading(true);
    try {
      await setDoc(doc(db, "users", user!.uid), {
        name,
        grade,
        email: user?.email,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      Alert.alert('Sukses', 'Profil berhasil diperbarui!');
    } catch (error) {
      Alert.alert('Error', 'Gagal menyimpan ke Cloud.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text style={{ marginTop: 10 }}>Menghubungkan ke Cloud...</Text>
      </View>
    );
  }

  // ... sisa kode return UI sama seperti sebelumnya ...
  return (
    <ScrollView style={styles.container}>
       <Stack.Screen options={{ title: 'Profil Pengguna' }} />
       <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={60} color="#6200EE" />
        </View>
        <Text style={styles.emailText}>{user?.email}</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nama Lengkap</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nama Anda" />
        
        <Text style={styles.label}>Kelas</Text>
        <TextInput style={styles.input} value={grade} onChangeText={setGrade} placeholder="Kelas Anda" />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={loading}>
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.btnText}>Simpan</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { alignItems: 'center', padding: 20 },
  avatarCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' },
  emailText: { marginTop: 10, color: '#666' },
  form: { padding: 20 },
  label: { fontWeight: 'bold', marginTop: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginTop: 5 },
  saveBtn: { backgroundColor: '#6200EE', padding: 15, borderRadius: 5, marginTop: 20, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});