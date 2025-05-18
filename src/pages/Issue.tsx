import React from "react";
import IssueDetails from "../components/IssueDetails";
import { Issue } from "../models/Issue";

const IssuesPage: React.FC = () => {
    const issue: Issue = {
        id: 1,
        motorcycle_id: 1,
        description: "Fallo en el sistema de frenos",
        issue_type: "Mecánico",
        date_reported: new Date("2023-06-10T14:30:00"),
        status: "En revisión"
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Detalles de la Incidencia</h1>
            <IssueDetails issue={issue} />
        </div>
    );
};

export default IssuesPage;