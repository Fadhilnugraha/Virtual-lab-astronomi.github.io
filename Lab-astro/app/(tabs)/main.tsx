import { Stack } from "expo-router";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useState } from "react";
import "../firebaseConfig"; 

export default function RootLayout() {
  // Ganti ini nanti dengan logic State Management jika ingin global
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: isDarkMode ? "#121212" : "#2196F3",
          },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        {/* Ini seperti daftar 'routes' di Flutter kamu */}
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="login" options={{ title: "Login" }} />
        <Stack.Screen name="register" options={{ title: "Register" }} />
        <Stack.Screen name="course/index" options={{ title: "Course" }} />
        <Stack.Screen name="user/profile" options={{ title: "Profile" }} />
      </Stack>
    </ThemeProvider>
  );
}