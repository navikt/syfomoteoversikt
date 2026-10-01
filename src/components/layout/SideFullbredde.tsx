import React, { ReactElement } from "react";
import { Column, Container, Row } from "@/components/layout/Layout";

interface SideFullbreddeProps {
  children: React.ReactNode;
}

const SideFullBredde = ({ children }: SideFullbreddeProps): ReactElement => {
  return (
    <Container>
      <Row>
        <Column>{children}</Column>
      </Row>
    </Container>
  );
};

export default SideFullBredde;
