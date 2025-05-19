import { Menu } from "../../models/Menu";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface MenuFormProps {
  mode: number;
  handleCreate?: (values: Menu) => void;
  handleUpdate?: (values: Menu) => void;
  menu?: Menu | null;
}

const MenuFormValidator: React.FC<MenuFormProps> = ({ mode, handleCreate, handleUpdate, menu }) => {
  const handleSubmit = (formattedValues: Menu) => {
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
      initialValues={menu ? menu : {
        restaurant_id: 0,
        product_id: 0,
        price: 0,
        availability: false,
      }}
      validationSchema={Yup.object({
        restaurant_id: Yup.number().typeError("Debe ser un número").integer("Debe ser entero").positive("Debe ser positivo").required("El restaurante es obligatorio"),
        product_id: Yup.number().typeError("Debe ser un número").integer("Debe ser entero").positive("Debe ser positivo").required("El producto es obligatorio"),
        price: Yup.number().typeError("Debe ser un número").positive("Debe ser positivo").required("El precio es obligatorio"),
        availability: Yup.boolean(),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
          <div>
            <label htmlFor="restaurant_id" className="block text-lg font-medium text-gray-700">ID Restaurante</label>
            <Field type="number" name="restaurant_id" className="w-full border rounded-md p-2" />
            <ErrorMessage name="restaurant_id" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="product_id" className="block text-lg font-medium text-gray-700">ID Producto</label>
            <Field type="number" name="product_id" className="w-full border rounded-md p-2" />
            <ErrorMessage name="product_id" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="price" className="block text-lg font-medium text-gray-700">Precio</label>
            <Field type="number" name="price" className="w-full border rounded-md p-2" />
            <ErrorMessage name="price" component="p" className="text-red-500 text-sm" />
          </div>
          <div className="flex items-center">
            <Field type="checkbox" name="availability" className="mr-2" />
            <label htmlFor="availability" className="text-lg font-medium text-gray-700">Disponible</label>
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

export default MenuFormValidator;