/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import FormInput from "../components/FormInput";
import { FaUser } from "react-icons/fa";
import FormButton from "../components/FormButton";
import { useNavigate } from "react-router-dom";
import auth from "../utils/Auth";
const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const inputs = [
    {
      label: "Email",
      id: "Email",
      changeHandler: setEmail,
      value: email,
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
        username: email,
        password,
        role: "admin",
      });
      if (!loginResponse.login) {
        throw new Error(loginResponse.error);
      }
      const { token, role } = loginResponse;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      const page = role == "admin" ? "uhagarariye" : "uhagarariyemukuru";
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
            <FaUser
              style={{
                color: "green",
                fontSize: "xx-large",
                padding: "10px",
                marginBottom: "10px",
                border: "solid 1px green",
                borderRadius: "50%",
              }}
            />
            AHO UHAGARARIYE YINJIRIRA
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
              btnName={`${!loading ? "INJIRA" : "Kwinjira...."}`}
              BtnHandler={(e) => {
                e.preventDefault();
                if (!loading) handleLogin();
              }}
              type="btn-primary"
              size="lg"
            />
            <FormButton
              btnName={"Injira nk'umunyamuryango"}
              BtnHandler={(e) => {
                e.preventDefault();
                navigate("/");
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

export default AdminLogin;
