import React from 'react';
import s from './Loader.module.css';

const Loader = () => {
    return (
        <div className={s.loaderContainer}>
            <div className={s.loader}></div>
        </div>
    );
};

export default Loader;
