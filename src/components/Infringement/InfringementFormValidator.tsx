import React from 'react';
import { Infringement } from '../../models/Infringement';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface InfringementFormProps {
  mode: number;
  handleCreate?: (values: Infringement) => void;
  handleUpdate?: (values: Infringement) => void;
  infringement?: Infringement | null;
}

const options = [
  { value: 'Velocidad', label: 'Velocidad' },
  { value: 'Llantas', label: 'Llantas' },
  { value: 'Papeles', label: 'Papeles' },
];

const InfringementFormValidator: React.FC<InfringementFormProps> = ({ mode, handleCreate, handleUpdate, infringement }) => {
  const handleSubmit = (values: Infringement) => {
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
      initialValues={infringement ? infringement : { name: '' }}
      validationSchema={Yup.object({
        name: Yup.string()
          .oneOf(options.map(opt => opt.value), 'Seleccione una opción válida')
          .required('La infracción es obligatoria'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">Infracción</label>
            <Field as="select" name="name" className="w-full border rounded-md p-2">
              <option value="">Seleccione una infracción</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </Field>
            <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
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

export default InfringementFormValidator;