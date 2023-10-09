import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
//apiHelper
import { ADMIN_ALL_SHIPMENT_URL } from "../../../apiHelper";
//css
import styles from "../../user/saved-quote/saved-quote.module.scss";

const AllShipment = () => {
  const token = sessionStorage.getItem("token");
  const [shipment, setShipment] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    axios
      .get(ADMIN_ALL_SHIPMENT_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setShipment(res.data);
      })
      .catch((error) => {
        setMessage("Something is Wrong!");
      });
  }, []);

  return (
    <div className={`${styles.container} p-2`}>
      <h5>All Shipment</h5>
      <div className={`${styles.tableContainer}`}>
        <Table className={`${styles.table}`} responsive>
          <thead>
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
                    <>
                      <tr>
                        <td>{++index}</td>
                        <td>
                          <NavLink
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
                    </>
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

export default AllShipment;
