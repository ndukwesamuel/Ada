import { Link } from "react-router-dom";

export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-purple-800 animate-fadeIn">
      <div className="px-2 pt-2 pb-3 space-y-1">
        <MobileNavLink to="/" onClick={onClose}>
          Home
        </MobileNavLink>
        <MobileNavLink to="/about" onClick={onClose}>
          About
        </MobileNavLink>
        <MobileNavLink to="/contact" onClick={onClose}>
          Contact
        </MobileNavLink>
      </div>
    </div>
  );
}

function MobileNavLink({ to, onClick, children }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-600 transition-colors"
    >
      {children}
    </Link>
  );
}
