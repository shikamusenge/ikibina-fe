/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "../../components/Layout";
import { useCallback, useState } from "react";
import server from "../../utils/server";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyLoans = () => {
  const [laons, setLoans] = useState([]);
  const navigate = useNavigate();
  const getLoans = useCallback(async () => {
    const resp = await server.get(`/loans/member`);
    setLoans(resp.data);
  });
  useEffect(() => {
    getLoans();
  }, []);
  const main = (
    <div>
      <div className="flex i-center j-space-btn px-2">
        <h3
          className="i-center max-h-fit"
          style={{
            maxHeight: "fit-content",
            textAlign: "center",
            marginBlock: "auto",
          }}
        >
          INGUZANYO NASABYE
        </h3>
        <div onClick={() => navigate("/umunyamuryango/inguzanyo/gusaba")}>
          <div className="btn btn-primary">SABA INGUZANYONHSYA</div>
        </div>
      </div>
      <hr />
      <div className="card" style={{ height: "70vh" }}>
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
              <th>UBUSOBANURO</th>
              <th>{"AGACIRO K' INGUZANYO"}</th>
              <th>Azishurwa</th>
              <th>Ayishuwe</th>
              <th>Ahobigeze</th>
            </tr>
          </thead>
          <tbody>
            {laons.map((item, index) => (
              <tr key={index}>
                <td>{item.loanId}</td>
                <td>{item.requestDate}</td>
                <td>{item.re}</td>
                <td>{item.amount}</td>
                <td>{item.amountTopay}</td>
                <td>{item.payedAmount}</td>
                <td>
                  {item.status == "pending"
                    ? "itegereje kwemezwa"
                    : item.status == "active"
                    ? "yarakiriwe"
                    : item.status == "completed"
                    ? "yarishyuwe"
                    : "ntiyemewe"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  return <Layout main={main} page={"inguzanyo"} />;
};

export default MyLoans;
