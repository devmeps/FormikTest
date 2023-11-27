// components/Formulario.tsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../app/globals.css'; // Ruta relativa al archivo de estilos globales
import {  FormikHelpers } from 'formik';
import { useToasts } from 'react-toast-notifications';

// ...resto del código


interface FormValues {
  name: string;
  email: string;
}

const Formulario: React.FC = () => {
  const validationSchema: Yup.Schema<FormValues> = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    email: Yup.string().email('Correo electrónico inválido').required('El correo es requerido').strict(),
  });

  const handleSubmit = (
  values: FormValues,
  formikHelpers: FormikHelpers<FormValues>,
  action: (values: FormValues) => void
) => {
  // ...

  if (formikHelpers.isValid && formikHelpers.isSubmitting) {
    // El formulario es válido y se está enviando
    // ...
    // Muestra la notificación
    const toast = useToast();
    toast.show({
      message: 'El correo ha sido enviado.',
      type: 'success',
    });
  }

  formikHelpers.setSubmitting(false);
};
  

  return (
    <div className="formContainer"> {/* Usa la clase de contenedor del formulario */}
      <h1>Formulario</h1>
      <Formik
        initialValues={{ name: '', email: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Nombre</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error" /> {/* Usa la clase de error */}
            </div>
            <div>
              <label htmlFor="email">Correo Electrónico</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" /> {/* Usa la clase de error */}
            </div>
            <button type="submit" disabled={isSubmitting}>
              Enviar
            </button>
          </Form>
          
        )}
      </Formik>
  
    </div>
  );
};

export default Formulario;
