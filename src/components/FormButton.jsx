/* eslint-disable react/prop-types */

const FormButton = ({ btnName, BtnHandler, icon, type = "main", size }) => {
  return (
    <button
      className={`btn ${type} btn-${size}`}
      type="submit"
      onClick={BtnHandler}
    >
      {icon} {btnName}
    </button>
  );
};

export default FormButton;
