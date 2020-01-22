import React, { Component } from "react";
import Character from "../components/Character";
import { Row, Col, Container, Button, Alert } from "react-bootstrap";
import FilterView from "../components/FilterView";
import { FormControl } from "react-bootstrap";
import { Form } from "react-bootstrap";

export default class RickMortyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      unfilteredCharacters: [],
      page: 1,
      url: "https://rickandmortyapi.com/api/character/",
      isLoading: false,
      errormsg: "",
      showAlert: false,
      pageCount: 1,
      orderChar: "asc",
      searchName: "",
      name: "",
      filterOptions: {
        species: [],
        gender: []
      }
    };

    this.updateList = this.updateList.bind(this);
    this.onSelectFilter = this.onSelectFilter.bind(this);
  }

  componentDidMount() {
    this.updateList();
  }

  updateList() {
    this.setState({ isLoading: true });
    const searchName =
      this.state.searchName == "" ? "" : `&name=${this.state.searchName}`;
    const fetchURL = `${this.state.url}?page=${this.state.page}${searchName}`;
    fetch(fetchURL, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        if (data.error == null) {
          let charResults = data.results;

          let speciesFilterOptions = [];
          let genderFilterOptions = [];

          charResults.map(item => {
            if (speciesFilterOptions.indexOf(item.species) === -1)
              speciesFilterOptions.push(item.species);
            if (genderFilterOptions.indexOf(item.gender) === -1)
              genderFilterOptions.push(item.gender);
          });

          let sfilterOptions = [];
          speciesFilterOptions.map(item => {
            sfilterOptions.push({
              name: item,
              selected: false
            });
          });

          let gfilterOptions = [];
          genderFilterOptions.map(item => {
            gfilterOptions.push({
              name: item,
              selected: false
            });
          });

          const filterOptions = {
            species: sfilterOptions,
            gender: gfilterOptions
          };

          if (this.state.orderChar == "desc")
            charResults = charResults.reverse();
          this.setState(
            {
              pageCount: data.info.pages,
              characters: charResults,
              unfilteredCharacters: charResults,
              filterOptions: filterOptions
            },
          );
        } else
          this.setState({
            characters: [],
            unfilteredCharacters: []
          });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          errormsg:
            "Unable to connect to Rick & Morty API. Please try again later !",
          showAlert: true
        });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  changePage(e) {
    if (e.target.value == "Prev") {
      const newPage = this.state.page - 1;
      this.setState(
        {
          page: newPage
        },
        this.updateList
      );
    } else if (e.target.value == "Next") {
      const newPage = parseInt(this.state.page) + 1;
      this.setState(
        {
          page: newPage
        },
        this.updateList
      );
    } else {
      const newPage =
        e.target.value > this.state.pageCount
          ? this.state.pageCount
          : e.target.value;
      this.setState(
        {
          page: newPage
        },
        this.updateList
      );
    }
  }

  changeCharacterOrder(e) {
    let order = e.target.value;
    if (this.state.orderChar != order) {
      let charArr = this.state.characters;
      charArr = charArr.reverse();

      this.setState({
        characters: charArr,
        unfilteredCharacters: charArr,
        orderChar: order
      });
    }
  }

  handleSearch(e) {
    if (e.target.value == "search") {
      const searchParam = this.state.name;
      this.setState(
        {
          searchName: searchParam,
          page: 1
        },
        this.updateList
      );
    } else if (e.target.value == "clear") {
      this.setState(
        {
          searchName: "",
          name: ""
        },
        this.updateList
      );
    } else {
      this.setState({
        name: e.target.value
      });
    }
  }

  // onSelectFilter(filters) {
  onSelectFilter(type, id) {
    let currArr = this.state.unfilteredCharacters;
    let newArr = [];

    let sfilterOps = [];
    let gfilterOps = [];
    let filters = this.state.filterOptions;

    if (type === "species") {
      filters.species[id].selected = !filters.species[id].selected;
    } else if (type === "gender") {
      filters.gender[id].selected = !filters.gender[id].selected;
    }
    filters.species.map(item => {
      if (item.selected) sfilterOps.push(item.name);
    });
    filters.gender.map(item => {
      if (item.selected) gfilterOps.push(item.name);
    });

    if (sfilterOps.length === 0 && gfilterOps.length === 0) newArr = currArr;
    else {
      currArr.map(item => {
        if (sfilterOps.length > 0 && gfilterOps.length > 0) {
          if (
            sfilterOps.includes(item.species) &&
            gfilterOps.includes(item.gender)
          ) {
            newArr.push(item);
          }
        } else if (
          sfilterOps.includes(item.species) ||
          gfilterOps.includes(item.gender)
        ) {
          newArr.push(item);
        }
      });
    }

    this.state;
    this.setState({
      characters: newArr,
      filterOptions: filters
    });
  }

  render() {
    return (
      <Container className="mt-5">
        {this.state.showAlert && (
          <Alert
            variant="danger"
            onClose={() => this.setState({ errormsg: "", showAlert: false })}
            dismissible
          >
            <Alert.Heading>{this.state.errormsg}</Alert.Heading>
          </Alert>
        )}
        <Row>
          <Col xs={12} md={2}>
            <FilterView
              filters={this.state.filterOptions}
              onSelectFilter={this.onSelectFilter}
            />
          </Col>
          <Col>
            <Row>
              <Col xs={12} md={8}>
                <Row>
                  <b>Selected Filters</b>
                </Row>
                <Row>
                  {this.state.filterOptions.species.map((item, index) => {
                    return (
                      item.selected && (
                        <Alert
                          key={index}
                          className="filter-alert"
                          variant="success"
                          onClose={() => this.onSelectFilter("species", index)}
                          dismissible
                        >
                          <p className="ml-1">Species : {item.name}</p>
                        </Alert>
                      )
                    );
                  })}
                  {this.state.filterOptions.gender.map((item, index) => {
                    return (
                      item.selected && (
                        <Alert
                          key={index}
                          className="filter-alert"
                          variant="success"
                          onClose={() => this.onSelectFilter("gender", index)}
                          dismissible
                        >
                          <p className="ml-1">Gender : {item.name}</p>
                        </Alert>
                      )
                    );
                  })}
                </Row>
              </Col>
              <Col xs={12} md={4}>
                <Row>
                  <Col>
                    {this.state.page != 1 && (
                      <Button value="Prev" onClick={this.changePage.bind(this)}>
                        Prev
                      </Button>
                    )}
                  </Col>
                  <Col md={4}>
                    <FormControl
                      value={this.state.page}
                      onChange={this.changePage.bind(this)}
                    />{" "}
                    Out of {this.state.pageCount}
                  </Col>
                  <Col>
                    {this.state.page != this.state.pageCount && (
                      <Button value="Next" onClick={this.changePage.bind(this)}>
                        Next
                      </Button>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={8}>
                <Row>
                  <Col md={8}>
                    <FormControl
                      value={this.state.name}
                      onChange={this.handleSearch.bind(this)}
                      placeholder="Search by Name"
                    />
                  </Col>
                  <Col md={2}>
                    <Button
                      value="search"
                      onClick={this.handleSearch.bind(this)}
                    >
                      Search
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      value="clear"
                      variant="info"
                      onClick={this.handleSearch.bind(this)}
                    >
                      Clear
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={4}>
                <Row>
                  <Col md={4}>
                    <Form.Label>Sort by ID</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      as="select"
                      onChange={this.changeCharacterOrder.bind(this)}
                      defaultValue={this.state.orderChar}
                    >
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </Form.Control>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="container-character">
              {this.state.characters.length == 0
                ? `No characters found!!!`
                : this.state.characters.map(item => {
                    return (
                      <Col
                        sm={6}
                        md={3}
                        key={item.id}
                        className="container-character mt-1 mb-1"
                      >
                        <Character item={item} />
                      </Col>
                    );
                  })}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
