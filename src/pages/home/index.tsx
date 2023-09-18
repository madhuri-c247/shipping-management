import { NavLink, Outlet } from "react-router-dom";
//css
import styles from "./home.module.scss";
//assets
import background from "../../assets/homeBackground.jpg";
//react-icons
import { BsEnvelope } from "react-icons/bs";
import { LuPackage2 } from "react-icons/lu";

const Home = () => {
  return (
    <div
      className={`${styles.container}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className={`${styles.overlay}`}></div>
      <div className={`${styles.shipmentContainer}`}>
        <div className={`${styles.heading}`}>
          <h1>Book a shipment instantly</h1>
          <pre>
            The fast and easy shipping solution for your business. Get your
            quote in seconds today
          </pre>
        </div>

        <div className={`${styles.shipmentForm}`}>
          <ul>
            <NavLink to={"/home/letterSelection"}>
              <BsEnvelope className={`${styles.icon}`} />
              Letter
            </NavLink>
            <NavLink to={"/home/packageSelection"}>
              <LuPackage2 className={`${styles.icon}`} />
              Package
            </NavLink>
          </ul>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
