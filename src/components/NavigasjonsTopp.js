import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

const NavigasjonsTopp = ({ lenker }) => {
  return (
    <header className="navigasjon">
      <ul role="navigation" className="navigasjonsLenkeListe">
        {lenker.map((lenke) => {
          return (
            <li className="navigasjon__element" key={lenke.url}>
              <Link
                className={`navigasjon__element__inner${
                  lenke.aktiv ? "--active" : ""
                }`}
                to={lenke.url}
              >
                {lenke.tittel}
              </Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
};

NavigasjonsTopp.propTypes = {
  lenker: PropTypes.array,
};

export default NavigasjonsTopp;
