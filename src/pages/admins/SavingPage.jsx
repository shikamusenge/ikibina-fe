/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "../../components/Layout";
import { useCallback, useState } from "react";
import PopUp from "../../components/PopUp";
import server from "../../utils/server";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SavingForm from "../../components/SavingForm";

const SavingPage = () => {
  const [popOpen, setPopOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [curentMember, setCurrentMember] = useState({});
  const [total, setTotal] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(20);
  const getMembers = useCallback(async () => {
    const resp = await server.get(`/members/saving/${start}/${end}`);
    const resp2 = await server.get("/members/total");
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
          child={<SavingForm member={curentMember} />}
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
          KWIZIGAMA KW&apos; ABANYAMURYANGO
        </h3>
        <div className="i-center"></div>

        <div></div>
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
              <th>Imiterere</th>
            </tr>
          </thead>
          <tbody>
            {members.map((item, index) => (
              <tr key={index}>
                <td>{item.member_id}</td>
                <td>
                  <Link
                    onClick={() => {
                      setPopOpen(true);
                      setCurrentMember(item);
                    }}
                  >
                    {item.nid}
                  </Link>
                </td>
                <td>{item.firstName + " " + item.lastName}</td>
                <td>{item.sharevalue ? "YIZIGAMYE" : "NTARIZIGAMA"}</td>
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

export default SavingPage;
