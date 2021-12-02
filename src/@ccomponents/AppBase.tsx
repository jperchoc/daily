import { useState } from "react";
import { Dropdown, Layout, Menu } from "antd";
import Header from './Header';
import AppNavigation from "./AppNavigation";

export function AppBase(props: { fixed?: boolean, children?: React.ReactNode }) {

    let [collapsed, setCollapsed] = useState(false)

    return (
        <Layout style={{height: '100vh'}}>
            <Header fixed={props.fixed} />
            <Layout style={props.fixed ? { marginTop: 64 } : undefined}>
                <Layout.Sider
                    style={props.fixed ? { zIndex: 1000, position: "fixed", overflow: "auto", left: 0, height: "100vh" } : undefined}
                    width="200px" theme='light' collapsed={collapsed} collapsible onCollapse={setCollapsed} >
                    <AppNavigation />
                </Layout.Sider>
                <Layout className="inner-layout" style={props.fixed ? { marginLeft: collapsed ? 80 : 200 } : undefined}>
                    {props.children}
                </Layout>
            </Layout>
            <Layout.Footer>
                <div style={{ textAlign: 'center' }}>Cloud Databases control panel ©2021</div>
            </Layout.Footer>
        </Layout>
    );

}