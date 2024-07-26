/* eslint-disable react/prop-types */
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import { useState } from "react";
import { FaSackDollar } from "react-icons/fa6";
import FormSelect from "./FormSelect";
import { savingTypes, savingValue } from "../utils/savingtypes";
import SavingController from "../utils/controllers/Saving.controller";
const SavingForm = ({ member }) => {
  const [savingType, setSavingType] = useState();
  const [shareValue, setShareValue] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalShare, setTotalShare] = useState(0);
  const [loading, setLoading] = useState(false);
  const [Validated, setValidated] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        memberId: member.member_id,
        stId: savingType,
        numeberOfShares: totalShare,
        shareValue: shareValue,
      };
      const S = new SavingController();
      const resp = await S.Register(data);
      if (resp.data.status == 201) {
        alert("Kubika umunyamuryango byagenze neza!");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      {!member.sharevalue && (
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
              changeHandler={() => {
                setSavingType(+document.querySelector("#share").value);
                setShareValue(savingValue[+savingType - 1]);
                setValidated(false);
              }}
              items={savingTypes}
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
                  setShareValue(savingValue[+savingType - 1]);
                  console.log(totalShare, shareValue);
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
      )}{" "}
      {member.sharevalue && (
        <div className="card-body">
          <div className="card-title t-xl">
            <FaSackDollar /> Yateye {member.sharevalue}
          </div>
          <div>
            <div>Amazina: {member.firstName + " " + member.lastName}</div>
            <div>NID: {member.nid}</div>
            <div>Imigabane: {member.numeberOfShares}</div>
            <div>agaciro kaburi mugabane: {member.sharevalue}</div>
            <hr />
          </div>
        </div>
      )}
    </div>
  );
};

export default SavingForm;
