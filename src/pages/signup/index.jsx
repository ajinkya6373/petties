import { useState } from "react";
import { useAuth } from "../../hooks";
import { useUserAuth } from "../../context"
import {
  Navbar,
  Footer,
  FormInput
} from "../../components";

import {
  Form,
  Btn,

} from "../signin/signin";

export default function SignupPage() {
  const { signUpUser } = useAuth();
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
       await signUpUser(
        name,
        email,
        password,
      ).then((res)=>{
        if(res.data.success){
          setSignUpError("Your Account Has been Created");
        }
  
      }).catch((err)=>{
        setSignUpError(err.response.data.message);
      })
      setLoading(false);
      return;
    }
    if(!isPasswordMatched){
      setSignUpError("Both passwords must match!");
    }
    // setSignUpError("Plase fi");
    setLoading(false);
  };




  return (
    <>
      <Navbar />     
        <Form  onSubmit={signUpHandler}>
        <h1>SignupPage</h1>
          <FormInput
            id="Name"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            type="text" 
            label ="Name"
            required
            errorMessage="Please fill the name!"
            />
   
          <FormInput
            id="Email"
            value={email}
            placeholder="you@yourcompany.com"
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            required
            errorMessage="Please fill the email!"
            type="email" />
  
          <FormInput
            id="Password"
            value={password}
            placeholder="enter your password"
            onChange={(e) => setPassword(e.target.value)}
            label ="Password"
            required
            errorMessage="Please fill the password!"
            autocomplete="new-password"
            type="password" />
   
          <FormInput
            id="Confirm password"
            value={confirmPassword}
            placeholder="Enter the same password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password" 
            required
            label="Confirm password"
            errorMessage="Please fill the password Correctly!"
            />
            <span style={{"color":"red"}}>{signUpError}</span>
          <Btn type="submit">signup</Btn>
        </Form>
 
      <Footer />
    </>
  )
}
