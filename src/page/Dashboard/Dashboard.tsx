import {
  AlertOutlined,
  DiffOutlined,
  FundOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Layout, Menu, theme } from "antd";
import { useState } from "react";
import logo from "../../assets/logo.png";
import { ActualData } from "../ActualData";


const { Header, Sider, Content } = Layout;

export const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [tab, setTab] = useState<String>("1");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleItemSelect = (key: any) => {
    setTab(key);
    // console.log("Clicked item key:", key);
  };

  return (
    <div className="h-full">
      <Layout className="h-full">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="dark"
          width={"300px"}
        >
          <div className="min-h-[60px] flex items-center justify-center font-semibold">
            <img src={logo} className="w-[80px] h-[50px]" />
            {collapsed === false && (
              <span className="text-white">Hotel Administration</span>
            )}
          </div>

          <Menu
            className="mt-[20px]"
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onSelect={handleItemSelect}
          >
            <Menu.Item
              key={1}
              className="font-semibold"
              icon={<DiffOutlined />}
            >
              Actual Data
            </Menu.Item>
            <Menu.Item key={2} icon={<AlertOutlined />}>
              Reservation Forecast
            </Menu.Item>
            <Menu.Item key={3} icon={<FundOutlined />}>
              Period Detail
            </Menu.Item>
          </Menu>
          <div className="bottom-px">lala</div>
        </Sider>
        <Layout>
          <Header
            style={{ padding: 0, background: colorBgContainer }}
            className="flex justify-between"
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="w-3/5 h-4/5">
              <Input
                width={"300px"}
                placeholder="Search"
                prefix={<SearchOutlined />}
              />
            </div>

            <div className="px-10 font-semibold">
              Welcome to Hotel Administration
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <ActualData />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
