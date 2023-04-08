import s from "./Button.module.css"

const Button = ({label, onClick}) => {
    return (
        <button type='button' onClick={onClick} className={s.btn}>{label}</button>
    );
}

export default Button;