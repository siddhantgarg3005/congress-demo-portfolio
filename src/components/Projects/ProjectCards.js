import React, { useState, useEffect } from "react";

const cardStyles = `
  .bjp-proj-card {
    position: relative; border-radius: 20px; overflow: hidden;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,153,51,0.12);
    margin: 12px 8px; cursor: pointer;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
    animation: projCardIn 0.7s ease both;
  }
  .bjp-proj-card:hover {
    transform: translateY(-10px);
    border-color: rgba(255,153,51,0.4);
    box-shadow: 0 24px 60px rgba(255,153,51,0.14);
  }
  .bjp-proj-card::before {
    content: ''; position: absolute;
    top: 0; left: -100%; width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,153,51,0.06), transparent);
    z-index: 1; transition: left 0.55s ease; pointer-events: none;
  }
  .bjp-proj-card:hover::before { left: 160%; }
  @keyframes projCardIn {
    from{opacity:0;transform:translateY(28px) scale(0.95)}
    to  {opacity:1;transform:translateY(0) scale(1)}
  }

  .bjp-proj-badge {
    position: absolute; top: 14px; left: 14px; z-index: 3;
    background: rgba(7,6,15,0.85);
    border: 1px solid rgba(255,153,51,0.3);
    border-radius: 20px; padding: 4px 12px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.68em; font-weight: 700;
    color: #FF9933; letter-spacing: 0.5px;
    backdrop-filter: blur(8px);
  }

  .bjp-proj-img-wrap {
    position: relative; height: 200px; overflow: hidden;
  }
  .bjp-proj-img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.5s ease;
  }
  .bjp-proj-card:hover .bjp-proj-img { transform: scale(1.08); }
  .bjp-proj-img-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 30%, rgba(7,6,15,0.9) 100%);
  }
  .bjp-proj-img-hover {
    position: absolute; inset: 0;
    background: rgba(255,153,51,0.15);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: opacity 0.35s ease; z-index: 2;
  }
  .bjp-proj-card:hover .bjp-proj-img-hover { opacity: 1; }
  .bjp-proj-view-pill {
    background: rgba(255,153,51,0.9); color: #fff;
    font-family: 'Outfit', sans-serif;
    font-size: 0.8em; font-weight: 700;
    padding: 8px 20px; border-radius: 20px; letter-spacing: 0.5px;
  }

  /* Emoji placeholder */
  .bjp-proj-emoji-placeholder {
    width: 100%; height: 200px;
    display: flex; align-items: center; justify-content: center;
    font-size: 4em;
    background: linear-gradient(135deg, rgba(255,153,51,0.08), rgba(212,175,55,0.04));
    position: relative;
  }

  .bjp-proj-body { padding: 20px; position: relative; }
  .bjp-proj-shimmer {
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,153,51,0.4), transparent);
    opacity: 0; transition: opacity 0.35s ease;
  }
  .bjp-proj-card:hover .bjp-proj-shimmer { opacity: 1; }
  .bjp-proj-title {
    font-family: 'Outfit', sans-serif;
    font-size: 1.05em; font-weight: 800; color: #fff; margin-bottom: 8px;
    transition: color 0.3s ease;
  }
  .bjp-proj-card:hover .bjp-proj-title { color: #FF9933; }
  .bjp-proj-desc {
    font-family: 'Outfit', sans-serif;
    font-size: 0.8em; color: rgba(255,255,255,0.5); line-height: 1.6; margin-bottom: 14px;
  }
  .bjp-proj-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .bjp-proj-tag {
    font-family: 'Outfit', sans-serif;
    font-size: 0.68em; font-weight: 600;
    padding: 3px 10px; border-radius: 10px;
    background: rgba(255,153,51,0.08);
    border: 1px solid rgba(255,153,51,0.2);
    color: rgba(255,153,51,0.8);
  }

  /* Modal */
  .bjp-modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.88);
    backdrop-filter: blur(14px);
    z-index: 99990;
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    animation: modalOverIn 0.3s ease;
  }
  @keyframes modalOverIn { from{opacity:0} to{opacity:1} }
  .bjp-modal {
    position: relative; background: #0d0b1e;
    border: 1px solid rgba(255,153,51,0.25);
    border-radius: 24px; max-width: 640px; width: 100%;
    max-height: 90vh; overflow-y: auto;
    animation: modalIn 0.4s cubic-bezier(0.22,1,0.36,1);
    box-shadow: 0 30px 80px rgba(255,153,51,0.15);
  }
  @keyframes modalIn {
    from{opacity:0;transform:scale(0.92) translateY(20px)}
    to  {opacity:1;transform:scale(1) translateY(0)}
  }
  .bjp-modal::-webkit-scrollbar { width: 5px; }
  .bjp-modal::-webkit-scrollbar-thumb {
    background: rgba(255,153,51,0.3); border-radius: 5px;
  }
  .bjp-modal-img { width:100%; height:220px; object-fit:cover; border-radius:24px 24px 0 0; }
  .bjp-modal-emoji-header {
    width: 100%; height: 180px;
    display: flex; align-items: center; justify-content: center;
    font-size: 5em;
    background: linear-gradient(135deg, rgba(255,153,51,0.12), rgba(212,175,55,0.06));
    border-radius: 24px 24px 0 0;
  }
  .bjp-modal-body { padding: 28px; }
  .bjp-modal-badge {
    display: inline-block;
    background: rgba(255,153,51,0.1); border: 1px solid rgba(255,153,51,0.3);
    border-radius: 20px; padding: 4px 14px;
    font-family: 'Outfit', sans-serif; font-size: 0.7em; font-weight: 700;
    color: #FF9933; letter-spacing: 0.5px; margin-bottom: 14px;
  }
  .bjp-modal-title {
    font-family: 'Outfit', sans-serif;
    font-size: 1.5em; font-weight: 900; color: #fff; margin-bottom: 16px;
  }
  .bjp-modal-head {
    font-family: 'Outfit', sans-serif;
    font-size: 0.72em; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    color: #FF9933; margin-bottom: 8px;
    display: flex; align-items: center; gap: 8px;
  }
  .bjp-modal-head::before { content:''; display:block; width:20px; height:1px; background:#FF9933; }
  .bjp-modal-text {
    font-family: 'Outfit', sans-serif;
    font-size: 0.88em; color: rgba(255,255,255,0.65); line-height: 1.8; margin-bottom: 20px;
  }
  .bjp-modal-close {
    position: absolute; top: 14px; right: 14px;
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    color: #fff; display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 1.1em;
    transition: all 0.25s ease; z-index: 2;
  }
  .bjp-modal-close:hover {
    background: rgba(255,153,51,0.2);
    border-color: rgba(255,153,51,0.4); color: #FF9933;
  }
`;

