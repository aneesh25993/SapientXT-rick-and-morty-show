import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

export default class PropListItem extends Component {
  render() {
    return (
      <React.Fragment>
        <Row className="propListItem">
          <Col md={5}>
            <div className="propListItem-name">{this.props.name}</div>
          </Col>
          <Col md={7}>
            <div className="propListItem-value">{this.props.value}</div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
