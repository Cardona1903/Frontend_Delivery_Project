import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { updateIssue, getIssueById } from "../../services/IssueService";
import Swal from "sweetalert2";

import { Issue } from '../../models/Issue';
import IssueFormValidator from '../../components/Issues/IssueFormValidator';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateIssuePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [issue, setIssue] = useState<Issue | null>(null);

    useEffect(() => {
        const fetchIssue = async () => {
            if (!id) return;
            const data = await getIssueById(parseInt(id));
            setIssue(data);
        };
        fetchIssue();
    }, [id]);

    const handleUpdateIssue = async (theIssue: Issue) => {
        try {
            const updated = await updateIssue(theIssue.id || 0, theIssue);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/issues/list");
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

    if (!issue) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Incidencia" />
            <IssueFormValidator
                handleUpdate={handleUpdateIssue}
                mode={2}
                issue={issue}
            />
        </>
    );
};

export default UpdateIssuePage;