import { useState, ChangeEvent, FormEvent, useCallback } from "react";
import styles from "./Contact.module.css";

type ApiProps = {
  email: string;
};

type ApiResult = {
  message: string;
};

const fetchContactApi = async ({
  email,
}: ApiProps): Promise<ApiResult | null> => {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error();
    }
    const result = await res.json();
    return result;
  } catch (error) {
    return null;
  }
};

export const Contact: React.FC = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<"init" | "error" | "success">("init");
  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const submitHandler = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const result = await fetchContactApi({ email });
      if (result) {
        setResult("success");
        setEmail("");
      } else {
        setResult("error");
      }
    },
    [email]
  );

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
          />
        </div>
        <div className={styles.formItem}>
          <button className={styles.formPrimaryButton} type="submit">
            send
          </button>
        </div>
        <div className={styles.formItem}>
          {result === "success" && (
            <div className={styles.successMessage}>success to contact</div>
          )}
          {result === "error" && (
            <div className={styles.errorMessage}>error, please resend</div>
          )}
        </div>
      </form>
    </div>
  );
};
