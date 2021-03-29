import React from "react";

interface MoteOversiktHeadingProps {
  antallMoter: number;
}

export const MoteOversiktHeading = ({
  antallMoter,
}: MoteOversiktHeadingProps) => (
  <h3 className="moteoversikt__meta">
    Viser {antallMoter} {antallMoter === 1 ? "møte" : "møter"}
  </h3>
);
