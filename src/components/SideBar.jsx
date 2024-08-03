import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const SideBar = ({ role }) => {
  return (
    <div className="w-full t-center">
      <div
        className="btn btn-outline-primary t-xl t-center"
        style={{ textTransform: "uppercase" }}
      >
        {role} Panel
      </div>
      <hr />
      {role !== "member" && (
        <>
          <div className="">
            <div className="btn btn-primary">
              <Link
                to={"/uhagarariye/ubwizigame"}
                className="t-light"
                style={{ color: "white" }}
              >
                UBWIZIGAME
              </Link>
            </div>
          </div>
          <div className="btn btn-primary">
            <Link
              to={"/uhagarariye/kwizigama"}
              className="t-light"
              style={{ color: "white" }}
            >
              KWIZIGAMA
            </Link>
          </div>
        </>
      )}
      {role == "member" && (
        <div className="">
          <div className="btn btn-primary">Saba Inguzanyo</div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
