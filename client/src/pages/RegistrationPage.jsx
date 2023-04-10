import Header from "../components/Header/Header";
import LogInForm from "../components/LogInForm/LogInForm";
import s from "./RegistrationPage.module.css";

const RegistrationPage = ({setAuth}) => {
    return (
        <div className={s.body}>
            <Header/>
            <LogInForm setAuth={setAuth}/>
        </div>
    );
}

export default RegistrationPage;