import { ChangeEvent, useState } from "react";
//css
import styles from "./packageSelectionGuest.module.scss";
//common
import Button from "../../../common/button/index";
//models
import { GuestState } from "../../../models/GuestState";
import { GUEST_PACKAGE_QUOTE_URL } from "../../../apiHelper";
import axios from "axios";

export const PackageSelectionGuest = () => {
  const [message, setMessage] = useState('')
  const [info, setInfo] = useState<GuestState>({
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
    axios.post(GUEST_PACKAGE_QUOTE_URL, {
      ...info
    }).then((res)=>{
      setMessage(res.data.message)
    }).catch((error)=>{
      setMessage('Something is Wrong!')
    })
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.container}`}>
      <div className={`${styles.content}`}>
        <label >From</label>
        <input
          type="text"
          name="fromCity"
          onChange={handleChange}
          placeholder="from"
          value={info.fromCity}
          required
        />
      </div>
      <div className={`${styles.content}`}>
        <label >To</label>
        <input
          type="text"
          name="toCity"
          onChange={handleChange}
          placeholder="to"
          value={info.toCity}
          required
        />
      </div>
      <div className={`${styles.content}`}>
        <label >Packages</label>
        <input
          type="number"
          name="package"
          onChange={handleChange}
          placeholder="package"
          value={info.package}
          required
        />
      </div>
      <div className={`${styles.content}`}>
        <label >Total Weight</label>
        <input
          type="text"
          name="totalWeight"
          onChange={handleChange}
          placeholder="weight"
          value={info.totalWeight}
          required
        />
      </div>
      <div className={`${styles.contactContainer} `}>
        <label>Contact Information</label>
        <div className={`${styles.contactContent} d-flex-r`}>
          <input
            className={`${styles.contactInput}`}
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="name"
            value={info.name}
            required
          />
          <input
            className={`${styles.contactInput}`}
            type="text"
            name="phone"
            onChange={handleChange}
            placeholder="phone"
            value={info.phone}
            required
          />
          <input
            className={`${styles.contactInput}`}
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="email"
            value={info.email}
            required
          />
        </div>
      </div>
      <Button className={styles.homeSelectionButton} value="get Quote" />
      {message? <h5 className="success">{message}</h5>:''}
    </form>
  );
};
