import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
//apiHelper
import { SAVED_QUOTE_URL } from "../../../apiHelper";
//css
import styles from "./saved-quote.module.scss";

const Shipment = () => {
  const token = sessionStorage.getItem("token");
  const [quotes, setQuotes] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    axios
      .get(SAVED_QUOTE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setQuotes(res.data);
      })
      .catch((error) => {
        setMessage(error);
      });
  }, []);

  return (
    <div className={`${styles.container} p-2`}>
      <h5>Saved Quotes</h5>
      <div className={`${styles.tableContainer}`}>
        {message ? <h5>{message}</h5> : ""}
        <Table className={`${styles.table}`} responsive>
          <thead>
            <tr>
              <th>#</th>
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
                  return (
                    <>
                      <tr>
                        <td>{++index}</td>
                        <td>{item.quoteDate}</td>
                        <td>{item.companyName}</td>
                        <td>{item.serviceName}</td>
                        <td>{item.fromPostal}</td>
                        <td>{item.fromCity}</td>
                        <td>{item.toPostal}</td>
                        <td>{item.toCity}</td>
                        <td>{item.insuranceAmount}</td>
                        <td></td>
                        <td>
                          <NavLink className={`btn btn-primary`} to={`/user/quote/checkout`}>Pay Now</NavLink>
                        </td>
                      </tr>
                    </>
                  );
                })
              : ""}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Shipment;
