import React, { useEffect, useRef, useState } from "react";
import DropdownSelectItem from "./DropdownSelectItem";
import './dropdownselect.css'

const DropDownSelect = ({
  data,
  fetchingCallback,
  placeholder,
  label,
  onItemClick,
  closesOnItemClick,
  parentState,
  setParentState,
  parentProperty,
}) => {
  const [value, setValue] = useState("")
  const [isOpen, setIsOpen] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);


  const onClick = (e)=>{
    if(closesOnItemClick){
      setIsOpen(false)
    }
    setValue(e.currentTarget.id.split(' ')[0])
    onItemClick(e)
  }
  useEffect(() => {
    if (fetchingCallback && !fetchedData && isOpen) {
      fetchingCallback().then((res) => setFetchedData(res));
    }
    return;
  }, [isOpen]);

  return (
    <div className="dropdownselect_container" 
    tabIndex='-1'
    onBlur={e => e.relatedTarget === null && setIsOpen(false)}
    >
      <div className="input_container">
        <label>{label}</label>
        <input
          onFocus={() => {
            setIsOpen(true);
          }}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            setValue(e.target.value);
            setParentState({...parentState, [parentProperty]: e.target.value })
          }}
        />
      </div>
      
      {isOpen
        ? fetchingCallback
          ? fetchedData
            ? fetchedData.filter(item=> item.name.includes(value)).map((item, index) => {
                return (
                  <DropdownSelectItem
                    key={item.name + index}
                    name={item.name}
                    logo={item.logo}
                    index={index}
                    onClick={onClick}
                  />
                );
              })
            : null
          : data.map((item, index) => {
              return (
                <DropdownSelectItem
                  key={item.name + index}
                  name={item.name}
                  logo={item.logo}
                  index={index}
                  onClick={onClick}
                />
              );
            })
        : null}
    </div>
  );
};

export default DropDownSelect;

DropDownSelect.defaultProp;
