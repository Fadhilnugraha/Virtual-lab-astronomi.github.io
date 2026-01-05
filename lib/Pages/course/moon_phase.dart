import 'dart:math';
import 'package:flutter/material.dart';

class MoonPhasePage extends StatefulWidget {
  const MoonPhasePage({super.key});

  @override
  State<MoonPhasePage> createState() => _MoonPhasePageState();
}

class _MoonPhasePageState extends State<MoonPhasePage> {
  double angle = 0;

  String getPhaseName(double angle) {
    if (angle < 45 || angle >= 315) return "New Moon";
    if (angle < 90) return "Waxing Crescent";
    if (angle < 135) return "First Quarter";
    if (angle < 180) return "Waxing Gibbous";
    if (angle < 225) return "Full Moon";
    if (angle < 270) return "Waning Gibbous";
    if (angle < 315) return "Last Quarter";
    return "";
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Simulasi Fase Bulan"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CustomPaint(
              size: const Size(200, 200),
              painter: MoonPainter(angle), 
            ),
            const SizedBox(height: 20),
            Text(getPhaseName(angle)),
            Slider(
              value: angle,
              min: 0,
              max: 360,
              divisions: 360,
              onChanged: (value) {
                setState(() {
                  angle = value;
                });
              },
            ),
          ],
        ),
      ),
    );
  }
}

class MoonPainter extends CustomPainter {
  final double angle;

  MoonPainter(this.angle);

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = size.width / 2;

    // Bulan terang
    final lightPaint = Paint()..color = Colors.white;
    canvas.drawCircle(center, radius, lightPaint);

    // Bayangan
    final shadowPaint = Paint()..color = Colors.black;
    final dx = radius * cos(angle * pi / 180);

    canvas.drawCircle(
      Offset(center.dx + dx, center.dy),
      radius,
      shadowPaint,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
