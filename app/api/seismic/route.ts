import { NextResponse } from 'next/server';
import { USGSFeature } from '@/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startTime = searchParams.get('startTime') || 'now-30d';
  const endTime = searchParams.get('endTime') || 'now';
  const minMagnitude = searchParams.get('minMagnitude') || '2.5';

  try {
    const response = await fetch(
      `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startTime}&endtime=${endTime}&minmagnitude=${minMagnitude}&orderby=time`
    );
    
    const data = await response.json();
    
    const transformedData = data.features.map((feature: USGSFeature) => ({
      magnitude: feature.properties.mag,
      location: {
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
      },
      depth: feature.geometry.coordinates[2],
      timestamp: feature.properties.time,
      place: feature.properties.place,
      url: feature.properties.url,
    }));
    
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching seismic data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch seismic data' },
      { status: 500 }
    );
  }
}