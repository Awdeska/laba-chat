import s from "./InputFiled.module.css"

const InputField = ({label, type, value, onChange}) => {
    return (
    <label className={s.item}>
        {label}
        <input className={s.inputField}
            type={type}
            value={value}
            onChange={onChange}
        />
    </label>
    );
}

export default InputField;