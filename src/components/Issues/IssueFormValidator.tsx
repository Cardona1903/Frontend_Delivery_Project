import { Issue } from "../../models/Issue";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Tipo auxiliar para el formulario
type IssueFormValues = Omit<Issue, "date_reported"> & {
  date_reported: string;
};

interface IssueFormProps {
  mode: number;
  handleCreate?: (values: Issue) => void;
  handleUpdate?: (values: Issue) => void;
  issue?: Issue | null;
}

const IssueFormValidator: React.FC<IssueFormProps> = ({ mode, handleCreate, handleUpdate, issue }) => {
  const handleSubmit = (values: IssueFormValues) => {
    const formattedValues: Issue = {
      ...values,
      date_reported: new Date(values.date_reported),
    };
    if (mode === 1 && handleCreate) {
      handleCreate(formattedValues);
    } else if (mode === 2 && handleUpdate) {
      handleUpdate(formattedValues);
    } else {
      console.error('No function provided for the current mode');
    }
  };

  const initialValues: IssueFormValues = issue
    ? {
        ...issue,
        date_reported: issue.date_reported ? new Date(issue.date_reported).toISOString().split('T')[0] : "",
      }
    : {
        motorcycle_id: 0,
        description: "",
        issue_type: "",
        date_reported: "",
        status: "",
      };

  return (
    <Formik<IssueFormValues>
      initialValues={initialValues}
      validationSchema={Yup.object({
        motorcycle_id: Yup.number().typeError("Debe ser un número").integer("Debe ser entero").positive("Debe ser positivo").required("La motocicleta es obligatoria"),
        description: Yup.string().required("La descripción es obligatoria"),
        issue_type: Yup.string().required("El tipo de problema es obligatorio"),
        date_reported: Yup.string().required("La fecha es obligatoria"),
        status: Yup.string().required("El estado es obligatorio"),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
          <div>
            <label htmlFor="motorcycle_id" className="block text-lg font-medium text-gray-700">ID Motocicleta</label>
            <Field type="number" name="motorcycle_id" className="w-full border rounded-md p-2" />
            <ErrorMessage name="motorcycle_id" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="description" className="block text-lg font-medium text-gray-700">Descripción</label>
            <Field type="text" name="description" className="w-full border rounded-md p-2" />
            <ErrorMessage name="description" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="issue_type" className="block text-lg font-medium text-gray-700">Tipo de Problema</label>
            <Field type="text" name="issue_type" className="w-full border rounded-md p-2" />
            <ErrorMessage name="issue_type" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="date_reported" className="block text-lg font-medium text-gray-700">Fecha Reporte</label>
            <Field type="date" name="date_reported" className="w-full border rounded-md p-2" />
            <ErrorMessage name="date_reported" component="p" className="text-red-500 text-sm" />
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

export default IssueFormValidator;