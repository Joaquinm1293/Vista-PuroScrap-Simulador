import { useState, useRef, useEffect } from "react";

const Nav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap');

        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 220px;
          background: #ffffff;
          border-right: 1.5px solid #bbf7d0;
          display: flex;
          flex-direction: column;
          padding: 1.75rem 1rem;
          gap: 0.25rem;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 2px 0 16px rgba(22, 163, 74, 0.07);
          z-index: 100;
        }

        /* Logo */
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 0.5rem;
          margin-bottom: 2rem;
          user-select: none;
          text-decoration: none;
        }

        .sidebar-logo-icon {
          width: 34px;
          height: 34px;
          background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(22, 163, 74, 0.28);
          flex-shrink: 0;
        }

        .sidebar-logo-text {
          font-size: 1.05rem;
          font-weight: 700;
          color: #16a34a;
          letter-spacing: -0.4px;
          line-height: 1.2;
        }

        .sidebar-logo-text span {
          display: block;
          font-size: 0.68rem;
          font-weight: 600;
          color: #86efac;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          font-family: 'DM Mono', monospace;
        }

        /* Section label */
        .sidebar-section-label {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #86efac;
          padding: 0 0.75rem;
          margin: 1rem 0 0.4rem;
          font-family: 'DM Mono', monospace;
        }

        /* Nav links */
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #166534;
          text-decoration: none;
          border-radius: 9px;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;
          font-family: 'DM Sans', sans-serif;
          width: 100%;
          text-align: left;
        }

        .sidebar-link:hover {
          background: #dcfce7;
          color: #15803d;
          transform: translateX(2px);
        }

        .sidebar-link.active {
          background: #dcfce7;
          color: #15803d;
        }

        .sidebar-link-icon {
          width: 30px;
          height: 30px;
          border-radius: 7px;
          background: #f0fdf4;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.15s ease;
        }

        .sidebar-link:hover .sidebar-link-icon,
        .sidebar-link.active .sidebar-link-icon {
          background: #bbf7d0;
        }

        /* Dropdown */
        .sidebar-dropdown-wrapper {
          position: relative;
        }

        .sidebar-dropdown-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .sidebar-dropdown-chevron {
          transition: transform 0.2s ease;
          opacity: 0.6;
          flex-shrink: 0;
        }

        .sidebar-dropdown-chevron.open {
          transform: rotate(180deg);
        }

        .sidebar-dropdown-menu {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.25s ease, opacity 0.2s ease;
          opacity: 0;
        }

        .sidebar-dropdown-menu.open {
          max-height: 200px;
          opacity: 1;
        }

        .sidebar-dropdown-inner {
          padding: 4px 0 4px 16px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          border-left: 2px solid #bbf7d0;
          margin: 4px 0 4px 20px;
        }

        .sidebar-dropdown-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 8px 10px;
          font-size: 0.83rem;
          font-weight: 600;
          color: #166534;
          text-decoration: none;
          border-radius: 7px;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .sidebar-dropdown-item:hover {
          background: #f0fdf4;
          color: #15803d;
        }

        .sidebar-dropdown-item-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* Divider */
        .sidebar-divider {
          height: 1px;
          background: #dcfce7;
          margin: 0.75rem 0.5rem;
        }

        /* Status pill at the bottom */
        .sidebar-footer {
          margin-top: auto;
          padding: 0 0.5rem;
        }

        .sidebar-status {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          background: #f0fdf4;
          border: 1.5px solid #bbf7d0;
          border-radius: 10px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #166534;
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.3px;
        }

        .sidebar-status-dot {
          width: 7px;
          height: 7px;
          background: #16a34a;
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.4);
          animation: sidebar-pulse 2s infinite;
        }

        @keyframes sidebar-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.4); }
          70%  { box-shadow: 0 0 0 5px rgba(22, 163, 74, 0); }
          100% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); }
        }
      `}</style>

      <nav className="sidebar">

        {/* Logo */}
        <a href="#inicio" className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
          <div className="sidebar-logo-text">
            PuroScrap
            <span>Analytics</span>
          </div>
        </a>

        {/* Main nav */}
        <p className="sidebar-section-label">Menú</p>

        <a href="#inicio" className="sidebar-link">
          <span className="sidebar-link-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </span>
          Inicio
        </a>

        <a href="#simulacion" className="sidebar-link">
          <span className="sidebar-link-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </span>
          Simulación
        </a>

        <div className="sidebar-divider" />

        {/* Dropdown */}
        <p className="sidebar-section-label">Exportar</p>

        <div className="sidebar-dropdown-wrapper" ref={dropdownRef}>
          <button
            className="sidebar-link sidebar-dropdown-btn"
            onClick={() => setDropdownOpen((v) => !v)}
            aria-expanded={dropdownOpen}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="sidebar-link-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </span>
              Descargar
            </span>
            <svg
              className={`sidebar-dropdown-chevron${dropdownOpen ? " open" : ""}`}
              width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <div className={`sidebar-dropdown-menu${dropdownOpen ? " open" : ""}`}>
            <div className="sidebar-dropdown-inner">
              <a
                href="#descargar-excel"
                className="sidebar-dropdown-item"
                onClick={() => setDropdownOpen(false)}
              >
                <span className="sidebar-dropdown-item-dot" style={{ background: "#16a34a" }} />
                Excel
              </a>
              <a
                href="#descargar-pdf"
                className="sidebar-dropdown-item"
                onClick={() => setDropdownOpen(false)}
              >
                <span className="sidebar-dropdown-item-dot" style={{ background: "#dc2626" }} />
                PDF
              </a>
            </div>
          </div>
        </div>

        {/* Footer status */}
        <div className="sidebar-footer">
          <div className="sidebar-status">
            <span className="sidebar-status-dot" />
            API Online
          </div>
        </div>

      </nav>
    </>
  );
};

export default Nav;