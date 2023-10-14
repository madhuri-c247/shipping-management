import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
//apiHelper
import { ADMIN_ALL_SHIPMENT_URL, apiUrl } from "../../../apiHelper";
//css
import styles from "../../user/saved-quote/saved-quote.module.scss";
//components
import ToastView from "../../../components/Toast";

const AllShipment = () => {
  const token = sessionStorage.getItem("token");
  const [shipment, setShipment] = useState([]);
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageClick = (data: any) => {
    console.log(data);
    const selectedPage = data.selected + 1;
    setPage(selectedPage);
    fetchData(selectedPage);
  };

  const fetchData = async (page: number) => {
    try {
      await axios
        .get(
          `${apiUrl}/admin/all-shipment-details?limit=${rowsPerPage}&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setTotalPages(res.data.result.totalPages);
          setShipment(res.data.result.docs);
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
    fetchData(page);
  }, [page, rowsPerPage]);

  return (
    <div className={`${styles.container} p-2`}>
      <h5>All Shipment</h5>
      <div className={`${styles.tableContainer}`}>
        <Table className={`${styles.table} table table-striped`} responsive>
          <thead className="">
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>From City</th>
              <th>from Postal</th>
              <th>Services</th>
              <th>To Postal</th>
              <th>To City</th>
            </tr>
          </thead>
          <tbody>
            {shipment
              ? shipment.map((item: any, index) => {
                  return (
                    <tr>
                      <td>{++index}</td>
                      <td>
                        <NavLink
                          className={"link"}
                          to={`/admin/all-shipment/details/${item._id}`}
                        >
                          {item._id}
                        </NavLink>
                      </td>
                      <td>{item.fromCity}</td>
                      <td>{item.fromPostal}</td>
                      <td>{item.serviceName}</td>
                      <td>{item.toCity}</td>
                      <td>{item.toPostal}</td>
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
          pageCount={totalPages}
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

export default AllShipment;
