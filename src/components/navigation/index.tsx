import "./style.css";
import { Search, Person, DarkMode, Toc } from "@mui/icons-material";
import { useState } from "react";

const Navigation = () => {
  const [open, setOpen] = useState(false);

  const clickOpen = () => {
    setOpen((v) => !v);
  };

  const close = () => {
    setOpen(false);
  };
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
        <Person style={{ margin: "0 10px" }} />
        <Toc
          style={{ margin: "0 10px", cursor: "pointer" }}
          onClick={clickOpen}
        />
      </div>

      {open && <div className="backdrop" onClick={close}></div>}

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
    </div>
  );
};

export default Navigation;
