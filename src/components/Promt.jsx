/* eslint-disable react/prop-types */
import { FaSurprise } from "react-icons/fa";

const Promt = ({ title, body, aprove, reject, icon = <FaSurprise /> }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">
          {icon}
          <span>{title}</span>
        </div>
        <div className="px-2 py-2 mx-2 my-2">{body}</div>
        <div className="flex mx-2">
          <div>
            <span className="btn btn-primary mx-2" onClick={aprove}>
              yego
            </span>
          </div>
          <div>
            <span className="btn btn-outline-primary mx-2" onClick={reject}>
              oya
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promt;
