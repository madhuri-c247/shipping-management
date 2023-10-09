import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//apiHelper
import { ADMIN_ALL_USER_URL, ADMIN_USER_DELETE_URL } from "../../../apiHelper";
//css
import styles from "../../user/saved-quote/saved-quote.module.scss";
import { Button } from "react-bootstrap";

const AllUser = () => {
  const token = sessionStorage.getItem("token");
  const [user, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const fetchData = () => {
    axios
      .get(ADMIN_ALL_USER_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        setMessage("Something is Wrong!");
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = (id: string, number: number) => {
    navigate("/admin/all-users/update", {
      state: {
        id: id,
      },
    });
  };
  const handleDelete = (id: string) => {
    try {
      axios
        .delete(`${ADMIN_USER_DELETE_URL}${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          fetchData();
        })
        .catch((error) => {});
    } catch (error) {}
  };

  return (
    <div className={`${styles.container} p-2`}>
      <h5>All Users</h5>
      <div className={`${styles.tableContainer}`}>
        <Table className={`${styles.table}`} responsive>
          <thead>
            <tr>
              <th>User Id</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Company Name</th>
              <th>Phone Number</th>
              <th>Verification</th>
              <th>Last logged In</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {user
              ? user.map((item: any, index) => {
                  console.log(item.verification, "verify");
                  return (
                    <tr key={item._id}>
                      <td>
                        <a href="">{item._id}</a>
                      </td>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.companyName}</td>
                      <td>{item.number}</td>
                      <td>{item.verification ? "yes" : "no"}</td>
                      <td>{item.lastLoggedIn}</td>
                      <td>
                        <Button
                          variant="info"
                          onClick={() => handleUpdate(item._id, item.number)}
                        >
                          Update
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
          {message ? (
            <h5 className={`${styles.message} error `}>{message}</h5>
          ) : (
            ""
          )}
        </Table>
      </div>
    </div>
  );
};

export default AllUser;
