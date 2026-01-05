import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CourseDetailPage() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const isDarkMode = useColorScheme() === 'dark';
  const [showContent, setShowContent] = useState(false);

  
  const imageSource = params.image as any; 

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#FFF' }]}>
      <Stack.Screen options={{ title: params.title as string, headerShown: true }} />
      
      <View style={styles.center}>
        {}
        <Image 
          source={imageSource} 
          style={styles.image} 
          resizeMode="contain" 
        />

        <Text style={[styles.desc, { color: isDarkMode ? '#CCC' : '#666' }]}>{params.description}</Text>

        <TouchableOpacity style={styles.btn} onPress={() => setShowContent(true)}>
          <Text style={styles.btnText}>Mulai Course</Text>
        </TouchableOpacity>

        {showContent && (
          <View style={styles.materi}>
            <Text style={[styles.materiText, { color: isDarkMode ? '#FFF' : '#000' }]}>
              {params.content}
            </Text>

            {/* UBAH: Cek parameter simulasi */}
            {params.simulation === 'moon_phase' && (
              <TouchableOpacity 
                style={styles.simBtn}
                onPress={() => router.push('/course/moon_phase')}
              >
                <Ionicons name="flask" size={20} color="white" />
                <Text style={styles.btnText}> Tampilkan Simulasi</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { alignItems: 'center', padding: 20 },
  image: { width: 150, height: 150, marginBottom: 20 },
  desc: { textAlign: 'center', marginBottom: 20 },
  btn: { backgroundColor: '#6200EE', padding: 15, borderRadius: 25 },
  btnText: { color: 'white', fontWeight: 'bold' },
  materi: { marginTop: 20, width: '100%' },
  materiText: { fontSize: 16, lineHeight: 24 },
  simBtn: { flexDirection: 'row', backgroundColor: '#00796B', padding: 15, borderRadius: 10, marginTop: 20, justifyContent: 'center' }
});