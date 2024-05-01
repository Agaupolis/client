import Login from "../styles/login.module.scss";
import withdrawal from "../assets/withdrawal.svg";
import Input1 from "../components/Input1";

export default function WithdrawalPage() {
    return (
        <div className={Login.Content}>
            {/* Key Icon */}
            <div className={Login.Icon_Wrapper}>
                <img src={withdrawal} />
            </div>
            {/* Authenticate Text */}
            <h1 className={Login.title}>Withdrawal</h1>
            <form className={Login.Form}>
                {/* Username Input */}
                <div className={Login.Input}>
                    <Input1 name="Method" type="text" />
                </div>
                {/* Password Input */}
                <div className={Login.Input}>
                    <Input1 name="Amount" type="number" />
                </div>
                {/* Submit Button */}
                <button className={Login.Button} type="submit">
                    <p>send</p>
                </button>
                {/* End of Elements */}
            </form>
        </div>
    );
}
