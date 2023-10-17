import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
//apiHelper
import { apiUrl } from "../../../apiHelper";
//css
import styles from "./saved-quote.module.scss";
//components
import ToastView from "../../../components/Toast";
import Pagination from "../../../components/pagination";

const Shipment = () => {
  const token = sessionStorage.getItem("token");
  const [quotes, setQuotes] = useState([]);
  const [toast, setToast] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = async (page: number) => {
    if (toast) {
      setToast(false);
    }
    try {
      await axios
        .get(`${apiUrl}/quote/saveQuote?limit=${limit}&page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTotalCount(res.data.result.totalPages);
          setQuotes(res.data.result.docs);
          setSuccess(true);
        })
        .catch((error) => {
          setToast(true);
          setSuccess(false);
          setMessage(error);
        });
    } catch (error) {
      setSuccess(false);
      setToast(true);
      setMessage("Something is Wrong!");
    }
  };
  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <div className={`${styles.container} p-2`}>
      <h5>Saved Quotes</h5>
      <div className={`${styles.tableContainer}`}>
        <Table className={`${styles.table}`} responsive>
          <thead>
            <tr>
              <th>Quote Date</th>
              <th>Company Name</th>
              <th>Service Name</th>
              <th>From Postal</th>
              <th>From City</th>
              <th>To Postal</th>
              <th>To City</th>
              <th>Insurance</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {quotes
              ? quotes.map((item: any, index) => {
                  const dateObject = new Date(item.quoteDate);
                  const quoteDate = dateObject.toLocaleDateString();
                  return (
                    <tr key={index}>
                      <td>{quoteDate}</td>
                      <td>{item.companyName}</td>
                      <td>{item.serviceName}</td>
                      <td>{item.fromPostal}</td>
                      <td>{item.fromCity}</td>
                      <td>{item.toPostal}</td>
                      <td>{item.toCity}</td>
                      <td>{item.insuranceAmount}</td>
                      <td>100</td>
                      <td>
                        <NavLink
                          className={`btn btn-primary`}
                          to={`/user/quote/checkout/${item._id}`}
                        >
                          Pay Now
                        </NavLink>
                      </td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </Table>
        {!!quotes.length && (
          <Pagination
            setPage={setPage}
            fetchData={fetchData}
            totalPages={totalCount}
          />
        )}
      </div>
      {toast ? (
        <ToastView message={message} success={success} setToast={setToast} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Shipment;
