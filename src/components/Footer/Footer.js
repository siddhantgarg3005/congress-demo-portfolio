import React from "react";
import { Link } from "react-router-dom";
import congressLogo from "../../Assets/congress-logo.png";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Tiro+Devanagari+Hindi&display=swap');

  .inc-footer {
    position: relative;
    background: rgba(3,9,22,0.99);
    border-top: 1px solid rgba(0,85,165,0.1);
    padding: 60px 0 0;
    overflow: hidden;
  }

  /* top glow line */
  .inc-ft-glow {
    position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    width: 55%; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0,85,165,0.5), transparent);
  }

  /* hand watermark */
  .inc-ft-wm {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20rem; opacity: 0.01; pointer-events: none; user-select: none;
    animation: wmSpin 90s linear infinite;
  }
  @keyframes wmSpin { to { transform: translate(-50%,-50%) rotate(360deg); } }

  .inc-ft-wrap {
    max-width: 1200px; margin: 0 auto; padding: 0 24px;
    position: relative; z-index: 1;
  }

  /* main grid */
  .inc-ft-grid {
    display: grid;
    grid-template-columns: 1.8fr 1fr 1.4fr 1.5fr;
    gap: 40px;
    padding-bottom: 40px;
  }

  /* brand col */
  .inc-ft-brand { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
  .inc-ft-logo  { width: 40px; height: 40px; object-fit: contain; filter: drop-shadow(0 0 8px rgba(0,85,165,0.45)); }
  .inc-ft-name  { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1em; color: #fff; line-height: 1.2; }
  .inc-ft-party { font-family: 'Outfit', sans-serif; font-size: 0.6em; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #0055A5; display: block; }
  .inc-ft-tagline { font-family: 'Tiro Devanagari Hindi', serif; font-size: 0.82em; color: rgba(0,85,165,0.42); margin-bottom: 12px; }
  .inc-ft-bio { font-family: 'Outfit', sans-serif; font-size: 0.78em; color: rgba(255,255,255,0.28); line-height: 1.78; max-width: 260px; }

  /* col titles */
  .inc-ft-col-title {
    font-family: 'Outfit', sans-serif; font-size: 0.66em; font-weight: 700;
    letter-spacing: 2.5px; text-transform: uppercase;
    color: rgba(0,85,165,0.5); margin-bottom: 18px;
  }

  /* nav links */
  .inc-ft-nav { list-style: none; padding: 0; margin: 0; }
  .inc-ft-nav li { margin-bottom: 10px; }
  .inc-ft-nav a {
    font-family: 'Outfit', sans-serif; font-size: 0.85em; font-weight: 500;
    color: rgba(255,255,255,0.38); text-decoration: none;
    display: inline-flex; align-items: center; gap: 7px;
    transition: all 0.25s ease;
  }
  .inc-ft-nav a::before { content: '›'; color: #0055A5; font-size: 1.1em; transition: transform 0.25s ease; }
  .inc-ft-nav a:hover { color: #0055A5; padding-left: 4px; }
  .inc-ft-nav a:hover::before { transform: translateX(3px); }

  /* social buttons */
  .inc-ft-socials { display: flex; flex-wrap: wrap; gap: 8px; }
  .inc-ft-sb {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 14px; border-radius: 20px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    font-family: 'Outfit', sans-serif; font-size: 0.76em; font-weight: 600;
    color: rgba(255,255,255,0.42); text-decoration: none;
    transition: all 0.25s ease;
  }
  .inc-ft-sb:hover {
    background: rgba(0,85,165,0.12);
    border-color: rgba(0,85,165,0.3);
    color: #4A9EDB; transform: translateY(-2px);
  }

  /* contact rows */
  .inc-ft-cr {
    display: flex; align-items: flex-start; gap: 10px;
    margin-bottom: 11px;
    font-family: 'Outfit', sans-serif; font-size: 0.79em;
    color: rgba(255,255,255,0.32); line-height: 1.55;
  }
  .inc-ft-cr-ico { color: #0055A5; flex-shrink: 0; margin-top: 1px; font-size: 0.95em; }

  /* divider */
  .inc-ft-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0,85,165,0.15), transparent);
    margin-bottom: 20px;
  }

  /* bottom bar */
  .inc-ft-bottom {
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 10px;
    padding-bottom: 16px;
  }
  .inc-ft-copy { font-family: 'Outfit', sans-serif; font-size: 0.74em; color: rgba(255,255,255,0.2); }
  .inc-ft-copy strong { color: #0055A5; font-weight: 700; }
  .inc-ft-saath { font-family: 'Tiro Devanagari Hindi', serif; font-size: 0.76em; color: rgba(0,85,165,0.22); }
  .inc-ft-jai { font-family: 'Outfit', sans-serif; font-size: 0.7em; font-weight: 700; color: rgba(0,85,165,0.22); letter-spacing: 2px; text-transform: uppercase; }

  /* dev credit */
  .inc-ft-dev {
    text-align: center; padding: 14px 0;
    font-family: 'Outfit', sans-serif; font-size: 0.72em;
    color: rgba(255,255,255,0.18); border-top: 1px solid rgba(255,255,255,0.04);
  }
  .inc-ft-dev a { color: #0055A5; text-decoration: none; font-weight: 600; transition: all 0.25s ease; }
  .inc-ft-dev a:hover { color: #fff; text-shadow: 0 0 12px rgba(0,85,165,0.6); }

  /* tricolor bottom */
  .inc-ft-tricolor {
    height: 3px;
    background: linear-gradient(90deg, #FF9933 33.3%, #ffffff 33.3% 66.6%, #138808 66.6%);
    opacity: 0.35;
  }

  /* responsive */
  @media (max-width: 992px) {
    .inc-ft-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
  }
  @media (max-width: 600px) {
    .inc-ft-grid { grid-template-columns: 1fr; gap: 28px; }
    .inc-ft-bottom { justify-content: center; text-align: center; }
    .inc-ft-bio { max-width: 100%; }
    .inc-footer { padding: 40px 0 0; }
  }
`;

function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <style>{CSS}</style>
      <footer className="inc-footer">
        <div className="inc-ft-glow" />
        <div className="inc-ft-wm">🤚</div>

        <div className="inc-ft-wrap">
          <div className="inc-ft-grid">
            {/* BRAND */}
            <div>
              <div className="inc-ft-brand">
                <img src={congressLogo} alt="INC" className="inc-ft-logo" />
                <div>
                  <div className="inc-ft-name">Priya Sharma Yadav</div>
                  <span className="inc-ft-party">Indian National Congress</span>
                </div>
              </div>
              <div className="inc-ft-tagline">
                जब जनता साथ हो, तो कोई मंज़िल दूर नहीं
              </div>
              <p className="inc-ft-bio">
                Leader of Opposition, Rajasthan Legislative Assembly. Serving
                the people of Jaipur Central with dedication since 2008.
              </p>
            </div>

            {/* PAGES */}
            <div>
              <div className="inc-ft-col-title">Pages</div>
              <ul className="inc-ft-nav">
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
            </div>

            {/* FOLLOW */}
            <div>
              <div className="inc-ft-col-title">Follow</div>
              <div className="inc-ft-socials">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inc-ft-sb"
                >
                  𝕏 Twitter
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inc-ft-sb"
                >
                  👥 Facebook
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inc-ft-sb"
                >
                  📸 Instagram
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inc-ft-sb"
                >
                  ▶️ YouTube
                </a>
              </div>
            </div>

            {/* CONTACT */}
            <div>
              <div className="inc-ft-col-title">Contact</div>
              <div className="inc-ft-cr">
                <span className="inc-ft-cr-ico">📍</span>
                <span>INC Bhavan, Bais Godam, Jaipur, Rajasthan</span>
              </div>
              <div className="inc-ft-cr">
                <span className="inc-ft-cr-ico">📞</span>
                <span>+91 98XXXXXX00</span>
              </div>
              <div className="inc-ft-cr">
                <span className="inc-ft-cr-ico">✉️</span>
                <span>contact@priyasharmayadav.in</span>
              </div>
              <div className="inc-ft-cr">
                <span className="inc-ft-cr-ico">🌐</span>
                <span>priyasharmayadav.in</span>
              </div>
            </div>
          </div>

          <div className="inc-ft-divider" />

          <div className="inc-ft-bottom">
            <div className="inc-ft-copy">
              © {year} <strong>Priya Sharma Yadav</strong>. All rights reserved.
            </div>
            <div className="inc-ft-saath">
              हाथ से हाथ मिलाओ · जन जन की आवाज़
            </div>
            <div className="inc-ft-jai">🤚 जय INC</div>
          </div>
        </div>

        <div className="inc-ft-dev">
          Designed &amp; Developed by{" "}
          <a
            href="https://siddhantgarg.online"
            target="_blank"
            rel="noopener noreferrer"
          >
            Siddhant Garg
          </a>
        </div>
        <div className="inc-ft-tricolor" />
      </footer>
    </>
  );
}

export default Footer;
