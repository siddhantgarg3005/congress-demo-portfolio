import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Deputy Chief Minister, Madhya Pradesh",
          "Champion of Gaon · Garib · Kisan",
          "BJP State Committee Member",
          "Voice of Bhopal North",
          "Builder of New Madhya Pradesh",
          "Servant of the People 🙏",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 35,
        delay: 55,
      }}
    />
  );
}

export default Type;
