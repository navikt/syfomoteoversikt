import React from "react";
import { Link } from "react-router-dom";

interface Lenke {
  tittel: string;
  url: string;
  aktiv: boolean;
}

interface NavigasjonsToppProps {
  lenker: Lenke[];
}

const NavigasjonsTopp = ({ lenker }: NavigasjonsToppProps) => {
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

export default NavigasjonsTopp;
