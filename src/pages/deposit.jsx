import Login from "../styles/login.module.scss";
import deposit from "../assets/deposit.svg";
import Input1 from "../components/Input1";

export default function DepositPage() {
    return (
        <div className={Login.Content}>
            <div className={Login.Icon_Wrapper}>
                <img src={deposit} />
            </div>
            <h1 className={Login.title}>Deposit</h1>
            <form className={Login.Form}>
                <div className={Login.Input}>
                    <Input1 name="Method" type="text" />
                </div>
                <div className={Login.Input}>
                    <Input1 name="Amount" type="number" />
                </div>
                <button className={Login.Button} type="submit">
                    <p>send</p>
                </button>
            </form>
        </div>
    );
}
