/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import server from "../../utils/server";
import PopUp from "../../components/PopUp";
import SavingFormEdite from "../../components/SavingFormEdite";
const MemberSavings = () => {
  const [popOpen, setPopOpen] = useState(false);
  const [data, setData] = useState([]);
  const dt = new Date();
  const [date, setDate] = useState(dt);
  const [loading, setLoading] = useState(false);
  const [curentMember, setCurrentMember] = useState({});

  const getData = useCallback(async () => {
    const resp = await server.post(`/saving/data`, { date });
    setData(resp.data);
    setLoading(false);
  });
  const reloader = async () => {
    setLoading(true);
    await getData();
    setPopOpen(false);
  };
  useEffect(() => {
    setLoading(true);
    getData();
  }, []);
  const main = (
    <div>
      {popOpen && (
        <PopUp
          clickEvent={setPopOpen}
          child={<SavingFormEdite member={curentMember} reloader={reloader} />}
        />
      )}

      <div>
        <div className="flex">
          <div className="input-group">
            <input
              type="date"
              className="form-control"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <button
              className="btn btn-sm"
              style={{ maxWidth: "2rem" }}
              onClick={() => getData()}
            >
              Find
            </button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            {"UBWIZIGAME BW'ABANYAMURYANGO KUWA " + date}
          </div>
          <table
            cellSpacing={0}
            border={1}
            cellPadding={3}
            style={{ backgroundColor: "white", width: "100%" }}
          >
            <thead>
              <tr style={{ backgroundColor: "lighgray", color: "darkgreen" }}>
                <th>No</th>
                <th>Names</th>
                <th>Shares</th>
                <th>share Value</th>
                <th>total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                data.map((item, index) => (
                  <tr key={1 + index}>
                    <td>{++index}</td>
                    <td>{item.firstName + " " + item.lastName}</td>
                    <td>{item.sharevalue}</td>
                    <td>{item.numeberOfShares}</td>
                    <td>{item.total}</td>
                    {item.sharevalue && (
                      <td style={{ maxWidth: "fit-content" }}>
                        <button
                          className="link"
                          onClick={() => {
                            setPopOpen(true);
                            setCurrentMember(item);
                          }}
                        >
                          Hindura
                        </button>
                        <button
                          className="link"
                          style={{ fontSize: "12px" }}
                          onClick={() => {
                            setPopOpen(true);
                            setCurrentMember(item);
                          }}
                        >
                          reba impinduka zakozwe
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  return <Layout main={main} page="abanyamuryango" />;
};

export default MemberSavings;
