import React, { useState} from "react";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "../form/FormContainer";
import { useNotification, useAuth } from "../../hooks";
import { isValidEmail } from "../../utils/helper";


const validateUserInfo = ({ email, password }) => {
 
  
  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};



export default function SignIn() {

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  
  const {updateNotification} = useNotification()
  const {handleLogin, authInfo} = useAuth();
  const {isPending} = authInfo;

  

  const handleChange = ({target}) => {
    const {name, value} = target;
    setUserInfo({...userInfo, [name]: value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {ok, error}  = validateUserInfo(userInfo);

    if(!ok) return updateNotification('error', error, );
    handleLogin(userInfo.email, userInfo.password);
  }
 
  // useEffect(() => {
  //   if(isLoggedIn) navigate('/');
  // }, [isLoggedIn, navigate])



  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title >Sign In</Title>
          <FormInput  value={userInfo.email} onChange={handleChange} label="Email" name="email"  placeholder="your@email.com" />
          <FormInput value={userInfo.password} onChange={handleChange}  label="Password" name="password" type="password"  placeholder="********" />
          <Submit value="Sign In" busy={isPending}></Submit>
          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
            <CustomLink to="/auth/SignUp">Sign Up</CustomLink>
            
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}