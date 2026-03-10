import { NextResponse } from 'next/server';

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Dynamic system state that the frontend map will poll
  return NextResponse.json({
    success: true,
    data: {
      geofence: {
        center: [28.6139, 77.2090], // New Delhi Coordinates
        radiusMeters: 300,
        colorHex: "#3b82f6"
      },
      device: {
        // We'll let the frontend manage the state for interaction,
        // but this shows how initial config is loaded from the backend.
        initialPosition: [28.6140, 77.2091],
        id: "UAV-ALPHA-01",
        status: "active"
      }
    },
    timestamp: new Date().toISOString()
  });
}
