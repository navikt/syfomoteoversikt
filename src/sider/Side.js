import React from "react";
import PropTypes from "prop-types";
import { Container, Row } from "nav-frontend-grid";
import Decorator from "../decorator/Decorator";

const DocumentTitle = require("react-document-title");

const Side = ({ tittel = "", children }) => {
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

Side.propTypes = {
  children: PropTypes.object,
  tittel: PropTypes.string,
};

export default Side;
