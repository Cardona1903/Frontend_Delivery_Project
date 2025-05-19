import { Motorcycle } from "../../models/Motorcycle";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface MotorcycleFormProps {
  mode: number;
  handleCreate?: (values: Motorcycle) => void;
  handleUpdate?: (values: Motorcycle) => void;
  motorcycle?: Motorcycle | null;
}

const MotorcycleFormValidator: React.FC<MotorcycleFormProps> = ({ mode, handleCreate, handleUpdate, motorcycle }) => {
  const handleSubmit = (formattedValues: Motorcycle) => {
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
      initialValues={motorcycle ? motorcycle : {
        license_plate: "",
        brand: "",
        year: new Date().getFullYear(),
        status: "",
      }}
      validationSchema={Yup.object({
        license_plate: Yup.string().required("La placa es obligatoria"),
        brand: Yup.string().required("La marca es obligatoria"),
        year: Yup.number().typeError("Debe ser un número").integer("Debe ser entero").min(1900, "Año inválido").max(new Date().getFullYear(), "Año inválido").required("El año es obligatorio"),
        status: Yup.string().required("El estado es obligatorio"),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
          <div>
            <label htmlFor="license_plate" className="block text-lg font-medium text-gray-700">Placa</label>
            <Field type="text" name="license_plate" className="w-full border rounded-md p-2" />
            <ErrorMessage name="license_plate" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="brand" className="block text-lg font-medium text-gray-700">Marca</label>
            <Field type="text" name="brand" className="w-full border rounded-md p-2" />
            <ErrorMessage name="brand" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="year" className="block text-lg font-medium text-gray-700">Año</label>
            <Field type="number" name="year" className="w-full border rounded-md p-2" />
            <ErrorMessage name="year" component="p" className="text-red-500 text-sm" />
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

export default MotorcycleFormValidator;