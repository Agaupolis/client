import page from "../styles/template.module.scss";
import HeaderBar from "../components/header";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

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
        </div>
    );
}
