/* eslint-disable react/prop-types */
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import { useState } from "react";
import Member from "../utils/controllers/Members.controller";
const MemberRegisterForm = ({ reloader }) => {
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [nid, setNid] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [pin, setPin] = useState();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        firstName: fname,
        lastName: lname,
        nid: nid,
        email,
        phone,
        pin,
      };
      const M = new Member();
      const resp = await M.Register(data);
      if (resp.data.status == 201) {
        alert("Kwandika umunyamuryango byagenze neza!");
      }
      setEmail("");
      setFname("");
      setLname("");
      setNid("");
      setPhone("");
      setPin("");
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
        <div className="card-title t-xl">ONGERAHO UMUNYAMURYANGO MUSHYA</div>
        <form>
          <FormInput
            type={"text"}
            label={"Nimero Y' INDANGAMUNU"}
            value={nid}
            changeHandler={(e) => setNid(e.target.value)}
          />
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
            label={"NIMERO YA TELEPHONE"}
            value={phone}
            changeHandler={(e) => setPhone(e.target.value)}
          />
          <FormInput
            type={"text"}
            label={"EMAIL"}
            value={email}
            changeHandler={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type={"text"}
            label={"PIN"}
            value={pin}
            changeHandler={(e) => setPin(e.target.value)}
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

export default MemberRegisterForm;
