import { Alert, Space, Typography } from "antd";
import CoinsTable from "../components/CoinsTable.jsx";
import { useCoins } from "../hooks/useCoins.js";

const { Title, Text } = Typography;

function Coins() {
    const { data: coins = [], error, isError, isFetching, isLoading } = useCoins();

    return (
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <div>
                <Title level={2}>Cryptocurrency Markets</Title>
                <Text type="secondary">Top 50 coins by market data from CoinGecko.</Text>
            </div>

            {isError ? (
                <Alert
                    type="error"
                    showIcon
                    message="Unable to load market data"
                    description={error.message}
                />
            ) : null}

            <CoinsTable coins={coins} loading={isLoading || isFetching} />
        </Space>
    );
}

export default Coins;
