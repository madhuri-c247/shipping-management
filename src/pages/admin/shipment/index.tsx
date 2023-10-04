import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
//apiHelper
import { ADMIN_SAVED_QUOTES_URL, SAVED_QUOTE_URL } from "../../../apiHelper";
//css
import styles from "../../user/saved-quote/saved-quote.module.scss";
//common
import Button from "../../../common/button";

const AllShipment = () => {
  const token = sessionStorage.getItem("token");
  const [quotes, setQuotes] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    axios.get(ADMIN_SAVED_QUOTES_URL).then((res)=>{
      console.log(res, 'res')
    }).catch((error)=>{

    })
     
  }, []);

  return (
    <div className={`${styles.container} p-2`}>
      <h5>All Shipment</h5>
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
                        <td>
                          <Button
                            value="Pay Now"
                            className={`${styles.button}`}
                          />
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

export default AllShipment;
