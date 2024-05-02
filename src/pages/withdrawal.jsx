import Login from "../styles/login.module.scss";
import withdrawal from "../assets/withdrawal.svg";
import Input1 from "../components/Input1";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";

export default function WithdrawalPage() {
    const [cookies, setCookie] = useCookies(["name"]);
    const [method, setMethod] = useState("");
    const [amount, setAmount] = useState("");

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
        if (amount > data.equity) {
            toast.error("insufficent funds");
            return;
        }
        try {
            const data = await axios.post(
                "/transactions",
                {
                    amount: amount,
                    transmethod: method,
                    type: "withdrawal",
                },
                {
                    headers: {
                        Authorization: "Bearer " + cookies.JWT,
                    },
                }
            );
            if (data.status === 200) {
                toast.success("Transaction Submitted");
                return;
            }
        } catch (error) {
            console.log(error);
            toast.error("unknown error");
        }
    }
    if (status === "success") {
        const equity = data.equity.toLocaleString();
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
                    {/* Password Input */}
                    <div className={Login.Input}>
                        <Input1
                            name="Amount"
                            type="number"
                            value={amount}
                            change={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <p className={Login.Balance}>
                        Available Balance - ${equity}
                    </p>
                    {/* Submit Button */}
                    <button
                        className={Login.Button}
                        type="submit"
                        onClick={handleSubmit}
                    >
                        <p>send</p>
                    </button>
                    {/* End of Elements */}
                </form>
            </div>
        );
    }
}
