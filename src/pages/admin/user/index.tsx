import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
//apiHelper
import { ADMIN_ALL_USER_URL, ADMIN_USER_DELETE_URL, ADMIN_USER_UPDATE_URL } from "../../../apiHelper";
//css
import styles from "../../user/saved-quote/saved-quote.module.scss";
import { Outlet, useNavigate } from "react-router-dom";

const AllUser = () => {
  const token = sessionStorage.getItem("token");
  const [user, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [toggle, setToggle] = useState(true)
  const navigate = useNavigate()
  const fetchData = ()=>{
    axios
    .get(ADMIN_ALL_USER_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res)
      setUsers(res.data);
    })
    .catch((error) => {
      setMessage("Something is Wrong!");
    });
  }
  useEffect(() => {   
    fetchData()
  }, []);

  const handleUpdate = (id: string, number: number) => {
    navigate('/admin/all-users/update',{
      state: {
        id: id
      }
    })
  };
  const handleDelete = (id:string) => {
    try {
      axios.delete(`${ADMIN_USER_DELETE_URL}${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res)=>{
        fetchData();

      }).catch((error)=> console.log(error))
    } catch (error) {
      
    }
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
              <th>created At</th>
              <th>Last logged In</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {user
              ? user.map((item: any, index) => {
                console.log(item.verification,'verify')
                  return (
                    
                      <tr key={item._id}>
                        <td><a href="">{item._id}</a></td>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.companyName}</td>
                        <td>{item.number}</td>
                        <td>{item.verification?'yes':'no'}</td>
                        <td>{item.createdAt}</td>
                        <td>{item.lastLoggedIn}</td>
                        <td>
                          <button
                            className={`${styles.update}`}
                            onClick={() => handleUpdate(item._id, item.number)}
                          >
                            Update
                          </button>
                        </td>
                        <td>
                          <button
                            className={`${styles.delete}`}
                            onClick={()=>handleDelete(item._id)}
                          >
                            Delete
                          </button>
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
