import { ChangeEvent, useState } from "react";
//css
import styles from "./letterSelectionGuest.module.scss";
//common
import Button from "../../../common/button/index";
//models
import { GuestState } from "../../../models/GuestState";
import axios from "axios";
import { GUEST_PACKAGE_QUOTE_URL } from "../../../apiHelper";

export const LetterSelectionGuest = () => {
  const [message, setMessage] = useState('')
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
        <label>From City <span className="required-asterisk" aria-label="required">*</span></label>
        <input
          type="text"
          name="fromCity"
          onChange={handleChange}
          placeholder="From City"
          value={info.fromCity}
          required
        />
      </div>
      <div className={`${styles.content}`}>
        <label> To City <span className="required-asterisk" aria-label="required">*</span></label>
        <input
          type="text"
          name="toCity"
          onChange={handleChange}
          placeholder="To City"
          value={info.toCity}
          required
        />
      </div>
      <div className={`${styles.contactContainer} `}>
        <label >Contact Information <span className="required-asterisk" aria-label="required">*</span></label>
        <div className={`${styles.contactContent} d-flex-r`}>
          <input
            className={`${styles.contactInput}`}
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Name"
            value={info.name}
            required
          />
          <input
            className={`${styles.contactInput}`}
            type="text"
            name="phone"
            onChange={handleChange}
            placeholder="Phone Number"
            value={info.phone}
            required
          />
          <input
            className={`${styles.contactInput}`}
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="Email"
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
