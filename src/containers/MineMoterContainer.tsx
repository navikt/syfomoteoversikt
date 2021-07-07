import React, { ReactElement, useEffect } from "react";
import { Row, Column } from "nav-frontend-grid";
import NavFrontendSpinner from "nav-frontend-spinner";
import Side from "../sider/Side";
import Feilmelding from "../components/Feilmelding";
import Moter from "../components/MineMoter";
import NavigasjonsTopp from "../components/NavigasjonsTopp";
import { useMoter } from "../hooks/useMoter";
import { hentMoter } from "../data/moter/moter_actions";
import { useDispatch } from "react-redux";
import { useAktivEnhet } from "../data/enhet/enhet_hooks";
import { hentDialogmoter } from "../data/dialogmoter/dialogmoter_actions";
import { useDialogmoter } from "../data/dialogmoter/dialogmoter_hooks";
import { useOverforMoter } from "../hooks/useOverforMoter";
import { hentEnhetsMoter } from "../data/moter/moterEnhet_actions";

const texts = {
  ingenMoter: "Bruker har ingen møter",
};

const MineMoterContainer = (): ReactElement => {
  const { moter, henterMoter, hentMoterFeilet, hentetMoter } = useMoter();
  const { moterOverfort, dialogmoterOverfort } = useOverforMoter();
  const {
    hentetDialogmoterForEnhet,
    henterDialogmoter,
    hentDialogmoterFeilet,
    dialogmoter,
  } = useDialogmoter();
  const aktivEnhet = useAktivEnhet();
  const dispatch = useDispatch();

  const maaHenteMoter = !henterMoter && !hentMoterFeilet && !hentetMoter;

  useEffect(() => {
    if (maaHenteMoter || moterOverfort) {
      dispatch(hentMoter());
    }
  }, [dispatch, maaHenteMoter, moterOverfort]);

  useEffect(() => {
    if (moterOverfort) {
      dispatch(hentEnhetsMoter(aktivEnhet));
    }
  }, [dispatch, aktivEnhet, moterOverfort]);

  useEffect(() => {
    if (aktivEnhet !== hentetDialogmoterForEnhet || dialogmoterOverfort) {
      dispatch(hentDialogmoter(aktivEnhet));
    }
  }, [dispatch, aktivEnhet, hentetDialogmoterForEnhet, dialogmoterOverfort]);

  return (
    <Side tittel="Møteoversikt">
      <Column className="col-xs-12">
        <NavigasjonsTopp
          lenker={[
            {
              tittel: "Mine møter",
              url: "/syfomoteoversikt/minemoter",
              aktiv: true,
            },
            {
              tittel: "Enhetens møter",
              url: "/syfomoteoversikt/enhetensmoter",
              aktiv: false,
            },
          ]}
        />
        {(() => {
          if (henterMoter || henterDialogmoter) {
            return (
              <Row className="row-centered">
                <NavFrontendSpinner type="XL" />
              </Row>
            );
          } else if (hentMoterFeilet && hentDialogmoterFeilet) {
            return <Feilmelding />;
          } else if (moter || dialogmoter) {
            return <Moter />;
          }
          return <p>{texts.ingenMoter}</p>;
        })()}
      </Column>
    </Side>
  );
};

export default MineMoterContainer;
