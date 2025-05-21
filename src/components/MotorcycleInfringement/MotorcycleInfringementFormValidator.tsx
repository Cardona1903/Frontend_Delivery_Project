import React from 'react';
import { MotorcycleInfringement } from '../../models/MotorcycleInfringement';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface MotorcycleInfringementFormProps {
  mode: number;
  handleCreate?: (values: MotorcycleInfringement) => void;
  handleUpdate?: (values: MotorcycleInfringement) => void;
  motorcycleInfringement?: MotorcycleInfringement | null;
  motorcycles: { id: number; name: string }[];       // Lista de motos desde backend
  infringements: { id: number; name: string }[];     // Lista de infracciones desde mock server
}

const MotorcycleInfringementFormValidator: React.FC<MotorcycleInfringementFormProps> = ({
  mode,
  handleCreate,
  handleUpdate,
  motorcycleInfringement,
  motorcycles,
  infringements,
}) => {
  if (!motorcycles || !infringements) {
    return <p>Cargando datos...</p>;
  }

  const handleSubmit = (values: MotorcycleInfringement) => {
    if (mode === 1 && handleCreate) {
      handleCreate(values);
    } else if (mode === 2 && handleUpdate) {
      handleUpdate(values);
    } else {
      console.error('No function provided for the current mode');
    }
  };

  return (
    <Formik
      initialValues={
        motorcycleInfringement
          ? {
              motorcycleId: motorcycleInfringement.motorcycleId?.toString() ?? '',
              infringementId: motorcycleInfringement.infringementId?.toString() ?? '',
              date: motorcycleInfringement.date ? motorcycleInfringement.date.toISOString().split('T')[0] : '',
            }
          : { motorcycleId: '', infringementId: '', date: '' }
      }
      validationSchema={Yup.object({
        motorcycleId: Yup.string()
          .required('La motocicleta es obligatoria')
          .matches(/^\d+$/, 'Seleccione una motocicleta válida'),
        infringementId: Yup.string()
          .required('La infracción es obligatoria')
          .matches(/^\d+$/, 'Seleccione una infracción válida'),
        date: Yup.date()
          .required('La fecha es obligatoria')
          .typeError('Debe ser una fecha válida'),
      })}
      onSubmit={(values) => {
        const formattedValues = {
          ...values,
          motorcycleId: Number(values.motorcycleId),
          infringementId: Number(values.infringementId),
        };
        handleSubmit(formattedValues);
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
          <div>
            <label htmlFor="motorcycleId" className="block text-lg font-medium text-gray-700">Motocicleta</label>
            <Field as="select" name="motorcycleId" className="w-full border rounded-md p-2">
              <option value="">Seleccione una motocicleta</option>
              {motorcycles.map((moto) => (
                <option key={moto.id} value={moto.id.toString()}>
                  {moto.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="motorcycleId" component="p" className="text-red-500 text-sm" />
          </div>

          <div>
            <label htmlFor="infringementId" className="block text-lg font-medium text-gray-700">Infracción</label>
            <Field as="select" name="infringementId" className="w-full border rounded-md p-2">
              <option value="">Seleccione una infracción</option>
              {infringements.map((inf) => (
                <option key={inf.id} value={inf.id.toString()}>
                  {inf.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="infringementId" component="p" className="text-red-500 text-sm" />
          </div>

          <div>
            <label htmlFor="date" className="block text-lg font-medium text-gray-700">Fecha</label>
            <Field type="date" name="date" className="w-full border rounded-md p-2" />
            <ErrorMessage name="date" component="p" className="text-red-500 text-sm" />
          </div>

          <button
            type="submit"
            className={`py-2 px-4 text-white rounded-md ${mode === 1 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}`}
          >
            {mode === 1 ? 'Crear' : 'Actualizar'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MotorcycleInfringementFormValidator;