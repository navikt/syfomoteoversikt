import React, { ReactElement } from "react";
import MoteoversiktEnhet from "../../components/MoteoversiktEnhet";
import { useEnhetensDialogmoterQuery } from "@/data/dialogmoter/dialogmoterQueryHooks";

const texts = {
  ingenMoter: "Enheten har ingen aktive møter.",
};

export default function EnhetensMoter(): ReactElement {
  const dialogmoterQuery = useEnhetensDialogmoterQuery();
  const harMoter =
    dialogmoterQuery.isSuccess && dialogmoterQuery.data.length > 0;

  return (
    <div>
      {!harMoter && (
        <div className="panel">
          <p>{texts.ingenMoter}</p>
        </div>
      )}
      {harMoter && <MoteoversiktEnhet />}
    </div>
  );
}
