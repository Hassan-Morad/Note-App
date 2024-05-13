import { useContext } from "react";
import style from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { showAddModel } from "../../utils/Note";
import { NoteContext } from "../../Context/NoteContext";

export default function Sidebar({ isMini, setIsMini }) {
  const { logout, token } = useContext(UserContext);
  const { setNotes } = useContext(NoteContext);
  return (
    <>
      <nav className={`${style.nav} shadow-sm`}>
        <button
          onClick={() => showAddModel({ token, setNotes })}
          className="btn btn-main text-capitalize w-100 mb-3"
        >
          <i className="fa-solid fa-plus me-2"></i>
          {isMini ? "" : "New Note"}
        </button>
        <ul className="list-unstyled">
          <li>
            <NavLink to="/">
              <i className="bi bi-house-heart me-2"></i>
              {isMini ? "" : "Home"}
            </NavLink>
          </li>
          <li>
            <NavLink to="/search">
              <i className="bi bi-search me-2"></i> {isMini ? "" : "Search"}
            </NavLink>
          </li>
          <li onClick={logout}>
            <span className="pointer">
              <i className="bi bi-box-arrow-left me-2"></i>
              {isMini ? "" : "Log Out"}
            </span>
          </li>
          <li></li>
        </ul>
        <div
          onClick={() =>setIsMini(!isMini)}
          className={`${style.change} shadow pointer`}
        >
          <i
            className={
              isMini ? "fa-solid fa-chevron-right" : "fa-solid fa-chevron-left"
            }
          ></i>
        </div>
      </nav>
    </>
  );
}
