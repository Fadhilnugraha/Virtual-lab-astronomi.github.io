import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, useColorScheme } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CoursePage() {
  const router = useRouter();
  const isDarkMode = useColorScheme() === 'dark';

  const courses = [
    {
      id: '1',
      title: 'Gerhana bulan',
      description: 'Pelajari bagaimana bentuk gerhana',
      image: require('../../assets/images/moon2.png'), 
      content: 'Gerhana bulan adalah fenomena alam ketika Bulan tertutup bayangan Bumi...',
      simulation: 'moon_phase'
    },
    {
      id: '2',
      title: 'Fisika Bintang',
      description: 'Pelajari komposisi dan material bintang',
      image: require('../../assets/images/sun.png'),
      content: 'Bintang adalah bola gas raksasa yang menghasilkan energi fusi...',
    }
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#F5F5F5' }]}>
      <Stack.Screen options={{ title: 'Courses', headerShown: true }} />
      <FlatList
        data={courses}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.card, { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF' }]}
            onPress={() => router.push({ pathname: '/course/detail', params: item })}
          >
            <Image source={item.image} style={styles.cardImage} />
            <Text style={[styles.cardTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>{item.title}</Text>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => router.push({ pathname: '/course/detail', params: item })}
            >
              <Text style={{color: 'white', fontWeight: 'bold'}}>Start</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { flex: 1, margin: 8, padding: 12, borderRadius: 12, alignItems: 'center', elevation: 3 },
  cardImage: { height: 60, width: 60, marginBottom: 10 },
  cardTitle: { fontSize: 12, fontWeight: 'bold', textAlign: 'center' },
  button: { marginTop: 10, backgroundColor: '#2196F3', padding: 5, borderRadius: 5, width: '100%', alignItems: 'center' }
});