/* eslint-disable react-hooks/exhaustive-deps */
import { FaFilter, FaUserPlus } from "react-icons/fa6";
import Layout from "../../components/Layout";
import { useCallback, useState } from "react";
import PopUp from "../../components/PopUp";
import MemberRegisterForm from "../../components/MemberRegisterForm";
import server from "../../utils/server";
import { useEffect } from "react";
import PenalityForm from "../../components/PenalityForm";

const Members = () => {
  const [popOpen, setPopOpen] = useState(false);
  const [popOpen2, setPopOpen2] = useState(false);
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState([]);
  const [current, setCurrent] = useState(null);
  const [total, setTotal] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(20);
  const getMembers = useCallback(async () => {
    const resp = await server.get(`/members/${start}/${end}`);
    const resp2 = await server.get("/members/total");
    setTotal(resp2.data);
    setMembers(resp.data);
  });
  useEffect(() => {
    getMembers();
  }, []);
  const main = (
    <div>
      {popOpen2 && (
        <PopUp
          clickEvent={setPopOpen2}
          child={<PenalityForm member={current} close={setPopOpen2} />}
        />
      )}
      {popOpen && (
        <PopUp
          clickEvent={setPopOpen}
          child={<MemberRegisterForm reloader={getMembers} />}
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
          URUTONDE RWABANYAMURYANGO
        </h3>
        <div className="i-center">
          <div style={{ height: "2rem", marginBlock: "auto" }}>
            <FaFilter />{" "}
            <input
              type="search"
              className="form-control"
              onChange={(e) => {
                setSearch(e.target.value);
                console.log(search);
              }}
            />
          </div>
        </div>

        <div>
          <div
            className="btn btn-outline-primary"
            onClick={() => setPopOpen(true)}
          >
            <FaUserPlus className="text-success" /> Ongeraho Umunyamuryango
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
              <th>{"Nomero y'Indangamunu"}</th>
              <th>Amazina </th>
              <th>Nimero Ya Telephone</th>
              <th>Ubwizigame (FRW)</th>
              <th>Imiterere</th>
              <th>IGIKORWA</th>
            </tr>
          </thead>
          <tbody>
            {members.map((item, index) => (
              <tr key={index}>
                <td>{item.member_id}</td>
                <td>{item.nid}</td>
                <td>{item.firstName + " " + item.lastName}</td>
                <td>{item.telphone}</td>
                <td>{item.blance}</td>
                <td>{item.status}</td>
                <td className="flex j-space-btn w-fit">
                  <button
                    className="btn-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrent(item);
                      setPopOpen2(true);
                    }}
                  >
                    GUHANA
                  </button>
                  <button className="btn-sm">KUVUGURURA</button>
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
  return <Layout main={main} page={"abanyamuryango"} />;
};

export default Members;
