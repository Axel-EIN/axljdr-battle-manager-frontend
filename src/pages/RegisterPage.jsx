import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URLS } from "../constants/urls.js";
import FormUser from "../components/forms/FormUser.jsx";

const RegisterPage = () => {
  const navigate = useNavigate();

  const submitPropsRegisterUser = async (formData) => {
    try {
      const newUser = {
        login: formData.get('login'),
        password: formData.get('password'),
        email: formData.get('email'),
        firstname: formData.get('firstname')
      }
      await axios.post(URLS.USER_REGISTER, newUser);
      alert("Inscription réussie ! Vous pouvez vous connecter !");
      navigate("/");
    } catch ({response}) {
      alert(response.data.error); }
  }

  return (
    <>
      <h1>INSCRIPTION</h1>
      <FormUser submitPropsFunction={submitPropsRegisterUser} register={true} />
    </>
  );
};

export default RegisterPage;
