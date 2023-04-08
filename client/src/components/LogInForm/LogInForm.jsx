import React, {useContext, useState} from "react";
import InputField from "../Items/InputField";
import s from "./LoginForm.module.css"
import {Context} from "../../index";
import Button from "../Items/Button";
import {useNavigate} from "react-router-dom";


const LogInForm = () => {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [isUserRegistered, setIsUserRegistered] = useState(false);
    const {store} = useContext(Context);
    const navigate = useNavigate();

    const handleCheckUser = async () => {
        if (await store.login(nickname, password)) {
            setIsUserRegistered(true);
        }
    };

    if (isUserRegistered) {
        navigate('/chat');
    }

    return (
        <form className={s.form}>
            <InputField
                label="Login"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
            />
            <InputField
                type="Password"
                label="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Button label={'Registration'} onClick={() => store.registration(nickname, password)}/>
            <Button label={'Login'} onClick={() => handleCheckUser()}/>
        </form>
    );
};

export default LogInForm;