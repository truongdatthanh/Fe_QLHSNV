import React from "react";
import style from "../scss/Layout.module.scss";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import HeaderComponent from "../components/UserHeader";

export default function Layout({ Component }) {
    return (
        <div className={style.layout}>
            {/* <Sidebar /> */}
            <div className={style['layout-body']}>
                <HeaderComponent />
                <Component />
            </div>
        </div>
    );
}