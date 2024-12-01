import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const Template = () => {
  return (
    <>
      <Header />
      <main className="container">
          <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default Template;
