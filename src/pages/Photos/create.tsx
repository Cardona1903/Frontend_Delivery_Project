import React from 'react';
import { Photo } from '../../models/Photo';
import PhotoFormValidator from '../../components/Photos/PhotoFormValidator';

import Swal from 'sweetalert2';
import { createPhoto } from "../../services/PhotoService";
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate();

    const handleCreatePhoto = async (photo: Photo) => {
        try {
            const createdPhoto = await createPhoto(photo);
            if (createdPhoto) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/photos/list");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de crear el registro",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de crear el registro",
                icon: "error",
                timer: 3000
            });
        }
    };

    return (
        <div>
            <h2>Create Photo</h2>
            <Breadcrumb pageName="Crear Foto" />
            <PhotoFormValidator
                handleCreate={handleCreatePhoto}
                mode={1}
            />
        </div>
    );
};

export default App;