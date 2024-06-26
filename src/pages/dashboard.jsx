import StatsModule from "../components/stats-module";
import page from "../styles/dashboard.module.scss";
import deposit from "../assets/deposit.svg";
import money from "../assets/money.svg";
import withdrawal from "../assets/withdrawal.svg";
import EquityChart from "../components/EquityChart";
import Account_history from "../components/account-history";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function DashboardPage() {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["name"]);

    if (!cookies.JWT) {
        navigate("/login", { replace: true });
    }
    if (cookies.JWT) {
        const { data, isLoading } = useQuery({
            queryKey: ["user"],
            queryFn: async () => {
                try {
                    // Axios Fetching
                    const response = await axios({
                        method: "get",
                        url: "/userData",
                        headers: {
                            Authorization: "Bearer " + cookies.JWT,
                        },
                    });
                    // Return Data
                    return response.data;
                } catch (error) {
                    console.log(error);
                }
            },
            staleTime: 1000 * 60,
        });

        if (!isLoading) {
            return (
                <>
                    <div className={page.Content}>
                        <section className={page.Welcome}>
                            <div className={page.WelcomeText}>
                                <h1 className={page.WelcomeTexth1}>
                                    Welcome Back, <span>{data.firstName}</span>
                                </h1>
                            </div>
                            <h1 className={page.missed}>
                                Here's what you missed.
                            </h1>
                        </section>
                        <section className={page.CurrentEquity}>
                            <label>Current Equity</label>
                            <h1>{data.equity.toLocaleString()}</h1>
                        </section>
                        <hr className={page.rounded} />
                        <section className={page.Stats}>
                            <StatsModule
                                amount={data.totalDeposits.toLocaleString()}
                                label="total deposit"
                                image={deposit}
                            />
                            <StatsModule
                                amount={data.equity.toLocaleString()}
                                label="Current Equity"
                                image={money}
                            />
                            <StatsModule
                                amount={data.totalWithdrawals.toLocaleString()}
                                label="total withdrawals"
                                image={withdrawal}
                            />
                        </section>
                        <h1 className={page.EquityHeaders}>Account Equity</h1>
                        <section className={page.EquityChart}>
                            <EquityChart />
                        </section>
                        <h1 className={page.TransactionsHeaders}>
                            Transaction History
                        </h1>
                        <section className={page.History}>
                            <Account_history />
                        </section>
                        <section className={page.Footer}></section>
                    </div>
                </>
            );
        }
    }
}
