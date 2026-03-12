import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Leader of Opposition, Rajasthan",
          "Champion of Mahila Shakti 💪",
          "INC State Committee President",
          "Voice of Jaipur Central",
          "Farmer & Youth Advocate",
          "Serving People Since 2008 🙏",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 35,
        delay: 60,
      }}
    />
  );
}

export default Type;
