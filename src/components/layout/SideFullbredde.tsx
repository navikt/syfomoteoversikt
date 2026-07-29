import React, { ReactElement } from "react";
import DocumentTitle from "react-document-title";
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
    <DocumentTitle title={tittel}>
      <Container>
        <Row>
          <Column>{children}</Column>
        </Row>
      </Container>
    </DocumentTitle>
  );
};

export default SideFullBredde;
