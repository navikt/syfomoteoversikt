import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Column, Row } from "nav-frontend-grid";
import NavFrontendSpinner from "nav-frontend-spinner";
import Side from "../sider/Side";
import Feilmelding from "../components/Feilmelding";
import NavigasjonsTopp from "../components/NavigasjonsTopp";
import { hentEnhetsMoter } from "@/data/moter/moterEnhet_actions";
import { useMoterEnhet } from "@/hooks/useMoterEnhet";
import EnhetensMoter from "../components/EnhetensMoter";
import { useAktivEnhet } from "@/data/enhet/enhet_hooks";
import { useDialogmoter } from "@/data/dialogmoter/dialogmoter_hooks";
import { hentDialogmoter } from "@/data/dialogmoter/dialogmoter_actions";
import {
  resetAntallDialogmoterOverfort,
  resetAntallMoterOverfort,
} from "@/data/overfor/overfor_actions";

const texts = {
  ingenMoter: "Enheten har ingen møter",
};

const EnhetensMoterContainer = (): ReactElement => {
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
    dispatch(resetAntallMoterOverfort());
    dispatch(resetAntallDialogmoterOverfort());
  }, [dispatch]);

  useEffect(() => {
    if (aktivEnhet !== hentetMoterForEnhet) {
      dispatch(hentEnhetsMoter(aktivEnhet));
    }
  }, [dispatch, aktivEnhet, hentetMoterForEnhet]);

  useEffect(() => {
    if (aktivEnhet !== hentetDialogmoterForEnhet) {
      dispatch(hentDialogmoter(aktivEnhet));
    }
  }, [dispatch, aktivEnhet, hentetDialogmoterForEnhet]);

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
          return <p>{texts.ingenMoter}</p>;
        })()}
      </Column>
    </Side>
  );
};

export default EnhetensMoterContainer;
