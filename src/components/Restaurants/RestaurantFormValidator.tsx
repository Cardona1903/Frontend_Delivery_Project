import { Restaurant } from "../../models/Restaurant";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface RestaurantFormProps {
  mode: number;
  handleCreate?: (values: Restaurant) => void;
  handleUpdate?: (values: Restaurant) => void;
  restaurant?: Restaurant | null;
}

const RestaurantFormValidator: React.FC<RestaurantFormProps> = ({ mode, handleCreate, handleUpdate, restaurant }) => {
  const handleSubmit = (formattedValues: Restaurant) => {
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
      initialValues={restaurant ? restaurant : {
        name: "",
        address: "",
        phone: "",
        email: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("El nombre es obligatorio"),
        address: Yup.string().required("La dirección es obligatoria"),
        phone: Yup.string().matches(/^\d{10}$/, "El teléfono debe tener 10 dígitos").required("El teléfono es obligatorio"),
        email: Yup.string().email("Email inválido").required("El email es obligatorio"),
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
            <label htmlFor="address" className="block text-lg font-medium text-gray-700">Dirección</label>
            <Field type="text" name="address" className="w-full border rounded-md p-2" />
            <ErrorMessage name="address" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-lg font-medium text-gray-700">Teléfono</label>
            <Field type="text" name="phone" className="w-full border rounded-md p-2" />
            <ErrorMessage name="phone" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
            <Field type="email" name="email" className="w-full border rounded-md p-2" />
            <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
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

export default RestaurantFormValidator;