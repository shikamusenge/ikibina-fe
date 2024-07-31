/* eslint-disable react/prop-types */
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import { useState } from "react";
import UsersController from "../utils/controllers/UsersController";
const UserForm = ({ reloader }) => {
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        fullName: fname + " " + lname,
        email,
      };
      const User = new UsersController();
      const resp = await User.Register(data);
      if (resp.data.status == 201) {
        alert("Kwandika umunyamuryango byagenze neza!");
      }
      setEmail("");
      setFname("");
      setLname("");
      reloader();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title t-xl">AD New User</div>
        <form>
          <FormInput
            type={"text"}
            label={"IZINA RY' UMURYANGO"}
            value={fname}
            changeHandler={(e) => setFname(e.target.value)}
          />
          <FormInput
            type={"text"}
            label={"IZINA RY' IDINI"}
            value={lname}
            changeHandler={(e) => setLname(e.target.value)}
          />
          <FormInput
            type={"text"}
            label={"EMAIL"}
            value={email}
            changeHandler={(e) => setEmail(e.target.value)}
          />
          <FormButton
            btnName={loading ? "kogeraho ....." : "Kongeraho"}
            type="btn-primary"
            BtnHandler={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default UserForm;
