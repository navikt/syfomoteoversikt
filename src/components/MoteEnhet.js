import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "nav-frontend-skjema";
import { finnNavn, finnVeilederNavn, getDatoFraZulu } from "../utils";
import { useDispatch } from "react-redux";
import { hentBruker } from "../data/bruker/bruker_actions";
import { hentFnr } from "../data/fnr/fnr_actions";
import { hentVeileder } from "../data/veiledere/veileder_actions";
import { markerMoteForOverforing } from "../data/moter/moterEnhet_actions";
import { deltakerSvarStatus } from "../utils/statuser";
import { useOverforMoter } from "../hooks/useOverforMoter";

const MoteEnhet = ({ mote }) => {
  const { moterMarkertForOverforing } = useOverforMoter();
  const dispatch = useDispatch();

  const bruker = mote.deltakere.find(
    (deltaker) => deltaker.type.toUpperCase() === "BRUKER"
  );
  const svarStatus = deltakerSvarStatus(mote);
  const markert = moterMarkertForOverforing.some(
    (markertMoteUuid) => mote.moteUuid === markertMoteUuid
  );

  useEffect(() => {
    if (!bruker.navn && mote.aktorId) {
      dispatch(hentBruker(mote.aktorId, mote.moteUuid));
    }
    if (!bruker.fnr && mote.aktorId) {
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
      <td>{finnNavn(bruker)}</td>
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

MoteEnhet.propTypes = {
  mote: PropTypes.object,
};

export default MoteEnhet;
