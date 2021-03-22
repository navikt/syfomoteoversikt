import React from "react";

export const MoteOversiktHeading = ({ moter }) => {
  return (
    <h3 className="moteoversikt__meta">
      Viser {moter.length} {moter.length === 1 ? "møte" : "møter"}
    </h3>
  );
};
