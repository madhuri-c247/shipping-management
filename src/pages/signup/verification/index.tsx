import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
//apiHelper
import { YOUR_VERIFICATION_ENDPOINT } from "../../../apiHelper";

const Verification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios
          .get(`${YOUR_VERIFICATION_ENDPOINT}${token}`)
          .then((res) => {
           
              navigate(`/login`,{
               
          });
            
          })
          .catch((err) => {
            navigate("/home/letter-selection", {
              state: { response: err.response.data },
            });
          });
      } catch (error) {}
    };

    verifyToken();
  }, [token]);

  return (
    <>
      <div className="spinner">
        <h5>Please Wait! Verifying Your Email..</h5>
        <Spinner animation="grow" variant="info" />
      </div>
    </>
  );
};

export default Verification;
