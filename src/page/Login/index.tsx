import {
  FacebookOutlined,
  GithubOutlined,
  InstagramOutlined,
  LockOutlined,
  MobileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";

import { Divider, Space, Tabs, message, theme } from "antd";
import type { CSSProperties } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginType = "phone" | "account";

const iconStyles: CSSProperties = {
  color: "rgba(0, 0, 0, 0.2)",
  fontSize: "18px",
  verticalAlign: "middle",
  cursor: "pointer",
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState<any>("phone");

  const { token } = theme.useToken();
  return (
    <ProConfigProvider dark>
      <div
        style={{
          backgroundColor: "white",
          height: "100vh",
        }}
      >
        <LoginFormPage
          backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
          // logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
          backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
          title="Login"
          containerStyle={{
            color: "white",
            backgroundColor: "rgba(0, 0, 0,0.65)",
            backdropFilter: "blur(4px)",
          }}
          subTitle=""
          submitter={{
            searchConfig: { submitText: "Login" },
            onSubmit: (data: any) => {
              navigate("dashboard");
            },
          }}
          actions={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Divider plain>
                <span
                  style={{
                    color: "#fff",
                    fontWeight: "normal",
                    fontSize: 14,
                  }}
                >
                  Another choice
                </span>
              </Divider>
              <Space align="center" size={24}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: 40,
                    width: 40,
                    border: "1px solid " + token.colorPrimaryBorder,
                    borderRadius: "50%",
                  }}
                >
                  <GithubOutlined style={{ ...iconStyles, color: "#fFF" }} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: 40,
                    width: 40,
                    border: "1px solid " + token.colorPrimaryBorder,
                    borderRadius: "50%",
                  }}
                >
                  <FacebookOutlined style={{ ...iconStyles, color: "#fff" }} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: 40,
                    width: 40,
                    border: "1px solid " + token.colorPrimaryBorder,
                    borderRadius: "50%",
                  }}
                >
                  <InstagramOutlined style={{ ...iconStyles, color: "#fff" }} />
                </div>
              </Space>
            </div>
          }
        >
          <Tabs
            style={{
              color: "white",
            }}
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          >
            <Tabs.TabPane key={"account"} tab={"Gmail"} />
            <Tabs.TabPane key={"phone"} tab={"Phone number"} />
          </Tabs>
          {loginType === "account" && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: "large",
                  prefix: (
                    <UserOutlined
                      style={{
                        color: "white",
                      }}
                      className={"prefixIcon"}
                    />
                  ),
                }}
                placeholder={"Email Address"}
                rules={[
                  {
                    required: true,
                    message: "Email address is required",
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: "large",
                  prefix: (
                    <LockOutlined
                      style={{
                        color: "white",
                      }}
                      className={"prefixIcon"}
                    />
                  ),
                }}
                placeholder={"Password"}
                rules={[
                  {
                    required: true,
                    message: "Password is required",
                  },
                ]}
              />
            </>
          )}
          {loginType === "phone" && (
            <>
              <ProFormText
                fieldProps={{
                  size: "large",
                  prefix: (
                    <MobileOutlined
                      style={{
                        color: "white",
                      }}
                      className={"prefixIcon"}
                    />
                  ),
                }}
                name="mobile"
                placeholder={"Phone number"}
                rules={[
                  {
                    required: true,
                    message: "Phone number is required",
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: "It must be a phone number",
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: "large",
                  prefix: (
                    <LockOutlined
                      style={{
                        color: "white",
                      }}
                      className={"prefixIcon"}
                    />
                  ),
                }}
                captchaProps={{
                  size: "large",
                }}
                placeholder={"Code"}
                captchaTextRender={(timing: any, count: any) => {
                  if (timing) {
                    return `${count} ${"Sending..."}`;
                  }
                  return "Send Code";
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: "Passwords is required",
                  },
                ]}
                onGetCaptcha={async () => {
                  message.success("Send success");
                }}
              />
            </>
          )}
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              Save password
            </ProFormCheckbox>
            <a
              style={{
                float: "right",
              }}
            >
              Forgot the password
            </a>
          </div>
        </LoginFormPage>
      </div>
    </ProConfigProvider>
  );
};
