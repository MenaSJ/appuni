import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Popup from "../Popup/Popup";

const Layout = () => {
    const [showPopup, setShowPopup] = useState(false);
    return (
        <>
            <div className="App">
                <ScrollToTop />
                {showPopup && <Popup setShowPopup={setShowPopup} />}
                <Navbar setShowPopup={setShowPopup} />
                <Outlet />
            </div>
            <Footer />
        </>
    )
}
const ScrollToTop = () => {
    // Extracts pathname property(key) from an object
    const { pathname } = useLocation();
    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
}
export default Layout