import React, { useEffect } from "react";
import { Row, Column } from "nav-frontend-grid";
import NavFrontendSpinner from "nav-frontend-spinner";
import Side from "../sider/Side";
import Feilmelding from "../components/Feilmelding";
import Moter from "../components/MineMoter";
import NavigasjonsTopp from "../components/NavigasjonsTopp";
import { useMoter } from "../hooks/useMoter";
import { hentMoter } from "../data/moter/moter_actions";
import { useDispatch } from "react-redux";

const MineMoterContainer = () => {
  const { moter, henterMoter, hentMoterFeilet } = useMoter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!henterMoter && !hentMoterFeilet && moter.length === 0) {
      dispatch(hentMoter());
    }
  }, []);

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
          if (henterMoter) {
            return (
              <Row className="row-centered">
                <NavFrontendSpinner type="XL" />
              </Row>
            );
          } else if (hentMoterFeilet) {
            return <Feilmelding />;
          } else if (moter) {
            return <Moter />;
          }
          return <p>Bruker har ingen møter</p>;
        })()}
      </Column>
    </Side>
  );
};

export default MineMoterContainer;
