import {Layout} from 'antd';
import React from "react";
import InputBlock from "./InputBlock";
import './InputBlock.css';

const {Footer} = Layout;

export default function LayoutComponent(props) {
    return (
        <Layout className="layout">

            <div style={{height: "calc(100vh - 55px)"}}>
                <div className="Center-Container">
                    <div className="Absolute-Center">
                        <InputBlock/>
                    </div>
                </div>
            </div>
            <Footer style={{textAlign: 'center'}}>Made by Taiberium</Footer>
        </Layout>
    );
}