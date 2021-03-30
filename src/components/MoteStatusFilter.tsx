import { Select } from "nav-frontend-skjema";
import React, { ReactElement } from "react";
import { statuser } from "../utils/moterUtil";

interface MoteStatusFilterProps {
  moteStatuser: string[];
  onFilterChange: (changedFilter: string) => void;
}

export const MoteStatusFilter = ({
  moteStatuser,
  onFilterChange,
}: MoteStatusFilterProps): ReactElement => (
  <Select
    id="moteoversikt-filtrer"
    label="Filtrer på status"
    onChange={(e) => onFilterChange(e.currentTarget.value)}
  >
    <option value="alle">Vis alle</option>
    {moteStatuser.map((status, index) => (
      <option key={index} value={status}>
        {statuser[status as keyof typeof statuser]}
      </option>
    ))}
  </Select>
);
