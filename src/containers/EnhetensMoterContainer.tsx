import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Column, Row } from "nav-frontend-grid";
import NavFrontendSpinner from "nav-frontend-spinner";
import Side from "../sider/Side";
import Feilmelding from "../components/Feilmelding";
import NavigasjonsTopp from "../components/NavigasjonsTopp";
import { hentEnhetsMoter } from "../data/moter/moterEnhet_actions";
import { useOverforMoter } from "../hooks/useOverforMoter";
import { useMoterEnhet } from "../hooks/useMoterEnhet";
import EnhetensMoter from "../components/EnhetensMoter";
import { resetOverforing } from "../data/moter/overfor_actions";
import { useAktivEnhet } from "../data/enhet/enhet_hooks";
import { useDialogmoter } from "../data/dialogmoter/dialogmoter_hooks";
import { hentDialogmoter } from "../data/dialogmoter/dialogmoter_actions";

const EnhetensMoterContainer = (): ReactElement => {
  const { harOvertattMoter } = useOverforMoter();
  const {
    henterMoter,
    hentMoterFeilet,
    moter,
    hentetMoterForEnhet,
  } = useMoterEnhet();
  const {
    hentetDialogmoterForEnhet,
    henterDialogmoter,
    hentDialogmoterFeilet,
    dialogmoter,
  } = useDialogmoter();
  const aktivEnhet = useAktivEnhet();
  const dispatch = useDispatch();

  useEffect(() => {
    if (harOvertattMoter) {
      dispatch(resetOverforing());
    }
  }, [harOvertattMoter]);

  useEffect(() => {
    if (aktivEnhet !== hentetMoterForEnhet) {
      dispatch(hentEnhetsMoter(aktivEnhet));
    }
  }, [aktivEnhet, hentetMoterForEnhet]);

  useEffect(() => {
    if (aktivEnhet !== hentetDialogmoterForEnhet) {
      dispatch(hentDialogmoter(aktivEnhet));
    }
  }, [aktivEnhet, hentetDialogmoterForEnhet]);

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
          } else if (henterMoter || henterDialogmoter) {
            return (
              <Row className="row-centered">
                <NavFrontendSpinner type="XL" />
              </Row>
            );
          } else if (hentMoterFeilet && hentDialogmoterFeilet) {
            return <Feilmelding />;
          } else if (moter || dialogmoter) {
            return <EnhetensMoter />;
          }
          return <p>Enheten har ingen møter</p>;
        })()}
      </Column>
    </Side>
  );
};

export default EnhetensMoterContainer;
