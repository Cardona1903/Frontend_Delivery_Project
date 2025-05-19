import { Order } from "../../models/Order";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Tipo auxiliar para el formulario
type OrderFormValues = Omit<Order, "created_at"> & {
  created_at?: string;
};

interface OrderFormProps {
  mode: number;
  handleCreate?: (values: Order) => void;
  handleUpdate?: (values: Order) => void;
  order?: Order | null;
}

const OrderFormValidator: React.FC<OrderFormProps> = ({ mode, handleCreate, handleUpdate, order }) => {
  const handleSubmit = (values: OrderFormValues) => {
    const formattedValues: Order = {
      ...values,
      created_at: values.created_at ? new Date(values.created_at) : undefined,
    };
    if (mode === 1 && handleCreate) {
      handleCreate(formattedValues);
    } else if (mode === 2 && handleUpdate) {
      handleUpdate(formattedValues);
    } else {
      console.error('No function provided for the current mode');
    }
  };

  const initialValues: OrderFormValues = order
    ? {
        ...order,
        created_at: order.created_at ? new Date(order.created_at).toISOString().split('T')[0] : "",
      }
    : {
        customer_id: 0,
        menu_id: 0,
        quantity: 1,
        total_price: 0,
        status: "",
        created_at: "",
      };

  return (
    <Formik<OrderFormValues>
      initialValues={initialValues}
      validationSchema={Yup.object({
        customer_id: Yup.number().typeError("Debe ser un número").integer("Debe ser entero").positive("Debe ser positivo").required("El cliente es obligatorio"),
        menu_id: Yup.number().typeError("Debe ser un número").integer("Debe ser entero").positive("Debe ser positivo").required("El menú es obligatorio"),
        quantity: Yup.number().typeError("Debe ser un número").integer("Debe ser entero").min(1, "Debe ser al menos 1").required("La cantidad es obligatoria"),
        total_price: Yup.number().typeError("Debe ser un número").min(0, "No puede ser negativo").required("El precio total es obligatorio"),
        status: Yup.string().required("El estado es obligatorio"),
        created_at: Yup.string(),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
          <div>
            <label htmlFor="customer_id" className="block text-lg font-medium text-gray-700">ID Cliente</label>
            <Field type="number" name="customer_id" className="w-full border rounded-md p-2" />
            <ErrorMessage name="customer_id" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="menu_id" className="block text-lg font-medium text-gray-700">ID Menú</label>
            <Field type="number" name="menu_id" className="w-full border rounded-md p-2" />
            <ErrorMessage name="menu_id" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-lg font-medium text-gray-700">Cantidad</label>
            <Field type="number" name="quantity" className="w-full border rounded-md p-2" />
            <ErrorMessage name="quantity" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="total_price" className="block text-lg font-medium text-gray-700">Precio Total</label>
            <Field type="number" name="total_price" className="w-full border rounded-md p-2" />
            <ErrorMessage name="total_price" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="status" className="block text-lg font-medium text-gray-700">Estado</label>
            <Field type="text" name="status" className="w-full border rounded-md p-2" />
            <ErrorMessage name="status" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="created_at" className="block text-lg font-medium text-gray-700">Fecha de Creación</label>
            <Field type="date" name="created_at" className="w-full border rounded-md p-2" />
            <ErrorMessage name="created_at" component="p" className="text-red-500 text-sm" />
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

export default OrderFormValidator;