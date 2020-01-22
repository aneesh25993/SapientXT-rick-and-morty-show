import React, { Component } from "react";
import { Badge } from "react-bootstrap";
import {FaWindowClose} from 'react-icons/fa';

export default class FilterItem extends Component {
  render() {
    return (
      <Badge className = "filter-alert" variant="warning">{this.props.name}<FaWindowClose className="ml-1" onClick={this.props.onCloseClick}/> </Badge>
    );
  }
}
