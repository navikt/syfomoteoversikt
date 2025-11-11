import { Select } from "@navikt/ds-react";
import React, { ReactElement } from "react";

export enum MoteRespons {
  MOTTATT = "Respons mottatt",
  IKKE_MOTTATT = "Ingen respons",
}

const texts = {
  label: "Filtrer på respons",
  visAlle: "Vis alle",
};

interface MoteResponsFilterProps {
  moteResponser: MoteRespons[];
  onFilterChange: (changedFilter: MoteRespons) => void;
}

export const MoteResponsFilter = ({
  moteResponser,
  onFilterChange,
}: MoteResponsFilterProps): ReactElement => (
  <Select
    size="small"
    id="moteoversikt-filtrer"
    label={texts.label}
    onChange={(e) => onFilterChange(e.currentTarget.value as MoteRespons)}
  >
    <option value="alle">{texts.visAlle}</option>
    {moteResponser.map((respons, index) => (
      <option key={index} value={respons}>
        {respons}
      </option>
    ))}
  </Select>
);
