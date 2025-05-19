import { Shift } from "../../models/Shift";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Tipo auxiliar para el formulario
type ShiftFormValues = Omit<Shift, "start_time" | "end_time"> & {
  start_time: string;
  end_time: string;
};

interface ShiftFormProps {
  mode: number;
  handleCreate?: (values: Shift) => void;
  handleUpdate?: (values: Shift) => void;
  shift?: Shift | null;
}

const ShiftFormValidator: React.FC<ShiftFormProps> = ({ mode, handleCreate, handleUpdate, shift }) => {
  const handleSubmit = (values: ShiftFormValues) => {
    const formattedValues: Shift = {
      ...values,
      start_time: new Date(values.start_time),
      end_time: new Date(values.end_time),
    };
    if (mode === 1 && handleCreate) {
      handleCreate(formattedValues);
    } else if (mode === 2 && handleUpdate) {
      handleUpdate(formattedValues);
    } else {
      console.error('No function provided for the current mode');
    }
  };

  const initialValues: ShiftFormValues = shift
    ? {
        ...shift,
        start_time: shift.start_time ? new Date(shift.start_time).toISOString().split('T')[0] : "",
        end_time: shift.end_time ? new Date(shift.end_time).toISOString().split('T')[0] : "",
      }
    : {
        start_time: "",
        end_time: "",
        status: "",
        driver_id: 0,
        motorcycle_id: 0,
      };

  return (
    <Formik<ShiftFormValues>
      initialValues={initialValues}
      validationSchema={Yup.object({
        start_time: Yup.string().required("La hora de inicio es obligatoria"),
        end_time: Yup.string().required("La hora de fin es obligatoria"),
        status: Yup.string().required("El estado es obligatorio"),
        driver_id: Yup.number().typeError("Debe ser un número").integer("Debe ser entero").positive("Debe ser positivo").required("El conductor es obligatorio"),
        motorcycle_id: Yup.number().typeError("Debe ser un número").integer("Debe ser entero").positive("Debe ser positivo").required("La motocicleta es obligatoria"),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
          <div>
            <label htmlFor="start_time" className="block text-lg font-medium text-gray-700">Hora de Inicio</label>
            <Field type="date" name="start_time" className="w-full border rounded-md p-2" />
            <ErrorMessage name="start_time" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="end_time" className="block text-lg font-medium text-gray-700">Hora de Fin</label>
            <Field type="date" name="end_time" className="w-full border rounded-md p-2" />
            <ErrorMessage name="end_time" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="status" className="block text-lg font-medium text-gray-700">Estado</label>
            <Field type="text" name="status" className="w-full border rounded-md p-2" />
            <ErrorMessage name="status" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="driver_id" className="block text-lg font-medium text-gray-700">ID Conductor</label>
            <Field type="number" name="driver_id" className="w-full border rounded-md p-2" />
            <ErrorMessage name="driver_id" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="motorcycle_id" className="block text-lg font-medium text-gray-700">ID Motocicleta</label>
            <Field type="number" name="motorcycle_id" className="w-full border rounded-md p-2" />
            <ErrorMessage name="motorcycle_id" component="p" className="text-red-500 text-sm" />
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

export default ShiftFormValidator;