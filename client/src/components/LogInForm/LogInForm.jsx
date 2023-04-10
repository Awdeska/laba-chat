import React, {useContext, useState} from "react";
import InputField from "../Items/InputField";
import s from "./LoginForm.module.css";
import {Context} from "../../index";
import Button from "../Items/Button";

const LogInForm = ({ setAuth }) => {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const {store} = useContext(Context);

    const handleLogin = async (e) => {
        e.preventDefault();
        await store.login(nickname, password);
        if (store.isAuthorized) {
            setAuth(true);
        }
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
            <Button label={'Login'} onClick={handleLogin}/>
        </form>
    );
};

export default LogInForm;
