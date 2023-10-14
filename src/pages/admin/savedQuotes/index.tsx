import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
//apiHelper
import { ADMIN_SAVED_QUOTES_URL, apiUrl } from "../../../apiHelper";
//css
import styles from "../../user/saved-quote/saved-quote.module.scss";
//components
import ToastView from "../../../components/Toast";

const AdminSavedQuotes = () => {
  const token = sessionStorage.getItem("token");
  const [quotes, setQuotes] = useState([]);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(false);
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
    const url = `${apiUrl}/admin/all-save-quote?limit=${rowsPerPage}&page=${page}`;
    try {
      await axios
        .get(`${url}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res, "res");
          setTotalPages(res.data.result.totalPages);
          setQuotes(res.data.result.docs);
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
      <h5>Saved Quotes</h5>
      <div className={`${styles.tableContainer}`}>
        <Table className={`${styles.table} table table-striped`} responsive>
          <thead>
            <tr>
              <th>id</th>
              <th>From Postal</th>
              <th>From City</th>
              <th>To Postal</th>
              <th>To City</th>
              <th>Insurance</th>
              <th>Services</th>
              <th>Quote Date</th>
            </tr>
          </thead>
          <tbody>
            {!!quotes.length &&
              quotes.map((item: any, index) => {
                
                const dateObject = new Date(item.quoteDate);
                const quoteDate = dateObject.toLocaleDateString();
                return (
                  <tr>
                    <td>
                      <a href="">{item._id}</a>
                    </td>
                    <td>{item.fromPostal}</td>
                    <td>{item.fromCity}</td>
                    <td>{item.toPostal}</td>
                    <td>{item.toCity}</td>
                    <td>{item.insuranceAmount}</td>
                    <td>{item.serviceName}</td>
                    <td>{quoteDate}</td>
                  </tr>
                );
              })}
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

export default AdminSavedQuotes;
