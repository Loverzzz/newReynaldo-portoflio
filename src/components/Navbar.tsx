// tambah useEffect untuk animasi burger

import { useEffect, useMemo, useState } from "react";

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState<string>("about");
  const [open, setOpen] = useState<boolean>(false);

  const ids = useMemo(() => NAV.map((n) => n.id), []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 120; // Offset agar bagian atas tidak tersembunyi
      let current = ids[0];

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;

        // Cek posisi atas dan bawah elemen
        const elTop = el.offsetTop;
        const elBottom = elTop + el.clientHeight;

        // Jika bagian atas elemen sudah ter-scroll di atas y dan bagian bawah elemen belum terlewati
        if (elTop <= y && elBottom > y) {
          current = id;
        }
      }

      setActive(current); // Update state active dengan ID yang sesuai
    };

    onScroll(); // Set initial active state
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);

  const go = (id: string) => {
    setOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="navWrap">
      <div className="container nav">
        <button
          className="brand"
          onClick={() => go("about")}
          type="button"
          aria-label="Go to top"
        >
          <span className="brandDot" />
          <span>Reynaldo</span>
        </button>

        <nav className={`navLinks ${open ? "open" : ""}`} aria-label="Primary">
          {NAV.map((item) => (
            <button
              key={item.id}
              className={`navLink ${active === item.id ? "active" : ""}`}
              onClick={() => go(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          className={`burger ${open ? "open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
