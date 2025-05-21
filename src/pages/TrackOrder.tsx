import React from 'react';
import OrderMap from '../components/OrderMap';

const TrackOrder: React.FC = () => {
  return (
    <div style={{
      maxWidth: '900px',
      margin: '40px auto',
      padding: '20px',
      backgroundColor: '#f9fafb',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#333',
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>
        Seguimiento de Pedido
      </h2>
      <OrderMap />
    </div>
  );
};

export default TrackOrder;