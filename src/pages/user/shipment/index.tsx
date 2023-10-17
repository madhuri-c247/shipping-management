import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";
//apiHelper
import { STATUS_URL, apiUrl } from "../../../apiHelper";
//css
import styles from "./shipment.module.scss";
//components
import ToastView from "../../../components/Toast";
import Pagination from "../../../components/pagination";

const Shipment = () => {
  const token = sessionStorage.getItem("token");
  const [quotes, setQuotes] = useState([]);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = async (page: number) => {
    try {
      await axios
        .get(`${apiUrl}/quote/myShipping?limit=${limit}&page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTotalCount(res.data.result.totalPages);
          setQuotes(res.data.result.docs);
        })
        .catch((error) => {
          setToast(false);
          setSuccess(false);
          setMessage(error);
        });
    } catch (error) {}
  };
  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: number,
    id: any
  ) => {
    const updatedOptions = [...selectedOption];
    updatedOptions[index] = event.target.value;
    setSelectedOption(updatedOptions);
    const status = event.target.value;
    try {
      await axios
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
          setSuccess(true);
          setToast(true);
          setMessage(res.data.result.successful);
        })
        .catch((error) => {
          setSuccess(false);
          setToast(true);
          setMessage(error.response.data.errors[0].message);
        });
    } catch (error) {
      setSuccess(false);
      setToast(true);
      setMessage("Something is Wrong!");
    }
  };

  return (
    <div className={`${styles.container} p-2`}>
      <h5>My Shipment</h5>
      <div className={`${styles.tableContainer}`}>
        <Table className={`${styles.table}`} responsive>
          <thead>
            <tr>
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
                      <td>
                        <NavLink to={``}>{item._id}</NavLink>
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
              <span className={`spinner m-1`}>No Data Found</span>
            )}
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
