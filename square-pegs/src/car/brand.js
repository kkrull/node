import PropTypes from "prop-types";
import React from "react";

export function Brand({ id, isSelected, name, onClicked }) {
  const onClickedThis = () => onClicked(id);
  const classNames = (isSelected && "brand__name brand--selected") || "brand__name";

  return (
    <h3 className={classNames} onClick={onClickedThis}>
      {name}
    </h3>
  );
}

export default class BrandSelector extends React.Component {
  renderBrand({ id, name }, onBrandClicked, isSelected) {
    return (
      <Brand
        key={id}
        id={id}
        isSelected={isSelected}
        name={name}
        onClicked={onBrandClicked}
      />
    );
  }

  render() {
    console.log(`selection: ${this.props.selection}`);
    return (
      <div>
        {this.props.brands.map(x =>
          this.renderBrand(
            x,
            this.props.onBrandClicked,
            this.props.selection === x.id
          )
        )}
      </div>
    );
  }
}

BrandSelector.defaultProps = {
  brands: []
};

BrandSelector.propTypes = {
  brands: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  onBrandClicked: PropTypes.func.isRequired,
  selection: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired
};
