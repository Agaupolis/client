import input from "./styles/input1.module.scss";

export default function Input2(props) {
    return (
        <div className={input.Wrapper}>
            <input
                type={props.type}
                placeholder={props.name}
                name={props.name}
                id={props.name}
                value={props.value}
                onChange={props.change}
                list={props.list}
            />
        </div>
    );
}
