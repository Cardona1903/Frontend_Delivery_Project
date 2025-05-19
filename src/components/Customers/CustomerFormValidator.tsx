import { Customer } from "../../models/Customer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface CustomerFormProps {
  mode: number;
  handleCreate?: (values: Customer) => void;
  handleUpdate?: (values: Customer) => void;
  customer?: Customer | null;
}

const CustomerFormValidator: React.FC<CustomerFormProps> = ({ mode, handleCreate, handleUpdate, customer }) => {
  const handleSubmit = (formattedValues: Customer) => {
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
      initialValues={customer ? customer : {
        name: "",
        email: "",
        phone: "",
        motorcycle_id: undefined,
        is_active: false,
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("El nombre es obligatorio"),
        email: Yup.string().email("Email inválido").required("El email es obligatorio"),
        phone: Yup.string().matches(/^\d{10}$/, "El teléfono debe tener 10 dígitos").required("El teléfono es obligatorio"),
        motorcycle_id: Yup.number().typeError("Debe ser un número").integer("Debe ser un número entero").positive("Debe ser positivo").notRequired(),
        is_active: Yup.boolean(),
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
          <div>
            <label htmlFor="motorcycle_id" className="block text-lg font-medium text-gray-700">ID de Motocicleta</label>
            <Field type="number" name="motorcycle_id" className="w-full border rounded-md p-2" />
            <ErrorMessage name="motorcycle_id" component="p" className="text-red-500 text-sm" />
          </div>
          <div className="flex items-center">
            <Field type="checkbox" name="is_active" className="mr-2" />
            <label htmlFor="is_active" className="text-lg font-medium text-gray-700">Activo</label>
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

export default CustomerFormValidator;