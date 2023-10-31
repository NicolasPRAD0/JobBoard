import React from "react";
import "./dropdownselect.css";

const DropdownSelectItem = ({ name, logo, onClick, index }) => {
  return (
    <div
      className="dropdownselect_item"
      onClick={onClick}
      id={`${name} ${index}`}
    >
      
      <img className="dropdownselect_item_logo" src={logo}></img>
      <div>{name}</div>
    </div>
  );
};

export default DropdownSelectItem;
