import React from "react";
import { Photo } from "../models/Photo";

interface PhotoViewProps {
    photo: Photo;
}

const PhotoView: React.FC<PhotoViewProps> = ({ photo }) => {
    return (
        <div className="photo-view">
            <img src={photo.image_url} alt={photo.caption || "Foto de incidencia"} />
            {photo.caption && <p>{photo.caption}</p>}
            <p>Tomada el: {photo.taken_at.toLocaleDateString()}</p>
            <p>ID Incidencia: {photo.issue_id}</p>
        </div>
    );
};

export default PhotoView;