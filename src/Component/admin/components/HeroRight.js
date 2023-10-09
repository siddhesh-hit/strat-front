import React from "react";

const HeroRight = ({ data, details }) => {
  const length = data.length;
  return (
    <div className="heroDiv">
      <div>
        <h3>{details}</h3>
        <p>{length} entries found</p>
      </div>
      <button className="buttonCreate">+ Create new entry</button>
    </div>
  );
};

export default HeroRight;
