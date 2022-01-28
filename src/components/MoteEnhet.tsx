import React, { ReactElement } from "react";
import { MoteDTO } from "@/data/moter/moterTypes";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { OverforMote } from "./OverforMote";
import { isDialogmote } from "@/utils/dialogmoterUtil";
import { MoteStatusResponsColumns } from "./MoteStatusResponsColumns";
import { MoteArbeidstakerColumns } from "./MoteArbeidstakerColumns";
import { TruncatedTableColumn, VelgMoteColumn } from "./MoteTable";
import { useVeilederQuery } from "@/data/veiledere/veilederQueryHooks";
import { MoteDato } from "@/components/MoteDato";

interface MoteEnhetProps {
  mote: MoteDTO | DialogmoterDTO;
}

const MoteEnhet = ({ mote }: MoteEnhetProps): ReactElement => {
  const veilederIdent = isDialogmote(mote)
    ? mote.tildeltVeilederIdent
    : mote.eier;
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
      <MoteArbeidstakerColumns mote={mote} />
      <MoteStatusResponsColumns mote={mote} />
    </tr>
  );
};

export default MoteEnhet;
