import { FaDonate, FaMoneyBill, FaUsers } from "react-icons/fa";
import Layout from "../../components/Layout";

const SupperAdminHome = () => {
  const main = (
    <div className="flex center">
      <div className="card" style={{ maxHeight: "fit-content" }}>
        <div className="card-body">
          <div className="card-tile">
            <FaUsers /> Abanyamuryango
          </div>
          <div className="flex center">500</div>
        </div>
      </div>
      <div className="card" style={{ maxHeight: "fit-content" }}>
        <div className="card-body">
          <div className="card-tile">
            <FaDonate /> imisanzu
          </div>
          <div className="flex center">79, 898, 886 </div>
        </div>
      </div>
      <div className="card" style={{ maxHeight: "fit-content" }}>
        <div className="card-body">
          <div className="card-tile">
            <FaMoneyBill /> ibihano
          </div>
          <div className="flex center"> 898, 886 FRW </div>
        </div>
      </div>
    </div>
  );
  return <Layout main={main} role={"supperadmin"} />;
};

export default SupperAdminHome;
