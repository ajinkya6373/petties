import { useState } from "react";
import { useAuth } from "../../hooks";
import {
  Navbar,
  Footer,
  Toast,
  FormInput 
} from "../../components";

import {
  WrapperLogin,
  Form,
  Btn,
  RedirectSignup,
  Message
} from "./signin";
import { Link,useLocation} from "react-router-dom";

export default function SigninPage() {
  
  const location = useLocation();
  const path = location?.state?.state?.from;
  const message = location?.state?.state?.message;
  const addTo = location?.state?.state?.addTo;
  const productId = location?.state?.state?.productId;
  const { logInUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usingTestCredentials, setUsingTestCredentials] = useState(false);
  const loginHandler = (e) => {
    e.preventDefault();
    if(usingTestCredentials){
      console.log("hello");
      setEmail("ajinkya@gmail.com");
      setPassword("pass123");
      logInUser("ajinkya@gmail.com", "pass123",path,addTo,productId);
      return
    }
    logInUser(email,password,path,addTo,productId);
  }

  return (
    <>
      <Navbar />
      <Toast/>
      <WrapperLogin >
        <Form onSubmit={loginHandler}>
          <h1>LOGIN</h1>
          <Message>{message&&message}</Message>
          <FormInput
            id="Email"
            value={email}
            placeholder=" Enter your email here "
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            // required={`${usingTestCredentials===true ? false :true}`}
            autoComplete="true"
        
            />
          <FormInput
            id="Password"
            value={password}
            autoComplete="true"
            placeholder="enter your password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            // required={`${usingTestCredentials===true ? false :true}`}

            />
          <Btn test  onClick={()=>setUsingTestCredentials(true)}>Login With Test Crendential</Btn>
          <Btn type="submit">LOGIN</Btn>
          <RedirectSignup>Not a user yet?
            <Link to="/signup">Create your account </Link>
          </RedirectSignup>
        </Form>

      </WrapperLogin>
      <Footer />
    </>
  )
}
