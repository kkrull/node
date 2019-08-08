import PropTypes from "prop-types";
import React from "react";

import BrandSelector from "./brand";
import CarService from "./carService";
import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      selectedBrand: false
    };

    this.onBrandClicked = this.onBrandClicked.bind(this);
  }

  componentDidMount() {
    this.props.carService
      .fetchAllBrandNames()
      .then(brands => this.setState({ brands }));
  }

  onBrandClicked(id) {
    //TODO KDK: Fetch car models that exist, for the selected brand (or for all brands)
    // console.log(`Brand clicked: ${id}`);
    this.setState(oldState => {
      if(oldState.selectedBrand === id) {
        return { selectedBrand: false };
      } else {
        return { selectedBrand: id };
      }
    });
  }

  render() {
    return (
      <div className="app__container">
        <h1 className="app__greeting">Find Your Auto Parts</h1>

        <h2 className="app__brand-heading">Select a car make</h2>
        <BrandSelector
          brands={this.state.brands}
          onBrandClicked={this.onBrandClicked}
          selection={this.state.selectedBrand}
        />
      </div>
    );
  }
}

App.defaultProps = {
  carService: new CarService()
};

App.propTypes = {
  carService: PropTypes.exact({
    fetchAllBrandNames: PropTypes.func
  }).isRequired
};
