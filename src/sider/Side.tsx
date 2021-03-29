import React, { ReactElement } from "react";
import { Container, Row } from "nav-frontend-grid";
import Decorator from "../decorator/Decorator";
import DocumentTitle from "react-document-title";

interface SideProps {
  tittel?: string;
  children: React.ReactNode;
}

const Side = ({ tittel = "", children }: SideProps): ReactElement => {
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
