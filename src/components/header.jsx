import Header from "./styles/HeaderBar.module.scss";
import Menu from "../assets/Menu.svg";
import pfp from "../assets/pfp.svg";
import profilePic from "../assets/pfp.webp";
import bell from "../assets/bell.svg";
import close from "../assets/X.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles/buttonStyle.scss";
import SideMenu from "./styles/menu.module.scss";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export default function HeaderBar(props) {
    const navigate = useNavigate();
    const [sidebar, setSidebar] = useState(false);
    const [cookies, setCookie] = useCookies(["name"]);

    function OpenMenu() {
        setSidebar(!sidebar);
    }

    const { data, status, error } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const response = await axios({
                method: "get",
                url: "/userData",
                headers: {
                    Authorization: "Bearer " + cookies.JWT,
                },
            });
            return response.data;
        },
        staleTime: 1000 * 60,
    });

    if (status === "pending") {
        return <></>;
    }
    if (status === "success") {
        return (
            <>
                <div className={Header.Wrapper}>
                    <div className={Header.LeftElements}>
                        <img src={Menu} onClick={OpenMenu} />
                    </div>
                    <div className="NavButtons">
                        <ul>
                            <li
                                onClick={() => {
                                    navigate("/deposit", { replace: true });
                                }}
                                id="depositButton"
                            >
                                Deposit
                            </li>
                            <li
                                onClick={() => {
                                    navigate("/", { replace: true });
                                }}
                                id="dashboardButton"
                            >
                                Dashboard
                            </li>
                            <li
                                onClick={() => {
                                    navigate("/withdrawal", {
                                        replace: true,
                                    });
                                }}
                                id="withdrawalButton"
                            >
                                Withdrawal
                            </li>
                        </ul>
                    </div>
                    <div className={Header.RightElements}>
                        <img src={pfp} />
                        <img src={bell} />
                    </div>
                </div>
                <div
                    className={
                        sidebar ? "background-opened" : "background-closed"
                    }
                >
                    <div className={sidebar ? "nav-opened" : "nav-closed"}>
                        <div className={SideMenu.Wrapper}>
                            <img
                                className={SideMenu.Close}
                                src={close}
                                onClick={OpenMenu}
                            />
                            <img className={SideMenu.pfp} src={profilePic} />
                            <label className={SideMenu.Name}>
                                {data.firstName} {data.lastName}
                            </label>
                            <label className={SideMenu.role}>
                                {data.accountType} Account
                            </label>
                            <div className={SideMenu.Nav1}>
                                <label
                                    id="NavDashboard"
                                    onClick={() => {
                                        navigate("/", {
                                            replace: true,
                                        });
                                    }}
                                >
                                    Dashboard
                                </label>
                                <label
                                    id="NavResearch"
                                    onClick={() => {
                                        navigate("/Research", {
                                            replace: true,
                                        });
                                    }}
                                >
                                    Research
                                </label>
                                <label
                                    id="NavDeposit"
                                    onClick={() => {
                                        navigate("/Deposit", {
                                            replace: true,
                                        });
                                    }}
                                >
                                    Deposit
                                </label>
                                <label
                                    id="NavWithdrawal"
                                    onClick={() => {
                                        navigate("/Withdrawal", {
                                            replace: true,
                                        });
                                    }}
                                >
                                    Withdrawal
                                </label>
                            </div>
                            <div className={SideMenu.Nav2}>
                                <label>Contact</label>
                                <label>Settings</label>
                            </div>
                            <label>#</label>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
