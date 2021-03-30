import React, { ReactElement, useEffect } from "react";
import { Checkbox } from "nav-frontend-skjema";
import { finnVeilederNavn, getDatoFraZulu } from "../utils";
import { useDispatch } from "react-redux";
import { hentBruker } from "../data/bruker/bruker_actions";
import { hentFnr } from "../data/fnr/fnr_actions";
import { hentVeileder } from "../data/veiledere/veileder_actions";
import { getBruker, deltakerSvarStatus } from "../utils/moterUtil";
import { useOverforMoter } from "../hooks/useOverforMoter";
import { MoteMedVeilederDTO } from "../data/moter/moterTypes";
import { markerMoteForOverforing } from "../data/moter/overfor_actions";
import { BrukersNavn } from "./BrukersNavn";

interface MoteEnhetProps {
  mote: MoteMedVeilederDTO;
}

const MoteEnhet = ({ mote }: MoteEnhetProps): ReactElement => {
  const dispatch = useDispatch();
  const { moterMarkertForOverforing } = useOverforMoter();

  const bruker = getBruker(mote);
  const svarStatus = deltakerSvarStatus(mote);
  const markert = moterMarkertForOverforing.some(
    (markertMoteUuid: string) => mote.moteUuid === markertMoteUuid
  );

  useEffect(() => {
    if (!bruker?.navn && mote.aktorId) {
      dispatch(hentBruker(mote.aktorId, mote.moteUuid));
    }
    if (!bruker?.fnr && mote.aktorId) {
      dispatch(hentFnr(mote.aktorId, mote.moteUuid));
    }
    if (!mote.veileder && mote.eier) {
      dispatch(hentVeileder({ ident: mote.eier }));
    }
  }, []);

  return (
    <tr>
      <td>
        <Checkbox
          label={""}
          id={mote.moteUuid}
          checked={markert}
          onChange={(e) => {
            dispatch(markerMoteForOverforing(mote.moteUuid, e.target.checked));
          }}
        />
        <label htmlFor={mote.moteUuid} />
      </td>
      <td>{finnVeilederNavn(mote.veileder)}</td>
      <td>
        <BrukersNavn bruker={bruker} />
      </td>
      <td>{bruker?.fnr}</td>
      <td>{getDatoFraZulu(mote.sistEndret)}</td>
      <td>
        <span className="Motestatus">
          <span>{svarStatus}</span>
        </span>
      </td>
    </tr>
  );
};

export default MoteEnhet;
