import React, { ReactElement } from "react";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { MarkerMote } from "./MarkerMote";
import { DialogmoteArbeidstakerColumns } from "./MoteArbeidstakerColumns";
import {
  StatusColumn,
  TruncatedTableColumn,
  VelgMoteColumn,
} from "./MoteTable";
import { useVeilederQuery } from "@/data/veiledere/veilederQueryHooks";
import { MoteDato } from "@/components/MoteDato";
import { statusTekst } from "@/utils/dialogmoterUtil";
import MoteresponsColumn from "@/components/MoteresponsColumn";

interface MoteEnhetProps {
  mote: DialogmoterDTO;
}

const MoteEnhet = ({ mote }: MoteEnhetProps): ReactElement => {
  const veilederIdent = mote.tildeltVeilederIdent;
  const veilederQuery = useVeilederQuery(veilederIdent);

  function veilederNavn(): string {
    return veilederQuery.isLoading
      ? "Henter navn..."
      : veilederQuery.data
      ? veilederQuery.data.fulltNavn()
      : "Fant ikke navn";
  }

  return (
    <tr>
      <VelgMoteColumn>
        <MarkerMote mote={mote} />
      </VelgMoteColumn>
      <MoteDato mote={mote} />
      <TruncatedTableColumn>{veilederNavn()}</TruncatedTableColumn>
      <DialogmoteArbeidstakerColumns dialogmote={mote} />
      <StatusColumn>{statusTekst(mote)}</StatusColumn>
      <MoteresponsColumn dialogmote={mote} />
    </tr>
  );
};

export default MoteEnhet;
