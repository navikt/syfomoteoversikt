import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { getDatoFraZulu, finnVirksomhet, finnNavn } from "../utils";
import { useDispatch } from "react-redux";
import { hentVirksomhet } from "../data/virksomhet/virksomhet_actions";
import { hentBruker } from "../data/bruker/bruker_actions";
import { hentFnr } from "../data/fnr/fnr_actions";
import { getBruker, deltakerSvarStatus, getLeder } from "../utils/moterUtil";

const Mote = ({ mote }) => {
  const dispatch = useDispatch();

  const bruker = getBruker(mote);
  const leder = getLeder(mote);
  const svarStatus = deltakerSvarStatus(mote);

  useEffect(() => {
    if (!leder.virksomhet && leder.orgnummer) {
      dispatch(hentVirksomhet(leder.orgnummer, mote.moteUuid));
    }
    if (!bruker.navn && mote.aktorId) {
      dispatch(hentBruker(mote.aktorId, mote.moteUuid));
    }

    if (!bruker.fnr && mote.aktorId) {
      dispatch(hentFnr(mote.aktorId, mote.moteUuid));
    }
  }, []);

  return (
    <tr>
      <td>{bruker?.fnr}</td>
      <td>{finnNavn(bruker)}</td>
      <td>{leder?.navn ?? "Ukjent"}</td>
      <td>{finnVirksomhet(leder)}</td>
      <td>{getDatoFraZulu(mote.sistEndret)}</td>
      <td>
        <span className="Motestatus">
          <span>{svarStatus}</span>
        </span>
      </td>
    </tr>
  );
};

Mote.propTypes = {
  mote: PropTypes.object,
};

export default Mote;
