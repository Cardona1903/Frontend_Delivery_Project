import React from "react";
import { Issue } from "../models/Issue";

interface IssueDetailsProps {
    issue: Issue;
}

const IssueDetails: React.FC<IssueDetailsProps> = ({ issue }) => {
    return (
        <div className="issue-details">
            <h3>Incidencia #{issue.id}</h3>
            <p>Tipo: {issue.issue_type}</p>
            <p>Descripción: {issue.description}</p>
            <p>Reportado el: {issue.date_reported.toLocaleDateString()}</p>
            <p>Estado: {issue.status}</p>
            <p>ID Motocicleta: {issue.motorcycle_id}</p>
        </div>
    );
};

export default IssueDetails;