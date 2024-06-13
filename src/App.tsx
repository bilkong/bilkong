import React from "react";
import { ConfigProvider } from "antd";
import Routers from "./router";
import zhCN from "antd/locale/zh_CN";
import "./App.css";

const App = () => {
    return (
        <ConfigProvider locale={zhCN}>
            <Routers />
        </ConfigProvider>
    );
};

export default App;
