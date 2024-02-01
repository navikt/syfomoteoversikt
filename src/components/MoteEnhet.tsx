import React, { ReactElement } from "react";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { OverforMote } from "./OverforMote";
import { MoteStatusResponsColumns } from "./MoteStatusResponsColumns";
import { DialogmoteArbeidstakerColumns } from "./MoteArbeidstakerColumns";
import { TruncatedTableColumn, VelgMoteColumn } from "./MoteTable";
import { useVeilederQuery } from "@/data/veiledere/veilederQueryHooks";
import { MoteDato } from "@/components/MoteDato";

interface MoteEnhetProps {
  mote: DialogmoterDTO;
}

const MoteEnhet = ({ mote }: MoteEnhetProps): ReactElement => {
  const veilederIdent = mote.tildeltVeilederIdent;
  const veilederQuery = useVeilederQuery(veilederIdent);

  const veilederNavn = () => {
    if (veilederQuery.isLoading) {
      return "Henter navn...";
    } else if (veilederQuery.data?.navn) {
      return veilederQuery.data.navn;
    }
    return "Fant ikke navn";
  };

  return (
    <tr>
      <VelgMoteColumn>
        <OverforMote mote={mote} />
      </VelgMoteColumn>
      <MoteDato mote={mote} />
      <TruncatedTableColumn>{veilederNavn()}</TruncatedTableColumn>
      <DialogmoteArbeidstakerColumns dialogmote={mote} />
      <MoteStatusResponsColumns mote={mote} />
    </tr>
  );
};

export default MoteEnhet;
