import { NavLink, Outlet } from 'react-router-dom';
//css
import styles from  './navbar.module.scss';

const Navbar = () => {
    return (
      <>
      <nav className={`${styles.container} d-flex-r`}>
          <h1 className={`${styles.heading}`}>ShipNow</h1>
          <ul className={`${styles.menuContainer} d-flex-r`}>
              <NavLink to={'/home/letterSelection'}>HOME</NavLink>
              <NavLink to={'/signup'}>SignUp</NavLink>
              <NavLink to={'/login'}>Login</NavLink>
              <NavLink to={'/home/contact'}>Contact US</NavLink>
          </ul>
      </nav>
      <Outlet/>
      </>
    )
  }
  
  export default Navbar