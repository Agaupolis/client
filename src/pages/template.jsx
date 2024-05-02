import page from "../styles/template.module.scss";
import HeaderBar from "../components/header";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // remove for production
import { Toaster } from "react-hot-toast";

export default function Template({ children }) {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["name"]);

    useEffect(() => {
        if (!cookies.JWT) {
            navigate("/login", { replace: true });
        }
    }, []);
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
