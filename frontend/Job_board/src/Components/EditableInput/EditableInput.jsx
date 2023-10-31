import React, { useCallback, useEffect, useRef, useState } from "react";
import EditSVG from "../../assets/icons/edit.svg?react";
import SaveSVG from "../../assets/icons/save.svg?react";

import "./editableInput.css";

const EditableInput = ({ value, id, name, label, type, saveCallback }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(value);
  const inputRef = useRef();

  const handleKeyPress = (e)=>{
    if(e.key == 'Enter'){
      setIsEditing(false)
      handleSave(editingValue,value)
    }
  }

  useEffect(()=>{
    if(isEditing){
      window.addEventListener("keydown",handleKeyPress)
    }
    return()=>{
      window.removeEventListener("keydown",handleKeyPress)
    }
  },[isEditing,editingValue])

  const handleSave = async () => {

    if (editingValue !== value) {
      const hasUpdated = await saveCallback(editingValue, inputRef.current.id)
      if(!hasUpdated){
        setEditingValue(value)
      }
      ;
    }
    setIsEditing(false);
  };

  return (
    <div className="editableInput_container">
      <div className="editableInput_labelContainer">
        <label htmlFor={id}>{label}</label>

        <div className="editableInput_subContainer">
          {isEditing ? (
            <input
            type={type}
              id={id}
              name={name}
              ref={inputRef}
              value={editingValue}
              onChange={(e) => {
                setEditingValue(e.target.value);
              }}
            />
          ) : (
            <>
              <input
              type={type}
              id={id}
              name={name}
              ref={inputRef}
              value={editingValue}
              disabled
            />
            </>
          )}

          <button onClick={() => setIsEditing(true)}>
            <EditSVG />
          </button>
          <button disabled={!isEditing} onClick={handleSave}>
            <SaveSVG />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditableInput;
