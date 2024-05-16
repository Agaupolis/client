import page from "../styles/template.module.scss";
import HeaderBar from "../components/header";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // remove for production
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Template({ children }) {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["name"]);
    const [JWTbool, setJWT] = useState(false);

    useEffect(() => {
        if (!cookies.JWT) {
            navigate("/login", { replace: true });
            setJWT(false);
        } else {
            // Save the JWT token in a cookie so it persists across sessions
            setCookie("JWT", cookies.JWT);
            setJWT(true);
        }
    }, [cookies.JWT]);
    return (
        <div className={page.Background}>
            <HeaderBar />
            <div className={page.Content}>{children}</div>
            <ReactQueryDevtools /> {/* remove for prduction */}
            <Toaster
                position="bottom-right"
                toastOptions={{ duration: 3000 }}
            />
        </div>
    );
}
