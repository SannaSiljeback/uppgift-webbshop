import { useState } from "react";
import { BiUserCheck } from "react-icons/bi";
import "../styles/loginRegister.css";

export const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [registerMessage, setRegisterMessage] = useState<string>("");

  const handleRegister = async () => {
    const response = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    console.log(data);

    if (response.status === 201) {
      setRegisterMessage("You're now registered!");
      setEmail("");
      setPassword("");
    } else {
      setRegisterMessage("User already exists");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <>
    <div className="formContainerRegister">
      <input
        type="text"
        value={email}
        onChange={handleChange}
        placeholder="Email"
        name="email"
      />
      <input
        type="password"
        value={password}
        onChange={handleChange}
        placeholder="Password"
        name="password"
      />
      <div onClick={handleRegister} className="button">
        <BiUserCheck className="icon"/>
      </div>
      {registerMessage && <p>{registerMessage}</p>}
      </div>
    </>
  );
};
