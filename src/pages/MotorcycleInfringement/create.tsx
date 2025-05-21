import React, { useEffect, useState } from 'react';
import { MotorcycleInfringement } from '../../models/MotorcycleInfringement';
import MotorcycleInfringementFormValidator from '../../components/MotorcycleInfringement/MotorcycleInfringementFormValidator';

import Swal from 'sweetalert2';
import { createMotorcycleInfringement } from "../../services/MotorcycleInfringementService";
import { getMotorcycles } from '../../services/MotorcycleService'; // Ajusta la ruta si es diferente
import { getInfringements } from '../../services/InfringementService'; // Ajusta la ruta si es diferente
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from "react-router-dom";

const CreateMotorcycleInfringement = () => {
  const navigate = useNavigate();

  const [motorcycles, setMotorcycles] = useState<{ id: number; name: string }[]>([]);
  const [infringements, setInfringements] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const motos = await getMotorcycles();
        const infrs = await getInfringements();
        setMotorcycles(motos);
        setInfringements(infrs);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "No se pudieron cargar las listas de motocicletas o infracciones",
          icon: "error",
          timer: 3000,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreateMotorcycleInfringement = async (motorcycleInfringement: MotorcycleInfringement) => {
    try {
      const created = await createMotorcycleInfringement(motorcycleInfringement);
      if (created) {
        Swal.fire({
          title: "Completado",
          text: "Se ha creado correctamente el registro",
          icon: "success",
          timer: 3000,
        });
        navigate("/ListMotorcycleInfringements"); // Corregí la ruta aquí
      } else {
        Swal.fire({
          title: "Error",
          text: "Existe un problema al momento de crear el registro",
          icon: "error",
          timer: 3000,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Existe un problema al momento de crear el registro",
        icon: "error",
        timer: 3000,
      });
    }
  };

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div>
      <h2>Crear Infracción de Motocicleta</h2>
      <Breadcrumb pageName="Crear Infracción de Motocicleta" />
      <MotorcycleInfringementFormValidator
        handleCreate={handleCreateMotorcycleInfringement}
        mode={1}
        motorcycles={motorcycles}
        infringements={infringements}
      />
    </div>
  );
};

export default CreateMotorcycleInfringement;