/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import { useNavigate } from "react-router-dom";
import { FaLockOpen, FaUserGroup } from "react-icons/fa6";
import auth from "../utils/Auth";

const MembersLogin = () => {
  const navigate = useNavigate();
  const [nid, setNid] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const inputs = [
    {
      label: "Nimero y' Indangamunu",
      id: "nid",
      changeHandler: setNid,
      value: nid,
      type: "text",
    },
    {
      label: "Ijambobanga/password",
      id: "password",
      changeHandler: setPassword,
      value: password,
      type: "password",
    },
  ];
  const handleLogin = async () => {
    setLoading(true);
    try {
      const loginResponse = await auth({
        username: nid,
        password,
        role: "member",
      });
      if (!loginResponse.login) {
        throw new Error(loginResponse.error);
      }
      const { token, role } = loginResponse;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      const page = "umunyamuryango";
      navigate(`/${page}`);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container h-screen">
      <div className="card">
        <div className="card-body">
          <div className="card-title flex flex-col center">
            <FaUserGroup
              style={{
                color: "green",
                fontSize: "xx-large",
                padding: "10px",
                marginBottom: "10px",
                border: "solid 1px green",
                borderRadius: "50%",
              }}
            />{" "}
            AHO UMUNYAMURYANGO YINJIRIRA
          </div>
          <form>
            {inputs.map((input, index) => (
              <FormInput
                type={input.type}
                value={input.value}
                label={input.label}
                changeHandler={(e) => input.changeHandler(e.target.value)}
                key={index}
                id={input.id}
              />
            ))}
            <FormButton
              btnName={`${!loading ? "INJIRA" : "KWinjira...."}`}
              BtnHandler={(e) => {
                e.preventDefault();
                if (!loading) handleLogin();
              }}
              type="btn-primary"
              size="lg"
              icon={<FaLockOpen />}
            />
            <FormButton
              btnName={"Injira nk'uhagarariye"}
              BtnHandler={(e) => {
                e.preventDefault();
                navigate("/kwinjira/uhagarariye");
              }}
              type="btn-outline-primary"
              size="lg"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default MembersLogin;
