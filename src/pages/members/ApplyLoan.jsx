import { useState } from "react";
import FormButton from "../../components/FormButton";
import FormInput from "../../components/FormInput";
import Layout from "../../components/Layout";
import LoanController from "../../utils/controllers/LoanController";
import { useNavigate } from "react-router-dom";
import Promt from "../../components/Promt";
import PopUp from "../../components/PopUp";

const ApplyLoan = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [re, setRe] = useState("");
  const [popOpen, setPopOpen] = useState(false);
  const [popOpen2, setPopOpen2] = useState(false);
  const navigate = useNavigate();
  const redirect = () => navigate("/umunyamuryango");
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = { amount, duration, re, rate: 5, amountTopay: getTotal() };
      const LoanCtr = new LoanController();
      const response = await LoanCtr.Register(data);
      if (response.data.status == 201) {
        setAmount(0);
        setDuration(0);

        setPopOpen(false);
        setPopOpen2(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getProfit = () => Number((amount * 5) / 100);
  const getTotal = () => Number(Number(amount) + getProfit());
  const main = (
    <div className="flex center">
      {popOpen2 && (
        <PopUp
          clickEvent={(data) => {
            setPopOpen2(data);
            redirect();
          }}
          child={
            <div className="card">
              <div className="card-body">
                <div className="card-title">UBUSABE BWAWE BWOHEREJWE NEZA</div>
              </div>
            </div>
          }
        />
      )}
      {popOpen && (
        <PopUp
          clickEvent={setPopOpen}
          child={
            <Promt
              title={"GUSABA INGUZANO?"}
              body={
                <div>
                  <p>
                    Ugiye gusaba inguza nyo ya <b>{amount}</b>
                  </p>
                  <p>
                    kunyungu ya <b>5%</b>
                  </p>
                  <p>
                    izishurwa mugihe cyamezi <b>{duration}</b>
                  </p>
                  <p>
                    inyungu ni <b>{getProfit()}</b>
                  </p>
                  <p>
                    igiteranyo cyazi shyurwa yose <b>{getTotal()}</b>
                  </p>
                </div>
              }
              reject={() => {
                setPopOpen(false);
              }}
              aprove={() => {
                handleSubmit();
              }}
            />
          }
        />
      )}
      <div className="card">
        <div className="card-body">
          <h1 style={{ width: "700px", maxWidth: "80%" }}>
            IFISHI ISABA INGUZANYO INYUNGU YA 5%
          </h1>
          <form>
            <FormInput
              label={"umubare wamafaranga asaba (FRW)"}
              type={"number"}
              value={amount}
              changeHandler={(e) => setAmount(e.target.value)}
            />
            <FormInput
              label={"UMUBARE W'AMEZI INGUZANYO IZISHYURIRWA"}
              type={"number"}
              value={duration}
              changeHandler={(e) => setDuration(e.target.value)}
            />
            <div className="input-group">
              <label htmlFor="re">Ubuso banuro Kunguzanyo isabwa</label>
              <textarea
                name=""
                id="re"
                maxLength={1000}
                rows={10}
                value={re}
                onChange={(e) => setRe(e.target.value)}
              ></textarea>
            </div>
            <FormButton
              btnName={loading ? "KOHEREZA GUSABA...." : "SABA"}
              type="btn-primary"
              BtnHandler={(e) => {
                e.preventDefault();
                if (re != "" && amount != 0 && duration != 0 && !loading) {
                  setPopOpen(true);
                } else {
                  alert("uzuza neza ibinu byose");
                }
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
  return <Layout main={main} role={"member"} page={"inguzanyo"} />;
};

export default ApplyLoan;
