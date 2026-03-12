import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import bjpLogo from "../../Assets/bjp-logo.png";

const footerStyles = `
  .bjp-footer {
    position: relative;
    background: linear-gradient(180deg, rgba(4,3,10,0) 0%, rgba(4,3,10,0.98) 12%);
    border-top: 1px solid rgba(255,153,51,0.08);
    padding: 56px 0 24px;
    overflow: hidden;
  }

  /* subtle saffron glow at top */
  .bjp-footer::before {
    content: '';
    position: absolute; top: 0; left: 50%;
    transform: translateX(-50%);
    width: 60%; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,153,51,0.4), transparent);
  }

  /* faint ashoka watermark */
  .bjp-footer-wm {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18rem; line-height: 1;
    opacity: 0.015; pointer-events: none;
    user-select: none;
    animation: wmSpin 120s linear infinite;
  }
  @keyframes wmSpin { to { transform: translate(-50%,-50%) rotate(360deg); } }

  .bjp-footer-inner { position: relative; z-index: 1; }

  /* brand */
  .bjp-foot-brand { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
  .bjp-foot-logo  { width: 36px; height: 36px; object-fit: contain; filter: drop-shadow(0 0 8px rgba(255,153,51,0.4)); }
  .bjp-foot-name  { font-family:'Outfit',sans-serif; font-size:1em; font-weight:800; color:#fff; line-height:1.2; }
  .bjp-foot-party { font-family:'Outfit',sans-serif; font-size:0.62em; font-weight:600; color:#FF9933; letter-spacing:1.5px; text-transform:uppercase; }
  .bjp-foot-tagline { font-family:'Tiro Devanagari Hindi',serif; font-size:0.85em; color:rgba(255,153,51,0.45); margin-bottom:10px; }
  .bjp-foot-bio { font-family:'Outfit',sans-serif; font-size:0.78em; color:rgba(255,255,255,0.3); line-height:1.75; max-width:260px; }

  /* column titles */
  .bjp-foot-title {
    font-family:'Outfit',sans-serif; font-size:0.68em; font-weight:700;
    letter-spacing:2.5px; text-transform:uppercase;
    color:rgba(255,153,51,0.5); margin-bottom:18px;
  }

  /* nav links */
  .bjp-foot-nav { list-style:none; padding:0; margin:0; }
  .bjp-foot-nav li { margin-bottom:10px; }
  .bjp-foot-nav a {
    font-family:'Outfit',sans-serif; font-size:0.84em;
    color:rgba(255,255,255,0.4); text-decoration:none;
    transition:all 0.25s ease; display:inline-flex; align-items:center; gap:7px;
  }
  .bjp-foot-nav a::before { content:'›'; color:#FF9933; font-size:1.1em; transition:transform 0.25s ease; }
  .bjp-foot-nav a:hover { color:#FF9933; padding-left:4px; }
  .bjp-foot-nav a:hover::before { transform:translateX(3px); }

  /* social buttons */
  .bjp-foot-socials { display:flex; flex-wrap:wrap; gap:8px; }
  .bjp-foot-social-btn {
    display:inline-flex; align-items:center; gap:6px;
    padding:7px 14px; border-radius:20px;
    background:rgba(255,255,255,0.04);
    border:1px solid rgba(255,255,255,0.08);
    font-family:'Outfit',sans-serif; font-size:0.76em; font-weight:600;
    color:rgba(255,255,255,0.45); text-decoration:none;
    transition:all 0.25s ease;
  }
  .bjp-foot-social-btn:hover {
    background:rgba(255,153,51,0.1);
    border-color:rgba(255,153,51,0.3);
    color:#FF9933; transform:translateY(-2px);
  }

  /* contact */
  .bjp-foot-contact-row {
    display:flex; align-items:flex-start; gap:9px;
    margin-bottom:10px;
    font-family:'Outfit',sans-serif; font-size:0.78em;
    color:rgba(255,255,255,0.35); line-height:1.5;
  }
  .bjp-foot-contact-row .ico { color:#FF9933; flex-shrink:0; margin-top:1px; }

  /* divider */
  .bjp-foot-divider {
    height:1px;
    background:linear-gradient(90deg,transparent,rgba(255,153,51,0.12),transparent);
    margin:36px 0 20px;
  }

  /* bottom bar */
  .bjp-foot-bottom {
    display:flex; align-items:center; justify-content:space-between;
    flex-wrap:wrap; gap:12px;
  }
  .bjp-foot-copy { font-family:'Outfit',sans-serif; font-size:0.74em; color:rgba(255,255,255,0.22); }
  .bjp-foot-copy span { color:#FF9933; }
  .bjp-foot-saath {
    font-family:'Tiro Devanagari Hindi',serif;
    font-size:0.76em; color:rgba(255,153,51,0.25);
  }
  .bjp-foot-jai {
    font-family:'Outfit',sans-serif; font-size:0.7em; font-weight:700;
    color:rgba(255,153,51,0.25); letter-spacing:2px; text-transform:uppercase;
  }

  .bjp-foot-dev {
    text-align: center;
    margin-top: 14px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.72em;
    color: rgba(255,255,255,0.2);
    letter-spacing: 0.3px;
  }
  .bjp-foot-dev a {
    color: #FF9933;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.25s ease;
  }
  .bjp-foot-dev a:hover {
    color: #fff;
    text-shadow: 0 0 12px rgba(255,153,51,0.6);
  }

  @media (max-width:767px) {
    .bjp-foot-bio { max-width:100%; }
    .bjp-foot-bottom { justify-content:center; text-align:center; }
    .bjp-footer { padding: 40px 0 20px; }
  }
`;

