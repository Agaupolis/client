import React, { useRef } from "react";
import history from "./styles/account-history.module.scss";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export default function Account_history() {
    const [cookies, setCookie] = useCookies(["name"]);
    const { data, status, error } = useQuery({
        queryKey: ["transactions"],
        queryFn: async () => {
            const response = await axios({
                method: "get",
                url: "/transactions",
                headers: {
                    Authorization: "Bearer " + cookies.JWT,
                },
            });
            return response.data;
        },
        staleTime: 1000 * 60,
    });

    const transactions = data;

    if (status === "success") {
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
}
