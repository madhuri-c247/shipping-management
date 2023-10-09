import axios from "axios";
import { useState, useEffect } from "react";
import { ADMIN_SHIPMENT_DETAIL_URL } from "../../../../apiHelper";
//CSS
import styles from "../../../user/accountSetting/setting.module.scss";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
//apiHelper

const ShipmentDetail: React.FC = () => {
  const [message, setMessage] = useState("");
  const [Successful, setSuccessful] = useState(false);
  const location = useLocation();
  const { id } = useParams();
  const [shipment, setShipment] = useState({
    fromCity: "",
    fromPostal: "",
    payment: "",
    serviceName: "",
    status: "",
    toCity: "",
    toPostal: "",
  });

  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get(`${ADMIN_SHIPMENT_DETAIL_URL}${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setShipment({ ...res.data[0] });
        })
        .catch((err) => {
          setMessage(err.data.response.error);
        });
    } catch (error) {
      setMessage("Something is wrong!");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <div className={`${styles.container}`}>
      <form className={`${styles.content} d-flex-r `} onSubmit={handleSubmit}>
        <div className={`${styles.info}`}>
          <h4>Update User</h4>
          {shipment && (
            <div>
              <p>From City: {shipment.fromCity}</p>
              <p>From Postal: {shipment.fromPostal}</p>
              <p>Payment: {shipment.payment}</p>
              <p>Service Name: {shipment.serviceName}</p>
              <p>Status: {shipment.status}</p>
              <p>To Postal: {shipment.toCity}</p>
              <p>To Postal: {shipment.toPostal}</p>
            </div>
          )}

          {Successful ? (
            <h6 className={`${styles.message} success m-1`}>{message}</h6>
          ) : (
            <h6 className={`${styles.message} error m-1`}>{message}</h6>
          )}
          <NavLink to={"/admin/all-shipment"}>View All Shipment</NavLink>
        </div>
      </form>
    </div>
  );
};
export default ShipmentDetail;
