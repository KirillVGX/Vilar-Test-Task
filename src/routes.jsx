import { DollarOutlined, FundOutlined, HomeOutlined } from "@ant-design/icons";
import Home from "./pages/Home.jsx";
import Coins from "./pages/Coins.jsx";
import CoinsPaged from "./pages/CoinsPaged.jsx";

export const routes = [
    { path: "/", label: "Home", icon: <HomeOutlined />, element: <Home /> },
    { path: "/coins", label: "Coins", icon: <DollarOutlined />, element: <Coins /> },
    {
        path: "/coins-paged",
        label: "Coins Paged",
        icon: <FundOutlined />,
        element: <CoinsPaged />,
    },
];