function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <style>{footerStyles}</style>
      <footer className="bjp-footer">
        <div className="bjp-footer-wm">☸</div>

        <Container className="bjp-footer-inner">
          <Row>
            {/* Brand */}
            <Col md={4} className="mb-4 mb-md-0">
              <div className="bjp-foot-brand">
                <img src={bjpLogo} alt="BJP" className="bjp-foot-logo" />
                <div>
                  <div className="bjp-foot-name">Vikram Singh Chauhan</div>
                  <div className="bjp-foot-party">भारतीय जनता पार्टी</div>
                </div>
              </div>
              <div className="bjp-foot-tagline">
                विकास की राह पर, जनता के साथ हमेशा
              </div>
              <p className="bjp-foot-bio">
                Deputy Chief Minister, Madhya Pradesh. Serving Bhopal North with
                dedication since 2013.
              </p>
            </Col>

            {/* Quick Links */}
            <Col md={2} sm={6} className="mb-4 mb-md-0">
              <div className="bjp-foot-title">Pages</div>
              <ul className="bjp-foot-nav">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/journey">Journey</Link>
                </li>
                <li>
                  <Link to="/vision">Vision & Work</Link>
                </li>
                <li>
                  <Link to="/achievements">Achievements</Link>
                </li>
              </ul>
            </Col>

            {/* Social */}
            <Col md={3} sm={6} className="mb-4 mb-md-0">
              <div className="bjp-foot-title">Follow</div>
              <div className="bjp-foot-socials">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bjp-foot-social-btn"
                >
                  𝕏 Twitter
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bjp-foot-social-btn"
                >
                  👥 Facebook
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bjp-foot-social-btn"
                >
                  📸 Instagram
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bjp-foot-social-btn"
                >
                  ▶️ YouTube
                </a>
              </div>
            </Col>

            {/* Contact */}
            <Col md={3}>
              <div className="bjp-foot-title">Contact</div>
              <div className="bjp-foot-contact-row">
                <span className="ico">📍</span>
                <span>Office No. 12, Vidhan Sabha Road, Bhopal, MP</span>
              </div>
              <div className="bjp-foot-contact-row">
                <span className="ico">📞</span>
                <span>+91 98XXXXXX00</span>
              </div>
              <div className="bjp-foot-contact-row">
                <span className="ico">✉️</span>
                <span>contact@vikramchauhan.in</span>
              </div>
              <div className="bjp-foot-contact-row">
                <span className="ico">🌐</span>
                <span>vikramsinghchauhan.in</span>
              </div>
            </Col>
          </Row>

          <div className="bjp-foot-divider" />

          <div className="bjp-foot-bottom">
            <div className="bjp-foot-copy">
              © {year} <span>Vikram Singh Chauhan</span>. All rights reserved.
            </div>
            <div className="bjp-foot-saath">
              सबका साथ · सबका विकास · सबका विश्वास
            </div>
            <div className="bjp-foot-jai">🪷 जय BJP</div>
          </div>

          <div className="bjp-foot-dev">
            Designed &amp; Developed by{" "}
            <a
              href="https://siddhantgarg.online"
              target="_blank"
              rel="noopener noreferrer"
            >
              Siddhant Garg
            </a>
          </div>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
