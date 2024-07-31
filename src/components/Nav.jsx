/* eslint-disable react/prop-types */
import { FaBars } from "react-icons/fa6";
import navs from "../utils/navs";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Nav = ({ role, page = "abanyamuryango" }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token") && !localStorage.getItem("role")) {
      localStorage.clear();
      alert("Login first");
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigations =
    role == "admin"
      ? navs.admin
      : role == "supperadmin"
      ? navs.supperadmin
      : navs.member;
  return (
    <nav className="flex">
      <div className="brand i-center" style={{ gap: "10px", fontSize: "30px" }}>
        <FaBars style={{ display: "none" }} />{" "}
        <div className="txt-xl">
          IKI<span className="txt-success">BINA</span>
        </div>
      </div>
      <div>
        <ul className="flex">
          {navigations.map((item, Index) => (
            <li
              key={Index}
              className={`${
                page.toLowerCase() == item.text.toLowerCase()
                  ? "nav-link link-active"
                  : "nav-link"
              }`}
            >
              <Link to={item.path}>{item.text}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
