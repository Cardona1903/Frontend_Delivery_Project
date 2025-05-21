import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

const route: [number, number][] = [
  [5.0689, -75.5174],
  [5.0695, -75.5160],
  [5.0700, -75.5145],
  [5.0710, -75.5130],
  [5.0720, -75.5120],
];

const deliveryIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [40, 40],
});

const OrderMap: React.FC = () => {
  const [positionIndex, setPositionIndex] = useState(0);
  const [tracking, setTracking] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (tracking) {
      intervalRef.current = setInterval(() => {
        setPositionIndex((prev) => {
          if (prev < route.length - 1) {
            return prev + 1;
          } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setTracking(false);
            // Redirigir cuando termine el seguimiento
            navigate('/ListOrders');
            return prev;
          }
        });
      }, 1500);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [tracking, navigate]);

  const handleStartTracking = () => {
    setPositionIndex(0);
    setTracking(true);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <button
        onClick={handleStartTracking}
        disabled={tracking}
        style={{
          backgroundColor: tracking ? '#95a5a6' : '#27ae60',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: tracking ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 8px rgba(39, 174, 96, 0.4)',
          transition: 'background-color 0.3s ease',
          marginBottom: '20px',
        }}
      >
        {tracking ? 'En seguimiento...' : 'Iniciar seguimiento'}
      </button>
      <div
        style={{
          height: '450px',
          width: '100%',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        }}
      >
        <MapContainer center={route[0]} zoom={15} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polyline positions={route} color="#2980b9" weight={5} />
          {route[positionIndex] && (
            <Marker position={{ lat: route[positionIndex][0], lng: route[positionIndex][1] }} icon={deliveryIcon} />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default OrderMap;