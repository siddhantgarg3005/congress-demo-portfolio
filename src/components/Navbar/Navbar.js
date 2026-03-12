import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { GoProject } from "react-icons/go";
import { SiGooglescholar } from "react-icons/si";

import bjpLogo from "../../Assets/bjp-logo.png";

const navStyles = `
.bjp-navbar{
background:rgba(10,8,18,0.85);
backdrop-filter:blur(10px);
border-bottom:1px solid rgba(255,153,51,0.25);
}

.bjp-navbar-brand{
display:flex;
align-items:center;
gap:12px;
text-decoration:none!important;
}

.bjp-nav-logo{
width:40px;
height:40px;
object-fit:contain;
filter:drop-shadow(0 0 10px rgba(255,153,51,0.6));
}

.bjp-brand-text{
display:flex;
flex-direction:column;
line-height:1.1;
}

.bjp-nav-name{
font-family:'Outfit',sans-serif;
font-size:0.95rem;
font-weight:800;
color:white;
}

.bjp-nav-party{
font-family:'Outfit',sans-serif;
font-size:0.65rem;
color:#FF9933;
letter-spacing:1px;
font-weight:600;
}

.bjp-nav-link{
display:flex!important;
align-items:center!important;
gap:6px!important;
font-family:'Outfit',sans-serif!important;
font-size:0.9rem!important;
font-weight:600!important;
color:rgba(255,255,255,0.75)!important;
padding:8px 18px!important;
border-radius:25px!important;
transition:all .25s ease!important;
}

.bjp-nav-link:hover{
color:#FF9933!important;
background:rgba(255,153,51,0.12)!important;
}

.navbar-toggler{
border:1px solid rgba(255,153,51,0.3)!important;
}

.navbar-toggler-icon{
background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255,153,51,0.8%29' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")!important;
}
`;

function NavBar() {
  const [expand, setExpand] = useState(false);

  return (
    <>
      <style>{navStyles}</style>

      <Navbar expand="md" fixed="top" className="bjp-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/" className="bjp-navbar-brand">
            <img src={bjpLogo} alt="BJP" className="bjp-nav-logo" />

            <div className="bjp-brand-text">
              <span className="bjp-nav-name">Vikram Singh Chauhan</span>

              <span className="bjp-nav-party">भारतीय जनता पार्टी</span>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setExpand(!expand)}
          />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className="bjp-nav-link">
                <AiOutlineHome /> Home
              </Nav.Link>

              <Nav.Link as={Link} to="/journey" className="bjp-nav-link">
                <AiOutlineUser /> Journey
              </Nav.Link>

              <Nav.Link as={Link} to="/vision" className="bjp-nav-link">
                <GoProject /> Vision
              </Nav.Link>

              <Nav.Link as={Link} to="/achievements" className="bjp-nav-link">
                <SiGooglescholar /> Achievements
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
