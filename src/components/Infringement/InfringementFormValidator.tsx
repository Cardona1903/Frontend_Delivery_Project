import { Infringement } from "../../models/Infringement";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface InfringementFormProps {
  mode: number; // 1 para crear, 2 para actualizar
  handleCreate?: (values: Infringement) => void;
  handleUpdate?: (values: Infringement) => void;
  infringement?: Infringement | null;
}

const InfringementFormValidator: React.FC<InfringementFormProps> = ({ 
  mode, 
  handleCreate, 
  handleUpdate, 
  infringement 
}) => {
  const handleSubmit = (formattedValues: Infringement) => {
    if (mode === 1 && handleCreate) {
      handleCreate(formattedValues);
    } else if (mode === 2 && handleUpdate) {
      handleUpdate(formattedValues);
    } else {
      console.error('No se proporcionó una función para el modo actual');
    }
  };

  return (
    <Formik
      initialValues={infringement ? infringement : {
        name: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .required("El nombre es obligatorio")
          .min(3, "Debe tener al menos 3 caracteres")
          .max(100, "No puede exceder los 100 caracteres"),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">
              Nombre de la Infracción
            </label>
            <Field 
              type="text" 
              name="name" 
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Ej: Exceso de velocidad"
            />
            <ErrorMessage name="name" component="p" className="text-red-500 text-sm mt-1" />
          </div>

          <button
            type="submit"
            className={`py-2 px-4 text-white rounded-md transition-colors ${
              mode === 1 
                ? "bg-blue-500 hover:bg-blue-600" 
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {mode === 1 ? "Crear Infracción" : "Actualizar Infracción"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default InfringementFormValidator;