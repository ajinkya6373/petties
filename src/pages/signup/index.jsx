import { useState } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../hooks";
import {useUserAuth} from "../../context"
export default function SignupPage() {
  const {userProfile} = useUserAuth();
  const location = useLocation();
  const {signUpUser} = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [loading, setLoading] = useState(false);

  const isPasswordMatched =
    confirmPassword !== "" && confirmPassword === password;

  const checkUserInput = name !== "" && email !== "" && isPasswordMatched;

  const isPasswordValid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(
    password
  );


  const signUpHandler = async (e) => {
    setSignUpError("");
    setLoading(true);
    e.preventDefault();
    if (checkUserInput) {
      if (!isPasswordValid) {
        setSignUpError("PASSWORD_CHECK");
        setLoading(false);
        return;
      }
      const res = await signUpUser(
        name,
        email,
        password,
        // path,
        // addTo,
        // productId
      );
      !res && setSignUpError("SIGNUP_ERROR");
      setLoading(false);
      return;
    }
    setSignUpError("FIELDS_EMPTY");
    setLoading(false);
  };




  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <h1>SignupPage</h1>
      <form style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }} onSubmit={signUpHandler}>
        <label htmlFor="Name"> Name</label>
        <input
          id="Name"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          type="text" />
        <label htmlFor="Email"> Email</label>
        <input
          id="Email"
          value={email}
          placeholder="you@yourcompany.com"
          onChange={(e) => setEmail(e.target.value)}
          type="email" />
        <label htmlFor="Password"> Password</label>
        <input
          id="Password"
          value={password}
          placeholder="enter your password"
          onChange={(e) => setPassword(e.target.value)}
          type="password" />
        <label htmlFor="Confirm password"> Confirm password</label>
        <input
          id="Confirm password"
          value={confirmPassword}
          placeholder="Enter the same password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password" />
        <button type="submit">signup</button>
      </form>
      <div>
      </div>
    </div>
  )
}
