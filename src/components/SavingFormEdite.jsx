/* eslint-disable react/prop-types */
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import { useState } from "react";
import { FaSackDollar } from "react-icons/fa6";
import FormSelect from "./FormSelect";
import SavingController from "../utils/controllers/Saving.controller";
import { useEffect } from "react";
import server from "../utils/server";
const SavingFormEdite = ({ member, reloader }) => {
  const [shares, setShares] = useState([]);
  const [savingType, setSavingType] = useState();
  const [shareValue, setShareValue] = useState(member.shareValue);
  const [total, setTotal] = useState(0);
  const [totalShare, setTotalShare] = useState(member.numeberOfShares);
  const [loading, setLoading] = useState(false);
  const [Validated, setValidated] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        savId: member.sav_id,
        memberId: member.member_id,
        stId: savingType,
        numeberOfShares: totalShare,
        shareValue: shareValue,
      };
      const S = new SavingController();
      const resp = await S.Update(data);
      if (resp.data.status == 201) {
        alert("Kubika umunyamuryango byagenze neza!");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
      reloader();
    }
  };
  const getList = async () => {
    try {
      const response = server.get("/saving/type/list");
      setShares((await response).data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title t-xl">
          <FaSackDollar /> IFISHI Y &#39; UBWIZIGAME
        </div>
        <div>
          <p>Amazina: {member.firstName + " " + member.lastName}</p>
          <p>NID: {member.nid}</p>
          <hr />
        </div>
        <form>
          <FormSelect
            label={"Ubwoko bw' umugabane"}
            id={"share"}
            value={savingType}
            changeHandler={(e) => {
              setSavingType(+document.querySelector("#share").value);
              const value = shares.filter(
                (item) => item.value == e.target.value
              )[0];
              console.log(value);
              setShareValue(value.amount);
              setValidated(false);
            }}
            items={shares}
          />
          <FormInput
            type={"text"}
            label={"UMUBARE W'IMIGABANE ATANZE"}
            value={totalShare}
            id="qt"
            changeHandler={(e) => {
              if (e.target.value >= 0) setTotalShare(+e.target.value);
              setValidated(false);
            }}
          />
          <FormInput
            type={"number"}
            label={"TOTAL"}
            value={total}
            disabled={true}
          />
          {!Validated && (
            <FormButton
              btnName={"Validate"}
              type="btn-outline-primary"
              BtnHandler={(e) => {
                e.preventDefault();
                setSavingType(+document.querySelector("#share").value);
                console.log(shareValue);
                setTotal(totalShare * shareValue);
                if (total != 0) setValidated(true);
                else alert("Ibyo mwinjije ntibihura");
              }}
            />
          )}
          {Validated && (
            <FormButton
              btnName={loading ? "KUBIKA ....." : "KUBIKA"}
              type="btn-primary"
              BtnHandler={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default SavingFormEdite;
