// src/components/Auth/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();

  // Si está cargando, muestra un indicador de carga
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si no hay usuario autenticado, redirige a la página de inicio de sesión
  if (!currentUser) {
    return <Navigate to="/auth/signin" />;
  }

  // Si hay un usuario autenticado, renderiza las rutas hijas
  return <Outlet />;
};

export default ProtectedRoute;