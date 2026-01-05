export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footerInner">
        <div className="muted small">
          © {new Date().getFullYear()} Reynaldo Arya — Perform with React + TS
        </div>
        <a className="link small" href="#about">
          Back to top
        </a>
      </div>
    </footer>
  );
}
