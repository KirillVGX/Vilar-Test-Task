import { Space } from "antd";
import CoinsTable from "../components/CoinsTable.jsx";
import ErrorState from "../components/ui/ErrorState.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";
import { useCoins } from "../hooks/useCoins.js";

function Coins() {
    const { data: coins = [], error, isError, isFetching, isLoading } = useCoins();

    return (
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <PageHeader
                title="Cryptocurrency Markets"
                description="Top 50 coins by market data from CoinGecko."
            />

            {isError ? (
                <ErrorState
                    type="warning"
                    message="Unable to load market data"
                    description={error.message}
                />
            ) : null}

            <CoinsTable coins={coins} loading={isLoading || isFetching} />
        </Space>
    );
}

export default Coins;
