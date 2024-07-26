import { Outlet } from "react-router-dom";
import Header from './header.jsx';
import Footer from './footer.jsx';

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