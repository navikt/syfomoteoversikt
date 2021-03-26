import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Column, Row } from "nav-frontend-grid";
import NavFrontendSpinner from "nav-frontend-spinner";
import Side from "../sider/Side";
import Feilmelding from "../components/Feilmelding";
import NavigasjonsTopp from "../components/NavigasjonsTopp";
import {
  hentEnhetsMoter,
  resetOverforing,
} from "../data/moter/moterEnhet_actions";
import { hentDialogmoter } from "../data/dialogmoter/dialogmoter_actions";
import { useOverforMoter } from "../hooks/useOverforMoter";
import { useMoterEnhet } from "../hooks/useMoterEnhet";
import EnhetensMoter from "../components/EnhetensMoter";

const EnhetensMoterContainer = () => {
  const { harOvertattMoter } = useOverforMoter();
  const {
    aktivEnhet,
    henterMoter,
    hentMoterFeilet,
    moter,
    hentetEnhet,
  } = useMoterEnhet();
  const dispatch = useDispatch();

  useEffect(() => {
    if (harOvertattMoter) {
      dispatch(resetOverforing());
    }
  }, [harOvertattMoter]);

  useEffect(() => {
    if (aktivEnhet !== hentetEnhet) {
      dispatch(hentEnhetsMoter(aktivEnhet));
      dispatch(hentDialogmoter(aktivEnhet));
    }
  }, [aktivEnhet, hentetEnhet]);

  return (
    <Side tittel="Møteoversikt">
      <Column className="col-xs-12">
        <NavigasjonsTopp
          lenker={[
            {
              tittel: "Mine møter",
              url: "/syfomoteoversikt/minemoter",
              aktiv: false,
            },
            {
              tittel: "Enhetens møter",
              url: "/syfomoteoversikt/enhetensmoter",
              aktiv: true,
            },
          ]}
        />
        {(() => {
          if (!aktivEnhet) {
            return (
              <Feilmelding
                tittel={"Ingen aktiv enhet"}
                melding={
                  "Du må velge enhet i enhetsvelgeren i toppen av siden."
                }
              />
            );
          } else if (henterMoter) {
            return (
              <Row className="row-centered">
                <NavFrontendSpinner type="XL" />
              </Row>
            );
          } else if (hentMoterFeilet) {
            return <Feilmelding />;
          } else if (moter) {
            return <EnhetensMoter />;
          }
          return <p>Enheten har ingen møter</p>;
        })()}
      </Column>
    </Side>
  );
};

export default EnhetensMoterContainer;
