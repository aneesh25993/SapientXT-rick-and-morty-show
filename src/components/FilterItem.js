import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";

export default class FilterItem extends Component {
  render() {
    const cardBody = this.props.filterItems.map((item, index) => {
      return (
        <InputGroup.Checkbox key={index} id={index}>
          {item}
        </InputGroup.Checkbox>
      );
    });
    return (
      <Card>
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Text>{cardBody}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
