/* eslint-disable react/prop-types */
const FormInput = ({ type, label, value, id, changeHandler, disabled }) => {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        value={value}
        id={id}
        onChange={changeHandler}
        disabled={disabled}
      />
    </div>
  );
};

export default FormInput;
