import React from "react";
import { NavLink } from "react-router-dom";
import s from './Navbar.module.css'

const linkClassName  = NavData => NavData.isActive ? s.active : s.item  

export default function Navbar() {
    return (
        <nav className={s.nav}>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to='/profile' className={linkClassName}>Profile</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to='/users' className={linkClassName}>Users</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/dialogs' className={linkClassName}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/news' className={linkClassName}>News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/music' className={linkClassName}>Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/settings' className={linkClassName}>Settings</NavLink>
            </div>
        </nav>
    )
}