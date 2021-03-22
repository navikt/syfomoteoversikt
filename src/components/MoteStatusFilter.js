import { Select } from "nav-frontend-skjema";
import React from "react";
import { statuser } from "../utils/moterUtil";

export const MoteStatusFilter = ({ moteStatuser, onFilterChange }) => {
  return (
    <Select
      id="moteoversikt-filtrer"
      label="Filtrer på status"
      onChange={(e) => onFilterChange(e.currentTarget.value)}
    >
      <option value="alle">Vis alle</option>
      {moteStatuser.map((status, index) => (
        <option key={index} value={status}>
          {statuser[status]}
        </option>
      ))}
    </Select>
  );
};
