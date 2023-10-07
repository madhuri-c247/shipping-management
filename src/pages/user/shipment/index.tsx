import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
//apiHelper
import { MY_SHIPMENT_URL, STATUS_URL } from "../../../apiHelper";
//css
import styles from "./shipment.module.scss";

const Shipment = () => {
  const token = sessionStorage.getItem("token");
  const [quotes, setQuotes] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const shipment = async () => {
      await axios
        .get(MY_SHIPMENT_URL, {
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
    };
    shipment();
  }, []);

  const shipmentDetail = (id: string)=> {
    alert('hell')
    // navigate(`/admin/all-shipment/details/${id}`)   
  }
  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: number,
    id: any
  ) => {
    const updatedOptions = [...selectedOption];
    updatedOptions[index] = event.target.value;
    setSelectedOption(updatedOptions);
    const status = event.target.value;
    axios
      .put(
        STATUS_URL,
        {
          id: id,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setMessage("");
      })
      .catch((error) => {
        setMessage(error.response.data.errors[0].message);
      });
  };

  return (
    <div className={`${styles.container} p-2`}>
      <h5>My Shipment</h5>
      <div className={`${styles.tableContainer}`}>
        {message ? <h5>{message}</h5> : ""}
        <Table className={`${styles.table}`} responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Customer</th>
              <th>Carrier Name</th>
              <th>From City</th>
              <th>To City</th>
              <th>To Postal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {quotes ? (
              quotes.map((item: any, index) => {
                return (
                  <>
                    <tr>
                      <td>{++index}</td>
                      <td>
                        <NavLink to={''}>{item._id}</NavLink>
                      </td>
                      <td>{item.customer}</td>
                      <td>{item.serviceName}</td>
                      <td>{item.fromCity}</td>
                      <td>{item.toCity}</td>
                      <td>{item.toPostal}</td>
                      <td>
                        <select
                          name={`selectedOption${index}`}
                          value={selectedOption[index] || ""}
                          onChange={(event) =>
                            handleChange(event, index, item.orderId)
                          }
                        >
                          <option value="Delivered">Delivered</option>
                          <option value="Dispatch">Dispatch</option>
                          <option value="inProcess">In Process</option>
                          <option value="Cancel">Cancel</option>
                        </select>
                      </td>
                    </tr>
                  </>
                );
              })
            ) : (
              <span className={`spinner m-1`}>
                <Spinner animation="border" variant="dark" />
                'Loading...'
              </span>
            )}
          </tbody>
        </Table>
      </div>
      {message ? <h6 className="error">{message}</h6> : ""}
    </div>
  );
};

export default Shipment;
