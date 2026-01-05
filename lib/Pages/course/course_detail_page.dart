import 'package:flutter/material.dart';
import 'moon_phase.dart';

class CourseDetailPage extends StatefulWidget {
  final String title;
  final String description;
  final String image;
  final String content;
  final bool isDarkMode;

  final String? simulation;

  const CourseDetailPage({
    super.key,
    required this.title,
    required this.description,
    required this.image,
    required this.content,
    required this.isDarkMode,
    this.simulation,
  });

  @override
  State<CourseDetailPage> createState() => _CourseDetailPageState();
}

class _CourseDetailPageState extends State<CourseDetailPage> {
  bool showContent = false;

  @override
  Widget build(BuildContext context) {
    final backgroundColor =
        widget.isDarkMode ? Colors.black : Colors.white;
    final textColor =
        widget.isDarkMode ? Colors.white : Colors.black;

    return Scaffold(
      backgroundColor: backgroundColor,
      appBar: AppBar(
        title: Text(
          widget.title,
          style: TextStyle(color: textColor),
        ),
        backgroundColor:
            widget.isDarkMode ? Colors.grey[900] : Colors.blue,
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            /// Gambar course
            Image.network(
              widget.image,
              height: 150,
              errorBuilder: (_, __, ___) =>
                  const Icon(Icons.image_not_supported, size: 80),
            ),

            const SizedBox(height: 20),

            /// Deskripsi
            Text(
              widget.description,
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 16,
                color: widget.isDarkMode
                    ? Colors.grey[300]
                    : Colors.grey[700],
              ),
            ),

            const SizedBox(height: 30),

            /// Tombol Mulai Course
            ElevatedButton(
              onPressed: () {
                setState(() => showContent = true);
              },
              child: const Text('Mulai Course'),
            ),

            if (showContent) ...[
              const Divider(height: 40),

              /// Konten materi
              Text(
                widget.content,
                style: TextStyle(
                  fontSize: 16,
                  height: 1.6,
                  color: textColor,
                ),
              ),

              const SizedBox(height: 24),

              /// ==========================
              /// TOMBOL SIMULASI 
              /// ==========================
              if (widget.simulation != null)
                ElevatedButton.icon(
                  icon: const Icon(Icons.science),
                  label: const Text('Tampilkan Simulasi'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: widget.isDarkMode
                        ? Colors.tealAccent[700]
                        : Colors.blue,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(
                      horizontal: 24,
                      vertical: 12,
                    ),
                  ),
                  onPressed: () {
                    /// sementara hanya 1 simulasi
                    if (widget.simulation == 'moon_phase') {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => const MoonPhasePage(),
                        ),
                      );
                    }
                  },
                ),
            ],
          ],
        ),
      ),
    );
  }
}
