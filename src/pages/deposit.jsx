import Login from "../styles/login.module.scss";
import deposit from "../assets/deposit.svg";
import Input1 from "../components/Input1";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function DepositPage() {
    const [cookies, setCookie] = useCookies(["name"]);
    const [method, setMethod] = useState("");
    const [amount, setAmount] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        if (!method) {
            toast.error("please select a method");
            return;
        }
        if (!amount) {
            toast.error("please state an amount (USD)");
            return;
        }
        try {
            const data = await axios.post(
                "/transactions",
                {
                    amount: amount,
                    transmethod: method,
                    type: "deposit",
                },
                {
                    headers: {
                        Authorization: "Bearer " + cookies.JWT,
                    },
                }
            );
            if (data.status === 200) {
                toast.success("Transaction Submitted");
            }
        } catch (error) {
            console.log(error);
            toast.error("unknown error");
        }
    }
    return (
        <div className={Login.Content}>
            <div className={Login.Icon_Wrapper}>
                <img src={deposit} />
            </div>
            <h1 className={Login.title}>Deposit</h1>
            <form className={Login.Form}>
                <div className={Login.Input}>
                    <select
                        className={Login.Select}
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                    >
                        <option value="">Method</option>
                        <option value="ethereum">Ethereum</option>
                        <option value="PayPal">Paypal</option>
                        <option value="Wire-Transfer">Wire-Transfer</option>
                    </select>
                </div>
                <div className={Login.Input}>
                    <Input1
                        name="Amount - USD"
                        type="number"
                        value={amount}
                        change={(e) => setAmount(e.target.value)}
                    />
                </div>
                <button
                    className={Login.Button}
                    type="submit"
                    onClick={handleSubmit}
                >
                    <p>send</p>
                </button>
            </form>
        </div>
    );
}
