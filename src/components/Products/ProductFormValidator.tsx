import { Product } from "../../models/Product";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface ProductFormProps {
  mode: number;
  handleCreate?: (values: Product) => void;
  handleUpdate?: (values: Product) => void;
  product?: Product | null;
}

const ProductFormValidator: React.FC<ProductFormProps> = ({ mode, handleCreate, handleUpdate, product }) => {
  const handleSubmit = (formattedValues: Product) => {
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
      initialValues={product ? product : {
        name: "",
        description: "",
        price: 0,
        category: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("El nombre es obligatorio"),
        description: Yup.string().required("La descripción es obligatoria"),
        price: Yup.number().typeError("Debe ser un número").positive("Debe ser positivo").required("El precio es obligatorio"),
        category: Yup.string().required("La categoría es obligatoria"),
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
            <label htmlFor="description" className="block text-lg font-medium text-gray-700">Descripción</label>
            <Field type="text" name="description" className="w-full border rounded-md p-2" />
            <ErrorMessage name="description" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="price" className="block text-lg font-medium text-gray-700">Precio</label>
            <Field type="number" name="price" className="w-full border rounded-md p-2" />
            <ErrorMessage name="price" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="category" className="block text-lg font-medium text-gray-700">Categoría</label>
            <Field type="text" name="category" className="w-full border rounded-md p-2" />
            <ErrorMessage name="category" component="p" className="text-red-500 text-sm" />
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

export default ProductFormValidator;