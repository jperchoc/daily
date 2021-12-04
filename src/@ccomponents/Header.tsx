
import { Layout, Menu } from "antd";

function Header(props: { fixed?: boolean }) {
        return (
        <Layout.Header style={props.fixed ? { position: 'fixed', zIndex: 1000, width: '100%' } : undefined}>
            <div className="logo">
                {/* <Link to="/home/">
                    <img className="home-logo" src={logo} alt="EU" />
                    <span className="text-logo" style={{ color: "#9b9b9c", fontWeight: 'bold' }}>Cloud Databases</span>
                </Link> */}
            </div>
            <Menu mode='horizontal' theme="dark" className="header-menu" style={{ float: 'right', alignItems: 'center' }}>
                <Menu.Item key="regions">
                    {/* <Dropdown className="region-link" overlay={dropdownMenu} >
                        <div>
                            <img className="region" alt={props.region} src={flagFor(props.region)} />
                            <DownOutlined />
                        </div>
                    </Dropdown> */}
                </Menu.Item>
            </Menu>
        </Layout.Header>
    );
}

export default Header;