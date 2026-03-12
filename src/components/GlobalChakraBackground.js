import React, { useEffect } from "react";
import chakra from "../Assets/ashoka-chakra.svg";

const styles = `
.global-chakra-bg{
position:fixed;
top:50%;
left:50%;
transform:translate(-50%,-50%);
width:1100px;
opacity:0.04;
pointer-events:none;
z-index:0;
animation:chakraRotate 120s linear infinite;
}

@keyframes chakraRotate{
from{transform:translate(-50%,-50%) rotate(0deg)}
to{transform:translate(-50%,-50%) rotate(360deg)}
}
`;

function GlobalChakraBackground() {
  useEffect(() => {
    if (!document.getElementById("chakra-global-style")) {
      const tag = document.createElement("style");
      tag.id = "chakra-global-style";
      tag.innerHTML = styles;
      document.head.appendChild(tag);
    }

    return () => {
      document.getElementById("chakra-global-style")?.remove();
    };
  }, []);

  return <img src={chakra} alt="chakra" className="global-chakra-bg" />;
}

export default GlobalChakraBackground;
