import React from 'react';
import s from "../../pages/Users/Users.module.css";
import preloader from "../../assets/preloaders/48x48.gif";

export default () => (
    <div className={s.preloader}>
        <img src={preloader} alt="Piska"/>
    </div>
)


