import "./style.css";
import { Search, Person, DarkMode, Toc } from "@mui/icons-material";
import { useState } from "react";

const Navigation = () => {
  const [open, setOpen] = useState(false);

  const [authMenuOpen, setAuthMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{
    visible: boolean;
    mode: "signin" | "signup" | null;
  }>({ visible: false, mode: null });

  const toggleRightBar = () => {
    setOpen((v) => !v);
    if (authMenuOpen === true) {
      closeAuthMenu();
    }
  };
  const closeRightBar = () => setOpen(false);

  const toggleAuthMenu = () => {
    setAuthMenuOpen((v) => !v);
    if (open === true) {
      closeRightBar();
    }
  };
  const closeAuthMenu = () => setAuthMenuOpen(false);

  const openAuthModal = (mode: "signin" | "signup") => {
    setAuthMenuOpen(false);
    setAuthModal({ visible: true, mode });
  };
  const closeAuthModal = () => setAuthModal({ visible: false, mode: null });

  return (
    <div className="topbar">
      <div className="left">
        <p>BittyMeal</p>
      </div>

      <div className="middle">
        <p>Craving</p>
        <p>Trending</p>
        <p>Must-See</p>
        <p>Editor’s Choice</p>
        <p>More</p>
      </div>

      <div className="right">
        <Search style={{ margin: "0 10px" }} />
        <DarkMode style={{ margin: "0 10px" }} />
        <Person
          style={{ margin: "0 10px", cursor: "pointer" }}
          onClick={toggleAuthMenu}
          aria-haspopup="menu"
          aria-expanded={authMenuOpen}
          aria-controls="auth-menu"
        />
        <Toc
          style={{ margin: "0 10px", cursor: "pointer" }}
          onClick={toggleRightBar}
        />
      </div>

      {open && <div className="backdrop" onClick={closeRightBar} />}
      {authMenuOpen && <div className="backdrop-2" onClick={closeAuthMenu} />}

      <div
        className={`rightBar ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <p>We're craving</p>
        <p>Trending now</p>
        <p>Must see</p>
        <p>Editor’s Choice</p>
        <p>More</p>
      </div>

      {authMenuOpen && (
        <div
          id="auth-menu"
          role="menu"
          className="auth-menu"
          aria-label="Authentication menu"
        >
          <button role="menuitem" onClick={() => openAuthModal("signup")}>
            Sign up
          </button>
          <button role="menuitem" onClick={() => openAuthModal("signin")}>
            Sign in
          </button>
        </div>
      )}

      {authModal.visible && (
        <div className="modal-backdrop" onClick={closeAuthModal} />
      )}

      {authModal.visible && (
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-title"
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={closeAuthModal}
              aria-label="Close"
            >
              ×
            </button>
            <h2 id="auth-title">Hello!</h2>
            <p className="modal-sub">
              Use your email or another service to continue with BittyMeal.
            </p>

            <button className="oauth-btn">
              <span className="icon">G</span> Continue with Google
            </button>
            <button className="oauth-btn">
              <span className="icon"></span> Continue with Apple
            </button>
            <button className="primary-btn">Continue with email</button>

            <p className="modal-legal">
              By continuing, you agree to our <a href="#">Terms of Service</a>.
              Read our <a href="#">Privacy Policy</a>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
