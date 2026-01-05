import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:tugas_lab_interaktif/home_page.dart';
import 'pages/login_pages.dart';
import 'pages/register_pages.dart';
import 'pages/Course/course_page.dart';
import 'pages/Course/course_detail_page.dart';
import 'pages/Course/moon_phase.dart';
import 'User/user_data.dart';


void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: const FirebaseOptions(
      apiKey: "AIzaSyBAk9_9BqiKePpFwiojZC0lY7DUR3JsS4g",
      authDomain: "lms-astronomy.firebaseapp.com",
      projectId: "lms-astronomy",
      storageBucket: "lms-astronomy.firebasestorage.app",
      messagingSenderId: "6957444215",
      appId: "1:6957444215:web:07ed146a0bfc235cb3aa72",
      measurementId: "G-RHNRXE8H6H"
    
    ),
  );

  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp>{
  bool isDarkMode=false;

  void toggleTheme(bool value){
    setState((){
      isDarkMode=value;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(

      title: 'Astronomy Learning web',
      themeMode: isDarkMode? ThemeMode.dark : ThemeMode.light,

      theme: ThemeData.light().copyWith( 
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.blue,
          foregroundColor: Colors.white,
        ),
      ),
      
      darkTheme: ThemeData.dark().copyWith( 
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.black87,
          foregroundColor: Colors.white,
        ),
        scaffoldBackgroundColor: Colors.black,
      ),

      debugShowCheckedModeBanner: false,
      initialRoute: '/home',
      routes: {
        '/login': (context) => LoginPage(),
        '/register': (context) => RegisterPage(),
        '/home': (context) => HomePage(
          isDarkMode:isDarkMode,
          onThemeChanged: toggleTheme,
        ),

        '/course': (context) => CoursePage(isDarkMode: isDarkMode),
        '/courseDetail': (context) {
          final args = 
          ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;
          return CourseDetailPage(
            title: args['title']?? 'Tidak ada judul', 
            description: args ['description']?? 'Tidak ada deskripsi', 
            image: args ['image']?? '',
            content: args['content']?.toString() ?? '', 
            simulation: args['simulation'],
            isDarkMode:isDarkMode,
            );
      },
      '/userData': (context) => ProfilePage(),
      '/moonPhase': (context) => const MoonPhasePage(),

      }
    );
  }
}
