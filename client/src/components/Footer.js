import React from "react";
import { Container, Col } from "reactstrap";

const footer = () => {
  return (
    <Container fluid={true} className="text-center my-4">
      <Col className="text-muted" size="sm">
        trainit © 2019 <a href="https://www.linkedin.com/in/christianstandke">Christian Standke</a><span> &amp; </span> <a href="https://www.linkedin.com/in/anne-betting/">Anne Betting</a>
        <br/>"Humaaans" by Pablo Standley is licensed under CC BY
        4.0
      </Col>
    </Container>
  );
};

export default footer;
