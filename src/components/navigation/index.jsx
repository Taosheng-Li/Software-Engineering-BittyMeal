import { useEffect, useMemo, useState } from "react";
import "./style.css";
import { Search, Person, Toc, ArrowBack } from "@mui/icons-material";

function Navigation({ recipes, onSelectRecipe, onNavigateSection }) {
  const [open, setOpen] = useState(false);
  const [authMenuOpen, setAuthMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState({ visible: false, mode: null });
  const [query, setQuery] = useState("");

  const [isCompact, setIsCompact] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 1024 : false
  );

  const [searchOpen, setSearchOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth > 1024 : false
  );

  const toggleRightBar = () => {
    setOpen((prev) => !prev);
    if (authMenuOpen) setAuthMenuOpen(false);
  };

  const toggleAuthMenu = () => {
    setAuthMenuOpen((prev) => !prev);
    if (open) setOpen(false);
  };

  const openAuthModal = (mode) => {
    setAuthMenuOpen(false);
    setAuthModal({ visible: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal({ visible: false, mode: null });
  };

  useEffect(() => {
    const handleResize = () => {
      const compact = window.innerWidth <= 1024;
      setIsCompact(compact);

      if (!compact) {
        setSearchOpen(true);
      } else {
        setSearchOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return recipes
      .filter((recipe) => recipe.name.toLowerCase().includes(lower))
      .slice(0, 6);
  }, [query, recipes]);

  const handleSelectResult = (recipe) => {
    if (!recipe) return;
    onSelectRecipe(recipe);
    setQuery("");
    if (isCompact) {
      setSearchOpen(false);
    }
  };

  const closeMobileSearch = () => {
    setQuery("");
    setSearchOpen(false);
  };

  const handleNavigateSection = (section) => {
    if (onNavigateSection) {
      onNavigateSection(section);
    }
    setOpen(false);
  };

  return (
    <div className="topbar">
      <div className="left">
        <p>BittyMeal</p>
      </div>

      {(!isCompact || searchOpen) && (
        <div
          className={`middle ${
            isCompact && searchOpen ? "middle--mobile-open" : ""
          }`}
        >
          <div
            className={`search-box ${isCompact ? "search-box--compact" : ""}`}
          >
            {isCompact && (
              <button
                className="close-search-btn"
                onClick={closeMobileSearch}
                type="button"
              >
                <ArrowBack />
              </button>
            )}

            {!isCompact && <Search className="search-icon" />}

            <input
              type="text"
              placeholder="Search recipes"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoFocus={isCompact}
            />

            {query && (
              <button className="clear-btn" onClick={() => setQuery("")}>
                ×
              </button>
            )}

            {query && searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((recipe) => (
                  <button
                    key={recipe.id}
                    className="search-result"
                    onClick={() => handleSelectResult(recipe)}
                    type="button"
                  >
                    <img src={recipe.image} alt="" />
                    <span>{recipe.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="right">
        {isCompact && !searchOpen && (
          <Search
            style={{ margin: "0 10px", cursor: "pointer" }}
            onClick={() => setSearchOpen(true)}
          />
        )}

        <Person
          style={{ margin: "0 10px", cursor: "pointer" }}
          onClick={toggleAuthMenu}
        />
        <Toc
          style={{ margin: "0 10px", cursor: "pointer" }}
          onClick={toggleRightBar}
        />
      </div>

      {open && <div className="backdrop" onClick={() => setOpen(false)} />}
      {authMenuOpen && (
        <div className="auth-menu">
          <button onClick={() => openAuthModal("signup")} type="button">
            Sign up
          </button>
          <button onClick={() => openAuthModal("signin")} type="button">
            Sign in
          </button>
        </div>
      )}

      <div className={`rightBar ${open ? "open" : ""}`}>
        <button
          type="button"
          className="rightBar-link"
          onClick={() => handleNavigateSection("craving")}
        >
          We're craving
        </button>
        <button
          type="button"
          className="rightBar-link"
          onClick={() => handleNavigateSection("trending")}
        >
          Trending now
        </button>
        <button
          type="button"
          className="rightBar-link"
          onClick={() => handleNavigateSection("must-see")}
        >
          Must see
        </button>
        <button
          type="button"
          className="rightBar-link"
          onClick={() => handleNavigateSection("editors")}
        >
          Editor’s Choice
        </button>
      </div>

      {authModal.visible && (
        <div className="modal-backdrop" onClick={closeAuthModal} />
      )}

      {authModal.visible && (
        <div className="modal" onClick={closeAuthModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={closeAuthModal}
              type="button"
            >
              ×
            </button>

            <h2>Hello!</h2>
            <p className="modal-sub">
              Use your email or another service to continue with BittyMeal.
            </p>

            <div className="modal-actions">
              <button className="oauth-btn" type="button">
                <span className="icon">G</span> Continue with Google
              </button>
              <button className="oauth-btn" type="button">
                <span className="icon"></span> Continue with Apple
              </button>

              <div className="divider">
                <span>or</span>
              </div>

              <button className="primary-btn" type="button">
                Continue with email
              </button>
            </div>

            <p className="modal-legal">
              By continuing, you agree to our <a href="#">Terms of Service</a>.
              Read our <a href="#">Privacy Policy</a>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navigation;
