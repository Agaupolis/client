import React, { useRef } from "react";
import history from "./styles/account-history.module.scss";

export default function Account_history() {
    const transactions = [
        {
            _id: "66295c3e913e0c0cea6bae8f",
            accountID: "66295be2913e0c0cea6bae84",
            Type: "withdrawal",
            Amount: 5000,
            Method: "ethereum",
            Confirmed: false,
            __v: 0,
        },
        {
            _id: "66295c29913e0c0cea6bae89",
            accountID: "66295be2913e0c0cea6bae84",
            Type: "deposit",
            Amount: 5000,
            Method: "wire-transfer",
            Confirmed: false,
            __v: 0,
        },
    ];

    return (
        <div className={history.content}>
            {transactions.map((transactions) => {
                return (
                    <div className={history.item} key={transactions._id}>
                        <label className={history.type}>
                            {transactions.Type}
                        </label>
                        <label className={history.method}>
                            {transactions.Method}
                        </label>
                        <div className={history.amountWrapper}>
                            <label>
                                {transactions.Amount.toLocaleString()}$
                            </label>
                        </div>
                        <div className={history.dateWrapper}>
                            <label>yesterday</label>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
