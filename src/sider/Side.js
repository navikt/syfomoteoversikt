import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Column } from "nav-frontend-grid";
import ContextContainer from "../context/ContextContainer";

const DocumentTitle = require("react-document-title");

const Side = ({ tittel = "", children }) => {
  return (
    <DocumentTitle title={tittel}>
      <Container>
        <Row>
          <Column className="col-xs-12">
            <ContextContainer />
          </Column>
        </Row>
        <Row>{children}</Row>
      </Container>
    </DocumentTitle>
  );
};

Side.propTypes = {
  children: PropTypes.object,
  tittel: PropTypes.string,
};

export default Side;
