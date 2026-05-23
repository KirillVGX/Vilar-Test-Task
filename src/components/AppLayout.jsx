import { Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { routes } from "../routes.jsx";

const { Header, Sider, Content, Footer } = Layout;

const menuItems = routes.map((r) => ({
    key: r.path,
    icon: r.icon,
    label: <Link to={r.path}>{r.label}</Link>,
}));

function AppLayout() {
    const { pathname } = useLocation();
    const {
        token: { borderRadiusLG, colorBgContainer, colorBgLayout },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: "100vh", background: colorBgLayout }}>
            <Header style={{ display: "flex", alignItems: "center" }}>
                <div
                    style={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: 600,
                        marginRight: 32,
                    }}
                >
                    Analytics Dashboard
                </div>
            </Header>
            <Layout>
                <Sider width={220} breakpoint="lg" collapsedWidth="0">
                    <Menu
                        mode="inline"
                        selectedKeys={[pathname]}
                        items={menuItems}
                        style={{ height: "100%", borderRight: 0 }}
                    />
                </Sider>
                <Layout style={{ padding: 24 }}>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
            <Footer style={{ textAlign: "center" }}>
                Analytics Dashboard {"\u00a9"}
                {new Date().getFullYear()}
            </Footer>
        </Layout>
    );
}

export default AppLayout;
