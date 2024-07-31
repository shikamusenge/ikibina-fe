/* eslint-disable react-hooks/exhaustive-deps */
import { FaFilter, FaUserPlus } from "react-icons/fa6";
import Layout from "../../components/Layout";
import { useCallback, useState } from "react";
import PopUp from "../../components/PopUp";
import server from "../../utils/server";
import { useEffect } from "react";
import UserForm from "../../components/UserForm";

const Users = () => {
  const [popOpen, setPopOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [Users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    const resp = await server.get(`/users`);
    setUsers(resp.data);
  });
  useEffect(() => {
    getUsers();
  }, []);
  const main = (
    <div>
      {popOpen && (
        <PopUp
          clickEvent={setPopOpen}
          child={<UserForm reloader={getUsers} />}
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
          USERS
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
            <FaUserPlus className="text-success" /> add User
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
              <th>ID</th>
              <th>Amazina </th>
              <th>email</th>
              <th>Imiterere</th>
              <th>Role</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {Users.map((item, index) => (
              <tr key={index}>
                <td>{item.user_id}</td>
                <td>{item.fullname}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>{item.status}</td>
                <td className="flex j-space-btn w-fit">
                  {item.role != "supperadmin" ? (
                    <>
                      <button
                        className="btn-sm"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        FUNGA
                      </button>
                      <button
                        className="btn-sm"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        RESET PASSWORD
                      </button>
                    </>
                  ) : (
                    "@supper account"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <br />
      </div>
    </div>
  );
  return <Layout main={main} page={"users"} />;
};

export default Users;
