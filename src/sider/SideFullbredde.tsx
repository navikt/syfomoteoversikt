import React, { ReactElement, useEffect } from "react";
import DocumentTitle from "react-document-title";
import Decorator from "../decorator/Decorator";
import { trackPageLoad } from "@/amplitude/amplitude";
import { useAktivEnhet } from "@/context/aktivEnhet/AktivEnhetContext";
import { Column, Container, Row } from "@/components/layout/Layout";

interface SideFullbreddeProps {
  tittel: string;
  children: React.ReactNode;
}

const SideFullBredde = ({
  tittel,
  children,
}: SideFullbreddeProps): ReactElement => {
  const { aktivEnhet } = useAktivEnhet();

  useEffect(() => {
    trackPageLoad(tittel);
  }, [aktivEnhet, tittel]);

  return (
    <>
      <Decorator />

      <DocumentTitle title={tittel}>
        <Container>
          <Row>
            <Column>{children}</Column>
          </Row>
        </Container>
      </DocumentTitle>
    </>
  );
};

export default SideFullBredde;
