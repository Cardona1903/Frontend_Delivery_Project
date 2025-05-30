import { Driver } from "../../models/Driver";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface DriverFormProps {
  mode: number;
  handleCreate?: (values: Driver) => void;
  handleUpdate?: (values: Driver) => void;
  driver?: Driver | null;
}

const DriverFormValidator: React.FC<DriverFormProps> = ({ mode, handleCreate, handleUpdate, driver }) => {
  const handleSubmit = (formattedValues: Driver) => {
    if (mode === 1 && handleCreate) {
      handleCreate(formattedValues);
    } else if (mode === 2 && handleUpdate) {
      handleUpdate(formattedValues);
    } else {
      console.error('No function provided for the current mode');
    }
  };

  return (
    <Formik
      initialValues={driver ? driver : {
        name: "",
        email: "",
        phone: "",
        is_active: false,
        license_number: "",
        status: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("El nombre es obligatorio"),
        email: Yup.string().email("Email inválido").required("El email es obligatorio"),
        phone: Yup.string().matches(/^\d{10}$/, "El teléfono debe tener 10 dígitos").required("El teléfono es obligatorio"),
        is_active: Yup.boolean(),
        license_number: Yup.string(),
        status: Yup.string(),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">Nombre</label>
            <Field type="text" name="name" className="w-full border rounded-md p-2" />
            <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
            <Field type="email" name="email" className="w-full border rounded-md p-2" />
            <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-lg font-medium text-gray-700">Teléfono</label>
            <Field type="text" name="phone" className="w-full border rounded-md p-2" />
            <ErrorMessage name="phone" component="p" className="text-red-500 text-sm" />
          </div>
          <div className="flex items-center">
            <Field type="checkbox" name="is_active" className="mr-2" />
            <label htmlFor="is_active" className="text-lg font-medium text-gray-700">Activo</label>
          </div>
          <div>
            <label htmlFor="license_number" className="block text-lg font-medium text-gray-700">Número de Licencia</label>
            <Field type="text" name="license_number" className="w-full border rounded-md p-2" />
            <ErrorMessage name="license_number" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="status" className="block text-lg font-medium text-gray-700">Estado</label>
            <Field type="text" name="status" className="w-full border rounded-md p-2" />
            <ErrorMessage name="status" component="p" className="text-red-500 text-sm" />
          </div>
          <button
            type="submit"
            className={`py-2 px-4 text-white rounded-md ${mode === 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}`}
          >
            {mode === 1 ? "Crear" : "Actualizar"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default DriverFormValidator;