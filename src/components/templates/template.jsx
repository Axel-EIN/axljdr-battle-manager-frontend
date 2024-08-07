import { Outlet } from "react-router-dom";
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Template = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
export default Template;