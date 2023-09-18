import { ChangeEvent, useState } from "react";
//css
import styles from "./packageSelectionGuest.module.scss";
//common
import Button from "../../common/button/index";
import { emailPattern, phoneNumber } from "../../utils/constants";
export const PackageSelectionGuest = () => {
  const [info, setInfo] = useState({
    fromCity: "",
    toCity: "",
    name: "",
    phone: "",
    email: "",
    package: 0,
    totalWeight: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      info.fromCity !== "" &&
      info.toCity !== "" &&
      info.name !== "" &&
      info.phone !== "" &&
      info.email !== "" &&
      info.totalWeight !== ""
    ) {
      if (emailPattern.test(info.email)) {
        if (phoneNumber.test(info.phone)) {
          if(info.package !>=0 ){
            alert("successful"); //
          }else{
            alert("invalid quantity"); 
          }
        } else {
          alert("invalid number");
        }
      } else {
        alert("invalid email");
      }
    } else {
      alert("fields can't be empty");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.container}`}>
      <div className={`${styles.content}`}>
        <label htmlFor="">From</label>
        <input
          type="text"
          name="fromCity"
          onChange={handleChange}
          placeholder="from"
          value={info.fromCity}
        />
      </div>
      <div className={`${styles.content}`}>
        <label htmlFor="">To</label>
        <input
          type="text"
          name="toCity"
          onChange={handleChange}
          placeholder="to"
          value={info.toCity}
        />
      </div>
      <div className={`${styles.content}`}>
        <label htmlFor="">Packages</label>
        <input
          type="number"
          name="package"
          onChange={handleChange}
          placeholder="package"
          value={info.package}
        />
      </div>
      <div className={`${styles.content}`}>
        <label htmlFor="">Total Weight</label>
        <input
          type="text"
          name="totalWeight"
          onChange={handleChange}
          placeholder="weight"
          value={info.totalWeight}
        />
      </div>
      <div className={`${styles.contactContainer} `}>
        <label htmlFor="">Contact Information</label>
        <div className={`${styles.contactContent} d-flex-r`}>
          <input
            className={`${styles.contactInput}`}
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="name"
            value={info.name}
          />
          <input
            className={`${styles.contactInput}`}
            type="text"
            name="phone"
            onChange={handleChange}
            placeholder="phone"
            value={info.phone}
          />
          <input
            className={`${styles.contactInput}`}
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="email"
            value={info.email}
          />
        </div>
      </div>
      <Button className={styles.homeSelectionButton} value="get Quote" />
    </form>
  );
};
