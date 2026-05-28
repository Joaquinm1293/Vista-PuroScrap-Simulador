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
    <nav className="w-full bg-white flex justify-between items-center px-10 h-16 shadow-sm border-b border-gray-100 ">
      
      {/* ── Lado Izquierdo: Logo ── */}
      <div className="flex items-center gap-4">
        <a href="#inicio" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          {/* Icono del Logo */}
          <div className="bg-green-600 p-2 rounded-lg flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
          {/* Texto del Logo */}
          <div className="flex flex-col leading-none mt-1">
            <span className="font-bold text-[1.1rem] text-green-700 tracking-tight">PuroScrap</span>
            <span className="text-[0.65rem] font-bold text-green-500 tracking-widest uppercase mt-0.5">Analytics</span>
          </div>
        </a>
      </div>

      {/* ── Lado Derecho: Enlaces ── */}
      <div className="flex items-center gap-8">
        
        <a href="#inicio" className="flex items-center gap-2 text-[0.9rem] font-semibold text-gray-500 hover:text-green-600 transition-colors">
          <span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </span>
          Inicio
        </a>

        <a href="#simulacion" className="flex items-center gap-2 text-[0.9rem] font-semibold text-gray-500 hover:text-green-600 transition-colors">
          <span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </span>
          Simulación
        </a>

        {/* Dropdown de Descarga */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-2 text-[0.9rem] font-semibold text-gray-500 hover:text-green-600 transition-colors focus:outline-none"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-expanded={dropdownOpen}
          >
            <span className="flex items-center gap-2">
              <span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </span>
              Descargar
            </span>
            <svg
              className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Menú Desplegable */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-4 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
              <a 
                href="#descargar-excel" 
                className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                <span className="w-2 h-2 rounded-full bg-green-600" />
                Excel
              </a>
              <a 
                href="#descargar-pdf" 
                className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                <span className="w-2 h-2 rounded-full bg-red-600" />
                PDF
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;