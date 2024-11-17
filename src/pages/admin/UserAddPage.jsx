import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URLS } from "../../constants/urls.js";
import FormUser from "../../components/forms/FormUser.jsx";

const UserAddPage = () => {
  const navigate = useNavigate();

  const submitPropsAddUser = async (formData) => {
    try {
      await axios.post( URLS.USER_CREATE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });

      alert("L'utilisateur a bien été crée !");
      navigate("/admin");
    } catch ({response}) {
      alert(response.data.error); }
  };

  return (
    <>
      <h1>Ajouter un utilisateur</h1>
      <FormUser submitPropsFunction={submitPropsAddUser} />
    </>
  );
};

export default UserAddPage;
