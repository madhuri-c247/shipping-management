import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
//apiHelper
import { ADMIN_SAVED_QUOTES_URL } from "../../../apiHelper";
//css
import styles from "../../user/saved-quote/saved-quote.module.scss";

const AdminSavedQuotes = () => {
  const token = sessionStorage.getItem("token");
  const [quotes, setQuotes] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    axios
      .get(ADMIN_SAVED_QUOTES_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setQuotes(res.data);
      })
      .catch((error) => {
        setMessage("Something is Wrong!");
      });
  }, []);

  return (
    <div className={`${styles.container} p-2`}>
      <h5>Saved Quotes</h5>
      <div className={`${styles.tableContainer}`}>
        <Table className={`${styles.table}`} responsive>
          <thead>
            <tr>
              <th>#</th>
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
            {quotes
              ? quotes.map((item: any, index) => {
                  return (
                    <>
                      <tr>
                        <td>{++index}</td>
                        <td>
                          <a href="">{item._id}</a>
                        </td>
                        <td>{item.fromPostal}</td>
                        <td>{item.fromCity}</td>
                        <td>{item.toPostal}</td>
                        <td>{item.toCity}</td>
                        <td>{item.insuranceAmount}</td>
                        <td>{item.serviceName}</td>
                        <td>{item.quoteDate}</td>
                      </tr>
                    </>
                  );
                })
              : ""}
          </tbody>
          {message ? <h5 className={`${styles.message} error `}>{message}</h5> : ""}
        </Table>
      </div>
    </div>
  );
};

export default AdminSavedQuotes;
