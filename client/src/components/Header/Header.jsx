import s from "./Header.module.css"

const Header = () => {
    return (
        <div className={s.header}>
            <p className={s.chatName}/> Chat Name
        </div>
    );
}

export default Header;