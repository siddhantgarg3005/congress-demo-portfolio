import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import congressLogo from "../../Assets/congress-logo.png";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap');

  .inc-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    padding: 0;
    transition: all 0.4s ease;
  }
  .inc-nav.scrolled {
    background: rgba(3,9,22,0.95);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-bottom: 1px solid rgba(0,85,165,0.15);
    box-shadow: 0 4px 30px rgba(0,0,0,0.4);
  }

  /* tricolor top line */
  .inc-nav-tricolor {
    height: 3px;
    background: linear-gradient(90deg, #FF9933 33.3%, #ffffff 33.3% 66.6%, #138808 66.6%);
    opacity: 0.6;
  }

  .inc-nav-inner {
    max-width: 1200px; margin: 0 auto;
    padding: 14px 24px;
    display: flex; align-items: center; justify-content: space-between;
  }

  /* brand */
  .inc-nav-brand {
    display: flex; align-items: center; gap: 11px;
    text-decoration: none; flex-shrink: 0;
  }
  .inc-nav-logo {
    width: 40px; height: 40px; object-fit: contain;
    filter: drop-shadow(0 0 8px rgba(0,85,165,0.5));
  }
  .inc-nav-name {
    font-family: 'Outfit', sans-serif; font-weight: 800;
    font-size: 0.96em; color: #fff; line-height: 1.2;
  }
  .inc-nav-party {
    font-size: 0.58em; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; color: #0055A5; display: block;
  }

  /* desktop links */
  .inc-nav-links {
    display: flex; align-items: center; gap: 4px;
  }
  .inc-nav-link {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 14px; border-radius: 10px;
    font-family: 'Outfit', sans-serif; font-size: 0.88em; font-weight: 600;
    color: rgba(255,255,255,0.6); text-decoration: none;
    transition: all 0.25s ease; white-space: nowrap;
  }
  .inc-nav-link:hover { color: #fff; background: rgba(0,85,165,0.15); }
  .inc-nav-link.active { color: #fff; background: rgba(0,85,165,0.18); }

  /* hamburger */
  .inc-hamburger {
    display: none; flex-direction: column; gap: 5px;
    background: rgba(0,85,165,0.15);
    border: 1px solid rgba(0,85,165,0.3);
    border-radius: 10px; padding: 10px 12px; cursor: pointer;
  }
  .inc-ham-bar {
    width: 22px; height: 2px; border-radius: 2px;
    background: rgba(255,255,255,0.8); transition: all 0.3s ease;
  }
  .inc-hamburger.open .inc-ham-bar:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
  .inc-hamburger.open .inc-ham-bar:nth-child(2) { opacity: 0; }
  .inc-hamburger.open .inc-ham-bar:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

  /* mobile menu */
  .inc-mobile-menu {
    display: none; flex-direction: column; gap: 4px;
    background: rgba(3,9,22,0.98); border-top: 1px solid rgba(0,85,165,0.15);
    padding: 12px 16px 16px;
  }
  .inc-mobile-menu.open { display: flex; }
  .inc-mobile-link {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 16px; border-radius: 12px;
    font-family: 'Outfit', sans-serif; font-size: 0.92em; font-weight: 600;
    color: rgba(255,255,255,0.65); text-decoration: none;
    transition: all 0.2s ease;
  }
  .inc-mobile-link:hover, .inc-mobile-link.active {
    background: rgba(0,85,165,0.15); color: #fff;
  }

  @media (max-width: 768px) {
    .inc-nav-links { display: none !important; }
    .inc-hamburger { display: flex; }
  }
`;

const NAV_ITEMS = [
  { to: "/", icon: "🏠", label: "Home" },
  { to: "/journey", icon: "🌿", label: "Journey" },
  { to: "/vision", icon: "🕊️", label: "Vision" },
  { to: "/achievements", icon: "🏆", label: "Achievements" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <>
      <style>{CSS}</style>
      <nav className={`inc-nav${scrolled ? " scrolled" : ""}`}>
        <div className="inc-nav-tricolor" />
        <div className="inc-nav-inner">
          <Link to="/" className="inc-nav-brand">
            <img src={congressLogo} alt="INC" className="inc-nav-logo" />
            <div>
              <div className="inc-nav-name">Priya Sharma Yadav</div>
              <span className="inc-nav-party">Indian National Congress</span>
            </div>
          </Link>

          <div className="inc-nav-links">
            {NAV_ITEMS.map(({ to, icon, label }) => (
              <Link
                key={to}
                to={to}
                className={`inc-nav-link${location.pathname === to ? " active" : ""}`}
              >
                <span>{icon}</span>
                {label}
              </Link>
            ))}
          </div>

          <button
            className={`inc-hamburger${open ? " open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <span className="inc-ham-bar" />
            <span className="inc-ham-bar" />
            <span className="inc-ham-bar" />
          </button>
        </div>

        <div className={`inc-mobile-menu${open ? " open" : ""}`}>
          {NAV_ITEMS.map(({ to, icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`inc-mobile-link${location.pathname === to ? " active" : ""}`}
            >
              <span>{icon}</span>
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