function ProjectCard({
  imgPath,
  imgEmoji,
  title,
  badge,
  tags,
  shortDescription,
  fullDescription,
  demoLink,
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!document.getElementById("bjp-proj-card-styles")) {
      const tag = document.createElement("style");
      tag.id = "bjp-proj-card-styles";
      tag.innerHTML = cardStyles;
      document.head.appendChild(tag);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="bjp-proj-card" onClick={() => setOpen(true)}>
        <div className="bjp-proj-badge">{badge}</div>

        <div className="bjp-proj-img-wrap">
          {imgPath ? (
            <>
              <img src={imgPath} alt={title} className="bjp-proj-img" />
              <div className="bjp-proj-img-overlay" />
            </>
          ) : (
            <div className="bjp-proj-emoji-placeholder">{imgEmoji || "🏛️"}</div>
          )}
          <div className="bjp-proj-img-hover">
            <span className="bjp-proj-view-pill">🏛️ Read Full Story</span>
          </div>
        </div>

        <div className="bjp-proj-body">
          <div className="bjp-proj-shimmer" />
          <div className="bjp-proj-title">{title}</div>
          <div className="bjp-proj-desc">{shortDescription}</div>
          <div className="bjp-proj-tags">
            {tags.map((t, i) => (
              <span className="bjp-proj-tag" key={i}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {open && (
        <div className="bjp-modal-overlay" onClick={() => setOpen(false)}>
          <div className="bjp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="bjp-modal-close" onClick={() => setOpen(false)}>
              ✕
            </button>
            {imgPath ? (
              <img src={imgPath} alt={title} className="bjp-modal-img" />
            ) : (
              <div className="bjp-modal-emoji-header">{imgEmoji || "🏛️"}</div>
            )}
            <div className="bjp-modal-body">
              <div className="bjp-modal-badge">{badge}</div>
              <div className="bjp-modal-title">{title}</div>
              <div className="bjp-modal-head">Initiative Overview</div>
              <p className="bjp-modal-text">{fullDescription}</p>
              <div className="bjp-modal-head">Key Areas</div>
              <div className="bjp-proj-tags" style={{ marginBottom: "24px" }}>
                {tags.map((t, i) => (
                  <span className="bjp-proj-tag" key={i}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectCard;
