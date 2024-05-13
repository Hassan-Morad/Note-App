import style from "./Layout.module.css";
import Sidebar from "../Sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Layout() {
  const [isMini, setIsMini] = useState(
    localStorage.getItem("sidebarIsMini") === "true" ? true : false
  );
  

  useEffect(() => {
    localStorage.setItem("sidebarIsMini", isMini);
  }, [isMini]);
  return (
    <>
      <div className={`d-flex min-vh-100 align-items-stretch ${style.dark}`}>
        <div className={isMini  ?`${style.sidebarMini}`:`${style.sidebar}`}>
          <Sidebar isMini={isMini} setIsMini={setIsMini} />
        </div>

        <div className={`${style.content}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
