import React from "react";
import PropTypes from "prop-types";
import AlertStripe from "nav-frontend-alertstriper";
import MoteoversiktEnhet from "./MoteoversiktEnhet";
import { setMoteStatus } from "../utils/statuser";

const Moter = ({ props }) => {
  const { moter, overtaMoterFeilet } = props;

  const moterMedStatus = moter.map(setMoteStatus).filter((mote) => {
    return mote.status !== "AVBRUTT";
  });
  return (
    <div>
      {overtaMoterFeilet && (
        <AlertStripe className="blokk" type="advarsel">
          Det skjedde en feil så du ikke fikk overtatt møtene
          <br />
          Prøv igjen senere
        </AlertStripe>
      )}
      {moterMedStatus.length === 0 && (
        <div className="panel">
          <p>Enheten har ingen aktive møter.</p>
        </div>
      )}
      {moterMedStatus.length > 0 && (
        <MoteoversiktEnhet {...props} moter={moterMedStatus} />
      )}
    </div>
  );
};

Moter.propTypes = {
  props: PropTypes.object,
  moter: PropTypes.array,
  overtaMoterFeilet: PropTypes.bool,
};

export default Moter;
