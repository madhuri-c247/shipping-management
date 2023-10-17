import { useEffect, useState } from "react";
import axios from "axios";
//apiHelper
import { ADMIN_REPORT } from "../../../apiHelper";
//css
import styles from "../../user/accountSetting/setting.module.scss";
//components
import ToastView from "../../../components/Toast";

const Reports = () => {
  const token = sessionStorage.getItem("token");
  const [report, setReport] = useState({
    totalUser: "",
    totalShipment: "",
    totalTransection: "",
    totalAmount: "",
  });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(false);

  const fetchData = async () => {
    try {
      await axios
        .get(ADMIN_REPORT, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setReport({
            ...res.data.report,
          });
        })
        .catch((error) => {
          setToast(true);
          setSuccess(false);
          setMessage("");
        });
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`${styles.container} p-2`}>
      <form className={`${styles.content} d-flex-r `}>
        <div className={`${styles.info}`}>
          <div className="card" style={{ width: "50%", textAlign: "left" }}>
            {report && (
              <ul className="list-group list-group-flush text-capitalize fs-6 ">
                <li className="list-group-item text-light bg-dark fw-bold fs-5">
                  <span>Reports</span> <span>Total </span>
                </li>
                <li className="list-group-item">
                  <span> User:</span> <span>{report.totalUser} </span>
                </li>
                <li className="list-group-item">
                  <span> Shipments:</span> <span>{report.totalShipment}</span>
                </li>
                <li className="list-group-item">
                  <span> Transactions:</span>
                  <span>{report.totalTransection}</span>
                </li>
                <li className="list-group-item">
                  <span>Amount:</span> <span>{report.totalAmount}</span>
                </li>
              </ul>
            )}
          </div>
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

export default Reports;
