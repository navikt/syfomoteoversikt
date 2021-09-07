import React, { ReactElement, useEffect } from "react";
import { Container, Row } from "nav-frontend-grid";
import Decorator from "../decorator/Decorator";
import DocumentTitle from "react-document-title";
import { trackPageLoad } from "@/amplitude/amplitude";
import { useAktivEnhet } from "@/context/aktivEnhet/AktivEnhetContext";

interface SideProps {
  tittel: string;
  children: React.ReactNode;
}

const Side = ({ tittel, children }: SideProps): ReactElement => {
  const { aktivEnhet } = useAktivEnhet();

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
