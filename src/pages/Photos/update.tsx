import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { updatePhoto, getPhotoById } from "../../services/PhotoService";
import Swal from "sweetalert2";

import { Photo } from '../../models/Photo';
import PhotoFormValidator from '../../components/Photos/PhotoFormValidator';
import Breadcrumb from "../../components/Breadcrumb";

const UpdatePhotoPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [photo, setPhoto] = useState<Photo | null>(null);

    useEffect(() => {
        const fetchPhoto = async () => {
            if (!id) return;
            const data = await getPhotoById(parseInt(id));
            setPhoto(data);
        };
        fetchPhoto();
    }, [id]);

    const handleUpdatePhoto = async (thePhoto: Photo) => {
        try {
            const updated = await updatePhoto(thePhoto.id || 0, thePhoto);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/photos/list");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar el registro",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar el registro",
                icon: "error",
                timer: 3000
            });
        }
    };

    if (!photo) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Foto" />
            <PhotoFormValidator
                handleUpdate={handleUpdatePhoto}
                mode={2}
                photo={photo}
            />
        </>
    );
};

export default UpdatePhotoPage;