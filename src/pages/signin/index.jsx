import { useState } from "react";
import { useAuth } from "../../hooks";
export default function SigninPage() {
  const {logInUser} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler =(e)=>{
    e.preventDefault();
  const res = logInUser(email,password)
  console.log(res);
  }
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
    <h1>LoginPage</h1>
    <form style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }} onSubmit={loginHandler}>
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
      <button type="submit">LOGIN</button>
    </form>
    <div>
    </div>
  </div>
  )
}
