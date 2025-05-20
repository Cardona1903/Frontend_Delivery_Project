import React from 'react';
import { Issue } from '../../models/Issue';
import IssueFormValidator from '../../components/Issues/IssueFormValidator';

import Swal from 'sweetalert2';
import { createIssue } from "../../services/IssueService";
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate();

    const handleCreateIssue = async (issue: Issue) => {
        try {
            const createdIssue = await createIssue(issue);
            if (createdIssue) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/ListIssues");
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
            <h2>Create Issue</h2>
            <Breadcrumb pageName="Crear Incidencia" />
            <IssueFormValidator
                handleCreate={handleCreateIssue}
                mode={1}
            />
        </div>
    );
};

export default App;