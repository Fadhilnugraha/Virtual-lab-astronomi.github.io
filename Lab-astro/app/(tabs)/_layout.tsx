import { Stack } from "expo-router";
import { useState } from "react";
import "./firebaseConfig"; // Memanggil config yang baru dipindah

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#6200EE" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* Menghilangkan header untuk halaman tabs agar tidak double */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}