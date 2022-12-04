import React from "react";
import { NavLink } from "react-router-dom";
import styles from './Header.module.css';

const Header = (props) => {

    return (
        <header className={styles.header}>
            <div className={styles.header_logo}>
                <span>LOGO</span>
            </div>
           
            <img src='https://avatars.mds.yandex.net/i?id=7be0423dd27fe102452feee9fabc3191-5876477-images-thumbs&n=13&exp=1' alt='avatar' />

            <div className={styles.login_block}>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    )
}

export default Header