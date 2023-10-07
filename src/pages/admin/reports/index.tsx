import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
//apiHelper
import { ADMIN_REPORT, ADMIN_SAVED_QUOTES_URL, SAVED_QUOTE_URL } from "../../../apiHelper";
//css
import styles from "../../user/saved-quote/saved-quote.module.scss";
//common
import Button from "../../../common/button";
import { Label } from "@mui/icons-material";

const Reports = () => {
  const token = sessionStorage.getItem("token");
  const [report, setReport] = useState({
    totalUser:'',
    totalShipment:''
  });
  const [message, setMessage] = useState("");
  useEffect(() => {
    axios.get(ADMIN_REPORT,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((res)=>{
      console.log(res, 'res')
      setReport({
        ...res.data.report
      })
    }).catch((error)=>{

    })
     
  }, []);

  return (
    <div className={`${styles.container} p-2`}>
      <h5>Reports</h5>
      <div className={`${styles.tableContainer}`}>
        {message ? <h5>{message}</h5> : ""}
        {report && (
        <div>
          <p>Total Users: {report.totalUser}</p>
          <p>Total Shipments: {report.totalShipment}</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default Reports;

