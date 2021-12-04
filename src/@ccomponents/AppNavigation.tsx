import { DatabaseOutlined, DollarOutlined, HomeOutlined, PartitionOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';


export default function AppNavigation() {
    // const location = useLocation();

    // const getMatchedKey = (location:Location): string => {
    //     const route = Routes.find(route => matchPath(location.pathname, route));
    //     return route?.menuKey || '';
    // }

    return (
        <Menu mode='inline' defaultOpenKeys={["db", "tasks", "billing", "config"]} selectedKeys={[/*getMatchedKey(location)*/]}>
            <Menu.Item key="home" title="Home" icon={<HomeOutlined />}>
                <NavLink to="/home/">Home</NavLink>
            </Menu.Item>

            <Menu.SubMenu key="db" title="Databases" icon={<DatabaseOutlined />} >
                <Menu.ItemGroup key="services" title="Services">
                    <Menu.Item key="showAllServices">
                        <NavLink to="/services/">Show all</NavLink>
                    </Menu.Item>
                </Menu.ItemGroup>
            </Menu.SubMenu>

            <Menu.SubMenu key="tasks" title="Tasks" icon={<PartitionOutlined />} >
                <Menu.Item key="showAllTasks">
                    <NavLink to="/tasks/">Show all</NavLink>
                </Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu key="billing" title="Billing" icon={<DollarOutlined />} >
                <Menu.Item key="unterminated">
                    <NavLink to="/billing/unterminated/">Not terminated</NavLink>
                </Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu key="config" title="Configuration" icon={<SettingOutlined />} >
            <Menu.Item key="availabilities">
                    <NavLink to="/availabilities/">Availabilities</NavLink>
                </Menu.Item>
                <Menu.Item key="aivenPlans">
                    <NavLink to="/aivenPlans/">Aiven Plans</NavLink>
                </Menu.Item>
            </Menu.SubMenu>

        </Menu>
    );
}