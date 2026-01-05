import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitializing(false);
    });
    return subscriber; 
  }, []);

  if (initializing) return (
    <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size="large" color="#6200EE" /></View>
  );

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {}
      {!user ? (
        <Stack.Screen name="login" options={{ title: 'Login' }} />
      ) : (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      )}
      
      {/* Halaman ini harus selalu bisa diakses atau didaftarkan */}
      <Stack.Screen name="register" options={{ headerShown: true, title: 'Daftar' }} />
      <Stack.Screen name="user_detail" options={{ headerShown: true, title: 'Profil' }} />
      <Stack.Screen name="course/index" options={{ headerShown: true, title: 'Courses' }} />
      <Stack.Screen name="course/detail" options={{ headerShown: true }} />
      <Stack.Screen name="course/moon_phase" options={{ headerShown: true }} />
    </Stack>
  );
}