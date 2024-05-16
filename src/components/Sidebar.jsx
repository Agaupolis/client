import SideMenu from "./styles/menu.module.scss";
import close from "../assets/X.svg";
import profilePic from "../assets/pfp.webp";
import "./styles/buttonStyle.scss";

export default function Sidebar(props) {
    return (
        <div
            className={
                props.sidebar ? "background-opened" : "background-closed"
            }
        >
            <div className={props.sidebar ? "nav-opened" : "nav-closed"}>
                <div className={SideMenu.Wrapper}>
                    <img className={SideMenu.Close} src={close} />
                    <img className={SideMenu.pfp} src={profilePic} />
                    <label className={SideMenu.Name}>
                        {props.data.firstName} {props.data.lastName}
                    </label>
                    <label className={SideMenu.role}>
                        {props.data.accountType} Account
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
    );
}
