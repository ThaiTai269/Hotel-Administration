import { ConfigProvider } from "antd";
import "./App.css";
import { LoginPage } from "./page/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./page/Dashboard/Dashboard";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Montserrat",
          fontSize: 16,
        },
      }}
    >
      <div className="h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path=":dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ConfigProvider>
  );
}

export default App;
