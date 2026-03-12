import React from "react";
import lotus from "../Assets/lotus.png";

export default function BJPLoader() {
  return (
    <div className="bjp-loader">
      <img src={lotus} className="bjp-loader-logo" alt="lotus" />
      <h3>भारतीय जनता पार्टी</h3>
    </div>
  );
}
