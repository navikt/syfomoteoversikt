import React, { ReactElement } from "react";
import DocumentTitle from "react-document-title";
import Decorator from "../../decorator/Decorator";
import { Column, Container, Row } from "@/components/layout/Layout";

interface SideFullbreddeProps {
  tittel: string;
  children: React.ReactNode;
}

const SideFullBredde = ({
  tittel,
  children,
}: SideFullbreddeProps): ReactElement => {
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
