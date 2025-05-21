// components/MotorcycleInfringementFormValidator.tsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MotorcycleInfringement } from "../../models/MotorcycleInfringement";

interface FormProps {
    initialValues?: MotorcycleInfringement;
    onSubmit: (values: MotorcycleInfringement) => void;
}

const validationSchema = Yup.object({
    date: Yup.date().required("La fecha es requerida"),
    motorcycle_id: Yup.number().required("Seleccione una motocicleta"),
    infringement_id: Yup.number().required("Seleccione una infracción")
});

export const MotorcycleInfringementFormValidator = ({ 
    initialValues, 
    onSubmit 
}: FormProps) => (
    <Formik
        initialValues={initialValues || {
            date: new Date().toISOString().split('T')[0],
            motorcycle_id: 0,
            infringement_id: 0
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
    >
        <Form className="space-y-4">
            <div>
                <label>Fecha</label>
                <Field type="date" name="date" className="input-field" />
                <ErrorMessage name="date" component="div" className="error-message" />
            </div>
            
            <div>
                <label>Motocicleta</label>
                <Field as="select" name="motorcycle_id" className="input-field">
                    <option value="">Seleccionar...</option>
                    {/* Opciones dinámicas desde API */}
                </Field>
                <ErrorMessage name="motorcycle_id" component="div" className="error-message" />
            </div>
            
            <div>
                <label>Infracción</label>
                <Field as="select" name="infringement_id" className="input-field">
                    <option value="">Seleccionar...</option>
                    {/* Opciones dinámicas desde API */}
                </Field>
                <ErrorMessage name="infringement_id" component="div" className="error-message" />
            </div>
            
            <button type="submit" className="submit-button">
                {initialValues ? "Actualizar" : "Crear"}
            </button>
        </Form>
    </Formik>
);