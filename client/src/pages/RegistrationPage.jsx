import Header from "../components/Header/Header";
import LogInForm from "../components/LogInForm/LogInForm";
import s from "./RegistrationPage.module.css";

const RegistrationPage = () => {
    return (
        <div className={s.body}>
            <Header/>
            <LogInForm/>
        </div>
    );
}

export default RegistrationPage;