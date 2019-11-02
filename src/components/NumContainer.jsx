import React from "react";

import Cell from "./Cell";

const NumContainer = ({ gd }) => {
  var nums = [];
  gd.map((row, keyRow) => {
    return row.map((el, keyCol) => {
      var keymark = keyCol + "-" + keyRow + "-" + gd[keyRow][keyCol].value;
      if (el.value > 0) {
        nums.push(<Cell gameData={el} keymark={keymark} key={keymark} />);
      }
    });
  });
  return (
    <>
      <div className="num-container">{nums}</div>
    </>
  );
};

export default NumContainer;
