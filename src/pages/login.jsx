import key from "../assets/Key.svg";
import Login from "../styles/login.module.scss";
import Input1 from "../components/Input1";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["name"]);
    // Get the user's input
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Handle Submit Function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/login", {
                email,
                password,
            });

            if (!data) {
                console.error("No data returned from login");
                return;
            }

            if (data.error) {
                toast.error(data.error);
            }
            if (data.status == "Logged In" && data.token) {
                toast.success(data.status);

                setCookie("JWT", data.token);
                navigate("/", { replace: true });
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Render
    return (
        <div className={Login.Content}>
            <div className={Login.Icon_Wrapper}>
                <img src={key} />
            </div>

            <h1 className={Login.title}>Authenticate</h1>
            <form className={Login.Form} onSubmit={handleSubmit}>
                <div className={Login.Input}>
                    <Input1
                        name="Email"
                        type="text"
                        value={email}
                        change={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={Login.Input}>
                    <Input1
                        name="Password"
                        type="password"
                        value={password}
                        change={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className={Login.Button} type="submit" style={{}}>
                    <p>Submit</p>
                </button>
            </form>
        </div>
    );
}
