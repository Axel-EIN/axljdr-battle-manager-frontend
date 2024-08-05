import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import "./template.css";

const Template = () => {
  return (
    <>
      <Header />
      <main>
        <container className="container">
            <Outlet />
        </container>
      </main>
      <Footer />
    </>
  );
};
export default Template;
