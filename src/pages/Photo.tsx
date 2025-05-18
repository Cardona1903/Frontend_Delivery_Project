import React from "react";
import PhotoView from "../components/PhotoView";
import { Photo } from "../models/Photo";

const PhotosPage: React.FC = () => {
    const photo: Photo = {
        id: 1,
        issue_id: 1,
        image_url: "https://example.com/photos/incidencia-1.jpg",
        caption: "Fallo en el sistema de frenos",
        taken_at: new Date("2023-06-10T14:35:00")
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Detalles de la Foto</h1>
            <div className="max-w-md mx-auto">
                <PhotoView photo={photo} />
            </div>
        </div>
    );
};

export default PhotosPage;