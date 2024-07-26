/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import FormButton from "./FormButton";
import { useCallback, useEffect, useState } from "react";
import FormSelect from "./FormSelect";
import { FaPoundSign } from "react-icons/fa";
import FormInput from "./FormInput";
import server from "../utils/server";
import PenalityController from "../utils/controllers/PenalitiesController";
const PenalityForm = ({ member, close }) => {
  const [loading, setLoading] = useState(false);
  const [Validated, setValidated] = useState(false);
  const [pList, setPList] = useState([]);
  const [amount, setAmount] = useState(0);
  const [ptype, setPtype] = useState(0);

  const getMembers = useCallback(async () => {
    const resp = await server.get(`/penalities/selectlist`);
    setPList(resp.data);
    setPtype(resp.data[0].amount);
  });
  useEffect(() => {
    getMembers();
  }, []);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        pType: ptype,
        amount,
        memberId: member.member_id,
      };
      const P = new PenalityController();
      const response = await P.Register(data);
      console.log(response);
      if (response.data.status == 201) {
        alert("igihano cyatanzwe neza");
        close(false);
      } else {
        alert("hari iki tagenze neza");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title t-xl">
          <FaPoundSign /> IFISHI Y&#39; AMANDE
        </div>
        <div></div>
        <form>
          <FormInput
            label={"UHANWE"}
            id={"share"}
            value={member.firstName + " " + member.lastName}
            disabled={true}
          />
          <FormSelect
            label={"UBWOKO BW' IGIHANO"}
            id={"share"}
            value={""}
            changeHandler={(e) => {
              setValidated(false);
              setPtype(e.target.value);
            }}
            items={pList}
          />

          {!Validated && (
            <FormButton
              btnName={"Validate"}
              type="btn-outline-primary"
              BtnHandler={(e) => {
                e.preventDefault();
                const amount = pList.filter((item) => item.value == ptype);
                setAmount(amount[0].amount);
                if (!amount == 0) setValidated(true);
                else alert("uzuza ibinu byose neza");
              }}
            />
          )}
          {Validated && (
            <>
              <FormInput label={"amount"} value={amount} disabled={true} />
              <FormButton
                btnName={loading ? "KUBIKA ....." : "KUBIKA"}
                type="btn-primary"
                BtnHandler={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              />
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default PenalityForm;
