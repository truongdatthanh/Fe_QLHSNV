import React from "react";
import style from "../scss/Layout.module.scss";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Layout({ Component }) {
    return (
        <div className={style.layout}>
            <Sidebar />
            <div className={style['layout-body']}>
                <Header />
                <Component />
            </div>
        </div>
    );
}