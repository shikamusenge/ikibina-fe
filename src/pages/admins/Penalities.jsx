/* eslint-disable react-hooks/exhaustive-deps */
import { FaFilter } from "react-icons/fa6";
import Layout from "../../components/Layout";
import { useCallback, useState } from "react";
import PopUp from "../../components/PopUp";
import server from "../../utils/server";
import { useEffect } from "react";
import Promt from "../../components/Promt";
import PenalityController from "../../utils/controllers/PenalitiesController";
const Penalities = () => {
  const [popOpen, setPopOpen] = useState(false);
  const [search, setSearch] = useState("all");
  const [members, setMembers] = useState([]);
  const [total, setTotal] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(20);
  const [currentMember, setCurrent] = useState({});
  const [loading, setLoading] = useState(false);
  const getMembers = useCallback(async () => {
    const resp = await server.get(`/penalities/data/${start}/${end}/${search}`);
    const resp2 = await server.get("/penalities/total/" + search);
    setTotal(resp2.data);
    setMembers(resp.data);
  });
  useEffect(() => {
    getMembers();
  }, []);
  const main = (
    <div>
      {popOpen && (
        <PopUp
          clickEvent={setPopOpen}
          child={
            <Promt
              title={"KWEMEZA Ubwishu?"}
              body={`
          Ugiye kwemeza ko ${
            (currentMember.firstName, " ", currentMember.lastName)
          } yishuye igihano gihwanye na ${currentMember.amount} yahawe kuwa ${
                currentMember.date
              }
            `}
              reject={() => setPopOpen(false)}
              aprove={async () => {
                if (!loading) {
                  setLoading(true);
                  const P = new PenalityController();
                  const pay = await P.pay(currentMember.p_id);
                  if (pay.data.status == 201) {
                    alert("payment success");
                    getMembers();
                    setPopOpen(false);
                    setCurrent({});
                  }
                }
              }}
            />
          }
        />
      )}

      <div className="flex i-center j-space-btn px-2">
        <h3
          className="i-center max-h-fit"
          style={{
            maxHeight: "fit-content",
            textAlign: "center",
            marginBlock: "auto",
          }}
        >
          URUTONDE RWABANYAMURYANGO BACIWE AMANDE
        </h3>
        <div className="i-center">
          <div style={{ height: "2rem", marginBlock: "auto" }}>
            <FaFilter />{" "}
            <input
              disabled
              type="search"
              value={search}
              className="form-control"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </div>

        <div>
          <div
            className="btn btn-outline-primary"
            onClick={() => {
              setSearch("wait");
              getMembers();
            }}
          >
            IBITARISHURWA
          </div>
          <div
            className="btn btn-outline-primary"
            onClick={() => {
              setSearch("paid");
              getMembers();
            }}
          >
            IBYISHUWE
          </div>
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
            <tr style={{ backgroundColor: "lighgray", color: "darkgreen" }}>
              <th>No</th>
              <th>Italiki yahaniwe</th>
              <th>Amazina </th>
              <th>agaciro (FRW)</th>
              <th>Imiterere</th>
              <th>IGIKORWA</th>
            </tr>
          </thead>
          <tbody>
            {members.map((item, index) => (
              <tr key={index}>
                <td>{item.member_id}</td>
                <td>{item.date.split("T")[0]}</td>
                <td>{item.firstName + " " + item.lastName}</td>
                <td>{item.amount}</td>
                <td className="status">
                  {item.pstatus == "paid"
                    ? "yarishuwe"
                    : "itegereje kwishyurwa"}
                </td>
                <td className="flex j-space-btn w-fit">
                  {item.pstatus == "paid" ? (
                    `yishuwe ${item.PayedArt}`
                  ) : (
                    <button
                      className="btn-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        setPopOpen(true);
                        setCurrent(item);
                      }}
                    >
                      Emeza Ubwishyu
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <br />
        {Array(Math.ceil(Number(total) / 20))
          .fill(1)
          .map((item, index) => (
            <span
              key={index}
              className="btn-sm"
              onClick={() => {
                setEnd((index + 2) * 20);
                setStart(index * 20);
                getMembers();
                getMembers();
              }}
            >
              {index + 1}
            </span>
          ))}
      </div>
    </div>
  );
  return <Layout main={main} />;
};

export default Penalities;
