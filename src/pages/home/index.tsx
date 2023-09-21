import { NavLink, Outlet } from "react-router-dom";
//css
import styles from "./home.module.scss";
//assets
import background from "../../assets/homeBackground.jpg";
//react-icons
import { BsEnvelope } from "react-icons/bs";
import { LuPackage2 } from "react-icons/lu";
//nav-layout
import Layout from "../../layout/NavLayout";

const Home = () => {
  return (
    <Layout>
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
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : "")}
                to={"/home/letter-selection"}
              >
                <BsEnvelope className={`${styles.icon}`} />
                Letter
              </NavLink>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : "")}
                to={"/home/package-selection"}
              >
                <LuPackage2 className={`${styles.icon}`} />
                Package
              </NavLink>
            </ul>
            <Outlet />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
