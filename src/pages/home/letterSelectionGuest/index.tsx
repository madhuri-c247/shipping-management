import { ChangeEvent, useState } from "react";
//css
import styles from "./letterSelectionGuest.module.scss";
//common
import Button from "../../../common/button/index";
//models
import { GuestState } from "../../../models/GuestState";

export const LetterSelectionGuest = () => {
  const [info, setInfo] = useState<GuestState>({
    fromCity: "",
    toCity: "",
    name: "",
    phone: "",
    email: "",
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
          required
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
          required
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
    </form>
  );
};
