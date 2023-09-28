import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
//apiHelper
import { YOUR_VERIFICATION_ENDPOINT } from "../../../apiHelper";

const Verification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  useEffect(() => {
    const verifyToken = async () => {
      await axios
        .get(`${YOUR_VERIFICATION_ENDPOINT}${token}`)
        .then((res) => {
          if (res.status === 200) {
            navigate(`/login`);
          }
        })
        .catch((err) => {
          navigate("/home/letter-selection", {
            state: { response: err.response.data },
          });
        });
    };

    verifyToken();
  }, [token]);

  return <h3> verifying </h3>;
};

export default Verification;
