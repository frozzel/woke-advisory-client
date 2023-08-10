import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "../form/FormContainer";
import { createUser } from "../../api/auth";
import { useNotification, useAuth } from "../../hooks";
import { isValidEmail } from "../../utils/helper";
 


const validateUserInfo = ({ name, email, password }) => {
 
  const isValidName = /^[a-z A-Z]+$/;

  if (!name.trim()) return { ok: false, error: "Name is missing!" };
  if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" };

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };


  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};
export default function SignUp() {

  const { authInfo} = useAuth();
  const { isLoggedIn} = authInfo;

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });

  const navigate = useNavigate();

  const {updateNotification} = useNotification()

  const handleChange = ({target}) => {
    const {name, value} = target;
    setUserInfo({...userInfo, [name]: value});
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {ok, error}  = validateUserInfo(userInfo);

    if(!ok) return updateNotification('error', error, );

    const response = await createUser(userInfo);
    if(response.error) return alert(response.error);
    navigate("/auth/verification", {
      state: {user: response.user}, 
      replace: true
    });

  }
  const { name, email, password, username } = userInfo;

  useEffect(() => {
    if(isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate])

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title >Sign Up</Title>
          <FormInput value={name} onChange={handleChange} label="Name" name="name"  placeholder="Your Name" />
          <FormInput value={email} onChange={handleChange} label="Email" name="email"  placeholder="your@email.com" />
          <FormInput value={username} onChange={handleChange} label="Username" name="username"  placeholder="Unique Username" />
          <FormInput value={password} onChange={handleChange} type='password' label="Password" name="password"  placeholder="********" />
          <Submit value="Sign Up"></Submit>
          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
            <CustomLink to="/auth/SignIn">Sign In</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}