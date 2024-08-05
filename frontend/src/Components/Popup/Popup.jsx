import { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

export default function Popup({ setShowPopup }) {
    const [showLogin, setShowLogin] = useState(true);
    return (
        <>
            {showLogin 
                ? <LoginForm setShowLogin={setShowLogin} setShowPopup={setShowPopup} />
                : <RegisterForm setShowLogin={setShowLogin} setShowPopup={setShowPopup} />}
        </>
    )
}