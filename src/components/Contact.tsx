import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./Contact.module.css";

export const Contact: React.FC = () => {
  const [email, setEmail] = useState("");
  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email);
  };
  return (
    <div className={styles.contentContainer}>
      <form
        method="post"
        className={styles.formContainer}
        onSubmit={submitHandler}
      >
        <div className={styles.formItem}>
          <label className={styles.formLabel} htmlFor="email">
            email
          </label>
          <input
            className={styles.formInput}
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={inputHandler}
            required
          />
        </div>
        <div className={styles.formItem}>
          <button className={styles.formPrimaryButton} type="submit">
            send
          </button>
        </div>
      </form>
    </div>
  );
};
