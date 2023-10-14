import axios from "axios";
import { useState, useEffect } from "react";
import { ADMIN_SHIPMENT_DETAIL_URL } from "../../../../apiHelper";
//CSS
import styles from "../../../user/accountSetting/setting.module.scss";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import ToastView from "../../../../components/Toast";
//apiHelper

const ShipmentDetail: React.FC = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(false);
  const { id } = useParams();
  const [shipment, setShipment] = useState({
    fromCity: "",
    fromPostal: "",
    payment: "",
    serviceName: "",
    status: "",
    toCity: "",
    toPostal: "",
    customer: "",
  });

  const token = sessionStorage.getItem("token");
  const fetchData = async () => {
    try {
      await axios
        .get(`${ADMIN_SHIPMENT_DETAIL_URL}${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setShipment({ ...res.data.result[0] });
        })
        .catch((err) => {
          setToast(true);
          setSuccess(false);
          setMessage(err.data.response.error);
        });
    } catch (error) {
      setToast(true);
      setSuccess(false);
      setMessage("Something is wrong!");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`${styles.container}`}>
      <form className={`${styles.content} d-flex-r `}>
        <div className={`${styles.info}`}>
          <div className="card" style={{ width: "100%", textAlign: "left" }}>
            {shipment && (
              <ul className="list-group list-group-flush text-capitalize fs-6 ">
                <li className="list-group-item text-light bg-dark fw-bold fs-5">
                  <span >Shipment</span> <span>Detail </span>
                </li>
                <li className="list-group-item">
                  <span className="text-dark">Customer:</span> <span className="text-dark">{shipment.customer}</span>
                </li>
                <li className="list-group-item">
                  <span> From City:</span> <span className="text-dark">{shipment.fromCity} </span>
                </li>
                <li className="list-group-item">
                  <span> From Postal:</span> <span className="text-dark">{shipment.fromPostal}</span>
                </li>
                <li className="list-group-item">
                  <span> Payment:</span>
                  <span className="text-dark">{shipment.payment}</span>
                </li>
                <li className="list-group-item">
                  <span>Service Name:</span> <span className="text-dark">{shipment.serviceName}</span>
                </li>
                <li className="list-group-item">
                  <span>To City:</span> <span className="text-dark">{shipment.toCity}</span>
                </li>
                <li className="list-group-item">
                  <span>To Postal:</span> <span className="text-dark">{shipment.toPostal}</span>
                </li>
              </ul>
            )}
          </div>
          <NavLink className='float-end mt-2 btn btn-dark' to={"/admin/all-shipment"}>View All Shipment</NavLink>
        </div>
      </form>
      {toast ? (
        <ToastView message={message} success={success} setToast={setToast} />
      ) : (
        ""
      )}
    </div>
  );
};
export default ShipmentDetail;
