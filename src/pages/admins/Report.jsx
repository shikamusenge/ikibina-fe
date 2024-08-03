import { useEffect, useState } from "react";
import server from "../../utils/server";
import { ExportToExcel } from "../../components/ExportToExcel";
import Layout from "../../components/Layout";
const Report = () => {
  const [data, setData] = useState([]);
  const fileName = "RAPORO Y'IKIBINA TWITEZE IMBERE";
  const fetchData = async () => {
    const resp = await server.get(`/members/0/100`);
    setData(resp.data);
  };
  useEffect(() => {
    fetchData();
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
          URUTONDE RWABANYAMURYANGO
        </h3>
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
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{++index}</td>
                <td>{item.nid}</td>
                <td>{item.firstName + " " + item.lastName}</td>
                <td>{item.telphone}</td>
                <td>{item.blance}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ExportToExcel apiData={data} fileName={fileName} />
      </div>
    </div>
  );
  return <Layout main={main} page={"abanyamuryango"} />;
};

export default Report;
