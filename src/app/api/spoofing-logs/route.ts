import { NextResponse } from 'next/server';

// Simulate a database of location logs
const mockLogs = [
  { id: 1, time: "10:23:01", lat: "28.6139", lng: "77.2090", speed: "12 km/h", status: "normal", altitude: "50m" },
  { id: 2, time: "10:23:05", lat: "28.6141", lng: "77.2092", speed: "15 km/h", status: "normal", altitude: "52m" },
  { id: 3, time: "10:23:10", lat: "28.6145", lng: "77.2095", speed: "18 km/h", status: "normal", altitude: "55m" },
  // Anomalous jump
  { id: 4, time: "10:23:11", lat: "19.0760", lng: "72.8777", speed: "8,500 km/h", status: "spoofed", altitude: "400m" },
  { id: 5, time: "10:23:15", lat: "19.0762", lng: "72.8779", speed: "14 km/h", status: "spoofed", altitude: "395m" },
  // Recovery/Correction back to valid coords
  { id: 6, time: "10:24:00", lat: "28.6146", lng: "77.2096", speed: "12 km/h", status: "normal", altitude: "50m" },
  { id: 7, time: "10:24:10", lat: "28.6150", lng: "77.2100", speed: "14 km/h", status: "normal", altitude: "50m" },
];

export async function GET() {
  // In a real application, this would query a MongoDB or raw SQL database.
  // We simulate a small network delay.
  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json({
    success: true,
    data: mockLogs,
    timestamp: new Date().toISOString(),
  });
}
