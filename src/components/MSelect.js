import React, { Component } from "react";
import ReactDOM from "react-dom";
// import { colourOptions } from "./data.js";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

export default class MSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: null,
      colourOptions: this.props.data
    };
  }
  
  handleChange = (selected) => {
    this.setState({
      optionSelected: selected
    });
  };

  render() {
    
    return (
        <>

      <span
        class="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Please selecet account(s)"
      >
        <ReactSelect
          options={this.state.colourOptions}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option
          }}
          onChange={this.handleChange}
          allowSelectAll={true}
          value={this.state.optionSelected}
        />
      </span>
        </>
    );
  }
}
