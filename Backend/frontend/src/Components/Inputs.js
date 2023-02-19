import React from "react";

const Inputs = ({ name, label, type, icon, onChangeHundler }) => {
  return (
    <div className=" mb-3">
      <label className="form-label">{label}</label>
      <div className="input-group">
        {icon && (
          <span className="input-group-text">
            <i className={icon}></i>
          </span>
        )}
        <input type={type} name={name} className="form-control" onChange={onChangeHundler}/>
      </div>
    </div>
  );
};

export default Inputs;
