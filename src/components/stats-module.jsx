import stats from "./styles/stats.module.scss";

export default function StatsModule(props) {
    return (
        <div className={stats.Wrapper}>
            <div className={stats.Icon_Section}>
                <div className={stats.Icon_Wrapper}>
                    <img src={props.image} alt={props.imagealt} />
                </div>
            </div>
            <div className={stats.Text_Wrapper}>
                <label>{props.label}</label>
                <h1>{props.amount}</h1>
            </div>
        </div>
    );
}
