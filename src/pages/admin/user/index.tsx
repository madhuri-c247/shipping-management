import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
//apiHelper
import {
  ADMIN_USER_DELETE_URL,
  apiUrl,
} from "../../../apiHelper";
//css
import styles from "../../user/saved-quote/saved-quote.module.scss";
//components
import ToastView from "../../../components/Toast";
//react-icons
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const AllUser = () => {
  const token = sessionStorage.getItem("token");
  const [user, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(false);
  const [success, setSuccess] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const handlePageClick = (data: any) => {
    console.log(data);
    const selectedPage = data.selected + 1;
    setPage(selectedPage);
    fetchData(selectedPage);
  };

  const fetchData = async (page: number) => {
    try {
      await axios
        .get(`${apiUrl}/admin/allUser?limit=${limit}&page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res,'res')
          setTotalCount(res.data.result.totalPages)
          setUsers(res.data.result.docs);
        })
        .catch((error) => {
          setToast(true);
          setSuccess(false);
          setMessage("Something is Wrong!");
        });
    } catch (error) {
      setToast(true);
      setSuccess(false);
      setMessage("Something is Wrong!");
    }
  };

  useEffect(() => {
    if (location.state) {
      const { response } = location.state;
      setSuccess(true);
      setToast(true);
      setMessage(response);
    }
    fetchData(page);
  }, [page]);

  const handleDelete = async (id: string) => {
    try {
      await axios
        .delete(`${ADMIN_USER_DELETE_URL}${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setToast(true);
          setSuccess(true);
          setMessage(res.data.result.successful);
          fetchData(page);
        })
        .catch((error) => {
          setToast(true);
          setSuccess(false);
          setMessage("something is wrong");
        });
    } catch (error) {
      setToast(true);
      setSuccess(false);
      setMessage("something is wrong!!");
    }
  };

  return (
    <div className={`${styles.container} p-2`}>
      <h5>All Users</h5>
      <div className={`${styles.tableContainer}`}>
        <Table className={`${styles.table} table table-striped`} responsive>
          <thead>
            <tr>
              <th>User Id</th>
              <th>Email</th>
              <th> Name</th>
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
                  const dateObject = new Date(item.lastLoggedIn);
                  const formattedDate = dateObject.toLocaleDateString();
                  return (
                    <tr key={item._id}>
                      <td>
                        <a href="">{item._id}</a>
                      </td>
                      <td>{item.email}</td>
                      <td>
                        {item.firstName} {item.lastName}
                      </td>
                      <td>{item.companyName}</td>
                      <td>{item.number}</td>
                      <td>{item.verification ? "yes" : "no"}</td>
                      <td>{formattedDate}</td>
                      <td>
                        <AiFillEdit
                          style={{
                            color: "#02284e",
                            cursor: "pointer",
                            fontSize: "25px",
                          }}
                          onClick={() => {
                            navigate(`/admin/all-users/update/${item._id}`);
                          }}
                        />
                      </td>
                      <td>
                        <AiFillDelete
                          style={{
                            color: "red",
                            cursor: "pointer",
                            fontSize: "25px",
                          }}
                          onClick={() => handleDelete(item._id)}
                        />
                      </td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
          {toast ? (
            <ToastView
              message={message}
              success={success}
              setToast={setToast}
            />
          ) : (
            ""
          )}
        </Table>
        <ReactPaginate
          pageCount={totalCount}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default AllUser;
