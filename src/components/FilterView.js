import React, { Component } from "react";
import { Table, Container } from "react-bootstrap";
import { Row, Form } from "react-bootstrap";


export default class FilterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        species: [],
        gender: []
      }
    };
  }

  componentDidMount() {
    this.setState({ filters: this.props.filters });
  }

  componentDidUpdate() {
    if (this.state.filters != this.props.filters) {
      this.setState({ filters: this.props.filters });
    }
  }

  render() {
    const filters = (
      <Table bordered hover>
        <thead>
          <tr>
            <th>
              <span className="float-left">Filters</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Container>
                <Row>
                  <b>Species</b>
                </Row>

                {this.props.filters.species != null &&
                  this.props.filters.species.map((item, index) => {
                    return (
                      <Row key={index}>
                        <Form.Check
                          name="species"
                          id={index}
                          type="checkbox"
                          label={item.name}
                          checked={item.selected}
                          onChange={()=>this.props.onSelectFilter("species",index)}
                        />
                      </Row>
                    );
                  })}
              </Container>
            </td>
          </tr>
          <tr>
          <td>
              <Container>
                <Row>
                  <b>Gender</b>
                </Row>

                {this.props.filters.gender != null &&
                  this.props.filters.gender.map((item, index) => {
                    return (
                      <Row key={index}>
                        <Form.Check
                          name="gender"
                          id={index}
                          type="checkbox"
                          label={item.name}
                          checked={item.selected}
                          onChange={()=>this.props.onSelectFilter("gender",index)}
                        />
                      </Row>
                    );
                  })}
              </Container>
            </td>
          </tr>
        </tbody>
      </Table>
    );

    return filters;
  }
}
