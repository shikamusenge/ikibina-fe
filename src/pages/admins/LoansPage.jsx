/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "../../components/Layout";
import { useCallback, useState } from "react";
import server from "../../utils/server";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import LoanController from "../../utils/controllers/LoanController";

const LoansPage = () => {
  const [laons, setLoans] = useState([]);
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataloading, setDataLoading] = useState(false);
  const [loanstatus, setStatus] = useState("pending");

  const getLoans = useCallback(async () => {
    setDataLoading(true);
    const resp = await server.get(`/loans/data/${loanstatus}/0/100`);
    setLoans(resp.data);
    setDataLoading(false);
  });
  useEffect(() => {
    getLoans();
  }, []);
  const handleAction = async (id, action) => {
    try {
      setLoading(true);
      const Loan = new LoanController();
      const resp = await Loan.handleAction(id, action);
      if (resp.data) {
        alert("Igikorwa cyangenze neza!");
        await getLoans();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const main = (
    <div>
      <div className="px-2">
        <h3
          className="i-center max-h-fit"
          style={{
            maxHeight: "fit-content",
            textAlign: "center",
            marginBlock: "auto",
          }}
        >
          INGUZANYO ZASABWE NABANYAMURYANGO
        </h3>
        <div className="flex py-2">
          <div
            onClick={() => {
              if (loanstatus) {
                setStatus("pending");
                getLoans();
              }
            }}
          >
            <div
              className={loanstatus == "pending" ? "link link-active" : "link"}
            >
              IZITEGEREJE KWEMEZWA
            </div>
          </div>
          <div
            onClick={() => {
              if (loanstatus) {
                setStatus("active");
                getLoans();
              }
            }}
          >
            <div
              className={loanstatus == "active" ? "link link-active" : "link"}
            >
              IZIKISHYURWA
            </div>
          </div>
          <div
            onClick={() => {
              if (loanstatus) {
                setStatus("paid");
                getLoans();
              }
            }}
          >
            <div
              className={loanstatus == "active" ? "link link-active" : "link"}
            >
              IZISHYUWE
            </div>
          </div>
          <div
            onClick={() => {
              if (loanstatus) {
                setStatus("rejected");
                getLoans();
              }
            }}
          >
            <div className="link">IZANZWE</div>
          </div>
        </div>
      </div>
      <hr />
      <div className="card" style={{ height: "70vh" }}>
        {dataloading ? (
          <div>Gufunguka......</div>
        ) : (
          <table
            cellSpacing={0}
            border={1}
            cellPadding={3}
            style={{ backgroundColor: "white", width: "100%" }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "lighgray",
                  color: "darkgreen",
                  textTransform: "capitalizel",
                  fontSize: "16px",
                }}
              >
                <th>ID</th>
                <th>{"ITARIKI"}</th>
                <th>{"AMAZINA"}</th>
                <th>UBUSOBANURO</th>
                <th>{"AGACIRO K' INGUZANYO"}</th>
                <th>Azishurwa</th>
                <th>Ayishuwe</th>
                <th>Ahobigeze</th>
                <th colSpan={2}>IGIKORWA</th>
              </tr>
            </thead>
            <tbody>
              {laons.map((item, index) => (
                <tr key={index}>
                  <td>{item.loanId}</td>
                  <td>{item.firstName + " " + item.lastName}</td>
                  <td>{item.requestDate.split("T")[0]}</td>
                  <td>{item.re}</td>
                  <td>{item.amount}</td>
                  <td>{item.amountTopay}</td>
                  <td>{item.payedAmount}</td>
                  <td>
                    {item.lstatus == "pending"
                      ? "irategereje"
                      : item.lstatus == "active"
                      ? "yarakiriwe"
                      : item.lstatus == "paid"
                      ? "yarishyuwe"
                      : "ntiyemewe"}
                  </td>
                  {item.lstatus == "pending" && (
                    <>
                      <td>
                        <div
                          className={`btn-sm ${loading && "btn-disbled"}`}
                          onClick={(e) => {
                            e.preventDefault();
                            !loading && handleAction(item.loanId, "active");
                          }}
                        >
                          approve
                        </div>
                      </td>
                      <td>
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            handleAction(item.loanId, "rejected");
                          }}
                          className="btn-sm"
                        >
                          reject
                        </div>
                      </td>
                    </>
                  )}
                  {item.lstatus == "active" && (
                    <>
                      <td>
                        <div
                          className={`btn-sm ${loading && "btn-disbled"}`}
                          onClick={async (e) => {
                            e.preventDefault();
                            const maxpay = Number(
                              item.amountTopay - Number(item.payedAmount)
                            );
                            const payment = Number(
                              prompt(`Enter amount to pay max(${maxpay})`)
                            );
                            if (!payment || payment > maxpay || payment <= 0) {
                              return alert("injizamo amafaranga neza");
                            }
                            const status =
                              maxpay == payment ? "paid" : "active";
                            const payLoad = {
                              amount: payment,
                              status: status,
                              loanId: item.loanId,
                            };
                            try {
                              await server.put("/loans/pay", payLoad);
                              alert("payment success");
                              getLoans();
                              // !loading && handleAction(item.loanId, "active");
                            } catch (error) {
                              alert(
                                "something went wrong try again after some time"
                              );
                              console.log(error);
                            }
                          }}
                        >
                          ishyura
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
  return <Layout main={main} page={"inguzanyo"} />;
};

export default LoansPage;
