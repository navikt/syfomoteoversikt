import React, { ReactElement, useEffect } from "react";
import { Container, Row } from "nav-frontend-grid";
import Decorator from "../decorator/Decorator";
import DocumentTitle from "react-document-title";
import { useAktivEnhet } from "../data/enhet/enhet_hooks";
import { trackPageLoad } from "../amplitude/amplitude";

interface SideProps {
  tittel: string;
  children: React.ReactNode;
}

const Side = ({ tittel, children }: SideProps): ReactElement => {
  const aktivEnhet = useAktivEnhet();

  useEffect(() => {
    trackPageLoad(tittel);
  }, [aktivEnhet, tittel]);

  return (
    <>
      <Decorator />

      <DocumentTitle title={tittel}>
        <Container>
          <Row>{children}</Row>
        </Container>
      </DocumentTitle>
    </>
  );
};

export default Side;
