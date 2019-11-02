import React from "react";

const Grid = ({ gameSettings }) => {
  return (
    <div>
      <div className="grid-container">
        {gameSettings.map((row, r) => (
          <div key={r} className="grid-row">
            {row.map((_, i) => {
              return <div key={i} className="grid-cell"></div>;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
