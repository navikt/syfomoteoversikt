import React, { ReactElement, useEffect } from "react";
import { Container, Column, Row } from "nav-frontend-grid";
import DocumentTitle from "react-document-title";
import styled from "styled-components";
import Decorator from "../decorator/Decorator";
import { trackPageLoad } from "@/amplitude/amplitude";
import { useAktivEnhet } from "@/context/aktivEnhet/AktivEnhetContext";

interface SideFullbreddeProps {
  tittel: string;
  children: React.ReactNode;
}

const StyledContainer = styled(Container)`
  width: 95%;
`;

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
        <StyledContainer>
          <Row>
            <Column>{children}</Column>
          </Row>
        </StyledContainer>
      </DocumentTitle>
    </>
  );
};

export default SideFullBredde;
