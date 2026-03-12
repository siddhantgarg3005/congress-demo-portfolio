import React, { useState } from "react";
import { Container } from "react-bootstrap";
import lotus from "../../Assets/lotus.png";

const styles = `
.join-section{
position:relative;
padding:120px 0;
background:linear-gradient(180deg,#070510,#090716);
text-align:center;
overflow:hidden;
}

.join-lotus{
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
width:420px;
opacity:0.05;
pointer-events:none;
animation:spin 90s linear infinite;
}

@keyframes spin{
0%{transform:translate(-50%,-50%) rotate(0)}
100%{transform:translate(-50%,-50%) rotate(360deg)}
}

.join-title{
font-family:'Outfit',sans-serif;
font-size:2.5rem;
font-weight:800;
color:white;
margin-bottom:10px;
}

.join-sub{
color:#FF9933;
font-size:1rem;
margin-bottom:40px;
}

.join-buttons{
display:flex;
justify-content:center;
gap:20px;
flex-wrap:wrap;
}

.join-btn{
padding:14px 28px;
border-radius:30px;
border:1px solid rgba(255,153,51,0.4);
background:rgba(255,153,51,0.05);
color:white;
font-weight:600;
transition:0.3s;
cursor:pointer;
}

.join-btn:hover{
background:#FF9933;
color:black;
transform:translateY(-3px);
}

.join-response{
margin-top:40px;
font-size:1.1rem;
color:#FF9933;
font-family:'Outfit',sans-serif;
}
`;

function JoinMovement() {
  const [response, setResponse] = useState("");

  return (
    <>
      <style>{styles}</style>

      <section className="join-section">
        <img src={lotus} alt="" className="join-lotus" />

        <Container>
          <h2 className="join-title">Join the Movement</h2>

          <p className="join-sub">
            Do you believe in the vision of development and progress?
          </p>

          <div className="join-buttons">
            <div
              className="join-btn"
              onClick={() =>
                setResponse(
                  "🪷 Thank you for supporting the vision of development.",
                )
              }
            >
              🪷 I Support the Vision
            </div>

            <div
              className="join-btn"
              onClick={() =>
                setResponse(
                  "📢 Amazing! Our team welcomes volunteers who want to serve the people.",
                )
              }
            >
              📢 I Want to Volunteer
            </div>

            <div
              className="join-btn"
              onClick={() =>
                setResponse(
                  "🤝 Feel free to explore the journey and achievements.",
                )
              }
            >
              🤝 Just Exploring
            </div>
          </div>

          {response && <div className="join-response">{response}</div>}
        </Container>
      </section>
    </>
  );
}

export default JoinMovement;
