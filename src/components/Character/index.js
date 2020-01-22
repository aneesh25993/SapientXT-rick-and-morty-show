import React, { Component } from "react";
import { Card, CardImg } from "react-bootstrap";
import Moment from "react-moment";
import PropListItem from "./propListItem";

export default class Character extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const description = `id : ${this.props.item.id} - created `;
    return (
      <React.Fragment>
        <Card className="card-character">
          <div style={{ position: "relative" }}>
            <CardImg variant="top" src={this.props.item.image}></CardImg>
            <div className="character-image-overlay">
              <div className="character-title">
                {this.props.item.name}
              </div>
              <div className="character-description">
                {description}
                <Moment fromNow>{this.props.item.created}</Moment>
              </div>
            </div>
          </div>

          <Card.Body>
            
              <PropListItem name="STATUS" value={this.props.item.status} />
            
            
              <PropListItem name="SPECIES" value={this.props.item.species} />
            
            
              <PropListItem name="GENDER" value={this.props.item.gender} />
            
            
              <PropListItem name="ORIGIN" value={this.props.item.origin.name} />
            
            
              <PropListItem
                name="LAST LOCATION"
                value={this.props.item.location.name}
              />
            
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}
