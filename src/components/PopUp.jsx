/* eslint-disable react/prop-types */
const PopUp = ({ child, clickEvent }) => {
  return (
    <div
      className="pop-up-container"
      onClick={(e) => {
        if (e.target.className == "pop-up-container") {
          clickEvent(false);
          console.log("clicked");
        }
      }}
    >
      <div className="pop-body">{child}</div>
    </div>
  );
};

export default PopUp;
