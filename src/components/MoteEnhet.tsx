import React, { ReactElement, useEffect } from "react";
import { getMoteDato } from "../utils/moterUtil";
import { MoteDTO } from "../data/moter/moterTypes";
import { useMoteVeileder } from "../hooks/useMoteVeileder";
import { DialogmoterDTO } from "../data/dialogmoter/dialogmoterTypes";
import { OverforMote } from "./OverforMote";
import { hentVeileder } from "../data/veiledere/veileder_actions";
import { useDispatch } from "react-redux";
import { isDialogmote } from "../utils/dialogmoterUtil";
import { MoteStatusResponsColumns } from "./MoteStatusResponsColumns";
import { MoteArbeidstakerColumns } from "./MoteArbeidstakerColumns";
import { getDatoFraZulu } from "../utils/dateUtil";
import {
  MoteDatoColumn,
  TruncatedTableColumn,
  VelgMoteColumn,
} from "./MoteTable";

interface MoteEnhetProps {
  mote: MoteDTO | DialogmoterDTO;
}

const MoteEnhet = ({ mote }: MoteEnhetProps): ReactElement => {
  const dispatch = useDispatch();
  const { getVeileder } = useMoteVeileder();
  const moteVeilederIdent = isDialogmote(mote)
    ? mote.tildeltVeilederIdent
    : mote.eier;

  useEffect(() => {
    if (moteVeilederIdent) {
      dispatch(hentVeileder({ ident: moteVeilederIdent }));
    }
  }, [dispatch, moteVeilederIdent]);

  const veilederNavn = (mote: MoteDTO | DialogmoterDTO) => {
    const veileder = getVeileder(mote);
    if (veileder?.navn) {
      return veileder.navn;
    } else if (veileder?.henter) {
      return "Henter navn...";
    }
    return "Fant ikke navn";
  };

  return (
    <tr>
      <VelgMoteColumn>
        <OverforMote mote={mote} />
      </VelgMoteColumn>
      <MoteDatoColumn>{getDatoFraZulu(getMoteDato(mote))}</MoteDatoColumn>
      <TruncatedTableColumn>{veilederNavn(mote)}</TruncatedTableColumn>
      <MoteArbeidstakerColumns mote={mote} />
      <MoteStatusResponsColumns mote={mote} />
    </tr>
  );
};

export default MoteEnhet;
