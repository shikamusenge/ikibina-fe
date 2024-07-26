/* eslint-disable react/prop-types */
const FormSelect = ({ label, id, changeHandler, items }) => {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <select id={id} onChange={changeHandler} required>
        <option defaultValue disabled>
          Please Select {label}
        </option>
        {items.map((item, index) => (
          <option key={index} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
