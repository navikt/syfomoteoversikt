import { Select } from "nav-frontend-skjema";
import React, { ReactElement } from "react";
import { trackOnClick } from "@/amplitude/amplitude";

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
  onFilterChange: (changedFilter: string) => void;
}

export const MoteResponsFilter = ({
  moteResponser,
  onFilterChange,
}: MoteResponsFilterProps): ReactElement => (
  <Select
    id="moteoversikt-filtrer"
    label={texts.label}
    onChange={(e) => {
      trackOnClick(`${texts.label} - ${e.currentTarget.value}`);
      onFilterChange(e.currentTarget.value);
    }}
  >
    <option value="alle">{texts.visAlle}</option>
    {moteResponser.map((respons, index) => (
      <option key={index} value={respons}>
        {respons}
      </option>
    ))}
  </Select>
);
