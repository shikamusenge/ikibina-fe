/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { FaDonate, FaMoneyBill, FaUsers } from "react-icons/fa";
import Layout from "../../components/Layout";
import { useCallback, useEffect, useState } from "react";
import server from "../../utils/server";

const AdminHome = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const getMembers = useCallback(async () => {
    try {
      const resp = await server.get(`/users/admin/dashboard`);
      setData(resp.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    getMembers();
  }, [getMembers]);

  const main = (
    <div className="flex center">
      <div className="card" style={{ maxHeight: "fit-content" }}>
        <div className="card-body">
          <div className="card-title">
            <FaUsers /> Abanyamuryango
          </div>
          <div className="flex center">{!loading && data.members?.members}</div>
        </div>
      </div>
      <div className="card" style={{ maxHeight: "fit-content" }}>
        <div className="card-body">
          <div className="card-title">
            <FaDonate /> Imisanzu
          </div>
          <div className="flex center">{!loading && data.members?.amount}</div>
        </div>
      </div>
      <div className="card" style={{ maxHeight: "fit-content" }}>
        <div className="card-body">
          <div className="card-title">
            <FaMoneyBill /> Ibihano BITARISHURWA
          </div>
          <div className="flex center">{!loading && data.loan?.unpaidLoan}</div>
        </div>
      </div>
      <div className="card" style={{ maxHeight: "fit-content" }}>
        <div className="card-body">
          <div className="card-title">
            <FaMoneyBill /> Ibihano BYISHUWE
          </div>
          <div className="flex center">{!loading && data.loan?.paidLoan}</div>
        </div>
      </div>
    </div>
  );

  return <Layout main={main} page="dashboard" />;
};

export default AdminHome;
