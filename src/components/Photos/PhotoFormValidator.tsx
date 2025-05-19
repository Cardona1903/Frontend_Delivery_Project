import { Photo } from "../../models/Photo";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Tipo auxiliar para el formulario
type PhotoFormValues = Omit<Photo, "taken_at"> & {
  taken_at: string;
};

interface PhotoFormProps {
  mode: number;
  handleCreate?: (values: Photo) => void;
  handleUpdate?: (values: Photo) => void;
  photo?: Photo | null;
}

const PhotoFormValidator: React.FC<PhotoFormProps> = ({ mode, handleCreate, handleUpdate, photo }) => {
  const handleSubmit = (values: PhotoFormValues) => {
    const formattedValues: Photo = {
      ...values,
      taken_at: new Date(values.taken_at),
    };
    if (mode === 1 && handleCreate) {
      handleCreate(formattedValues);
    } else if (mode === 2 && handleUpdate) {
      handleUpdate(formattedValues);
    } else {
      console.error('No function provided for the current mode');
    }
  };

  const initialValues: PhotoFormValues = photo
    ? {
        ...photo,
        taken_at: photo.taken_at ? new Date(photo.taken_at).toISOString().split('T')[0] : "",
      }
    : {
        issue_id: 0,
        image_url: "",
        caption: "",
        taken_at: "",
      };

  return (
    <Formik<PhotoFormValues>
      initialValues={initialValues}
      validationSchema={Yup.object({
        issue_id: Yup.number().typeError("Debe ser un número").integer("Debe ser entero").positive("Debe ser positivo").required("El problema es obligatorio"),
        image_url: Yup.string().url("Debe ser una URL válida").required("La URL de la imagen es obligatoria"),
        caption: Yup.string(),
        taken_at: Yup.string().required("La fecha es obligatoria"),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
          <div>
            <label htmlFor="issue_id" className="block text-lg font-medium text-gray-700">ID Problema</label>
            <Field type="number" name="issue_id" className="w-full border rounded-md p-2" />
            <ErrorMessage name="issue_id" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="image_url" className="block text-lg font-medium text-gray-700">URL Imagen</label>
            <Field type="text" name="image_url" className="w-full border rounded-md p-2" />
            <ErrorMessage name="image_url" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="caption" className="block text-lg font-medium text-gray-700">Descripción</label>
            <Field type="text" name="caption" className="w-full border rounded-md p-2" />
            <ErrorMessage name="caption" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="taken_at" className="block text-lg font-medium text-gray-700">Fecha</label>
            <Field type="date" name="taken_at" className="w-full border rounded-md p-2" />
            <ErrorMessage name="taken_at" component="p" className="text-red-500 text-sm" />
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

export default PhotoFormValidator;