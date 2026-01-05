import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import { Stack } from 'expo-router';

export default function MoonPhasePage() {
  const [angle, setAngle] = useState(0);
  const size = 200; 
  const radius = size / 2;

  const getPhaseName = (deg: number) => {
    if (deg <= 10 || deg >= 350) return "New Moon";
    if (deg < 90) return "Waxing Crescent";
    if (deg === 90) return "First Quarter";
    if (deg < 170) return "Waxing Gibbous";
    if (deg <= 190) return "Full Moon";
    if (deg < 270) return "Waning Gibbous";
    if (deg === 270) return "Last Quarter";
    if (deg < 350) return "Waning Crescent";
    return "New Moon";
  };

  // Menghitung rasio lebar elips (1 ke 0 ke -1)
  const ratio = Math.cos((angle * Math.PI) / 180);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Simulasi Fase Bulan", headerTintColor: '#fff', headerStyle: {backgroundColor: '#000'} }} />
      
      <View style={styles.centerBox}>
        <View style={[styles.moonContainer, { width: size, height: size }]}>
          {/* 1. Latar Belakang: Menentukan warna sisi gelap */}
          <View style={[styles.layer, { width: size, height: size, backgroundColor: '#333' }]} />

          {/* 2. Setengah Lingkaran Cahaya: Selalu ada di satu sisi tergantung fase */}
          <View style={[
            styles.layer, 
            { 
              width: radius, 
              height: size, 
              backgroundColor: '#FFF59D',
              // Sebelum 180 terang di kanan, setelah 180 terang di kiri
              left: angle <= 180 ? radius : 0 
            }
          ]} />

          {/* 3. Elips Dinamis: Ini yang menciptakan efek lengkungan (sabit/cembung) */}
          <View style={[
            styles.layer,
            {
              width: Math.abs(ratio) * size,
              height: size,
              left: (size - Math.abs(ratio) * size) / 2,
              borderRadius: radius,
              // Jika ratio > 0 (fase awal), elips berwarna sama dengan latar gelap
              // Jika ratio < 0 (mendekati full), elips berwarna cahaya untuk menambah volume
              backgroundColor: ratio > 0 ? '#333' : '#FFF59D',
            }
          ]} />
        </View>

        <Text style={styles.phaseText}>{getPhaseName(angle)}</Text>
        <Text style={styles.angleText}>{Math.round(angle)}°</Text>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={360}
          step={1}
          value={angle}
          onValueChange={setAngle}
          minimumTrackTintColor="#FFF59D"
          maximumTrackTintColor="#333"
          thumbTintColor="#FFF59D"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  centerBox: {
    alignItems: 'center',
    width: '100%',
  },
  moonContainer: {
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#444',
  },
  layer: {
    position: 'absolute',
  },
  phaseText: {
    color: '#FFF59D',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 40,
  },
  angleText: {
    color: '#888',
    fontSize: 18,
    marginTop: 8,
  },
  slider: {
    width: Dimensions.get('window').width * 0.85,
    height: 50,
    marginTop: 30,
  },
});