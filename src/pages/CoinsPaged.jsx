import { Alert, Space, Typography } from "antd";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CoinsTable from "../components/CoinsTable.jsx";
import { useCoins } from "../hooks/useCoins.js";

const { Title, Text } = Typography;

const PAGE_SIZE = 20;
const TOTAL_COINS = 400;

function getPageFromSearchParams(searchParams) {
    const page = Number(searchParams.get("page"));

    if (!Number.isInteger(page) || page < 1) {
        return 1;
    }

    return page;
}

function CoinsPaged() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = getPageFromSearchParams(searchParams);
    const {
        data: coins = [],
        error,
        isError,
        isFetching,
        isLoading,
    } = useCoins({
        page,
        perPage: PAGE_SIZE,
        keepPrevious: true,
    });

    useEffect(() => {
        if (searchParams.get("page") !== String(page)) {
            setSearchParams({ page: String(page) }, { replace: true });
        }
    }, [page, searchParams, setSearchParams]);

    const pagination = {
        current: page,
        pageSize: PAGE_SIZE,
        total: TOTAL_COINS,
        showSizeChanger: false,
        onChange: (nextPage) => {
            setSearchParams({ page: String(nextPage) });
        },
    };

    return (
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <div>
                <Title level={2}>Paginated Cryptocurrency Markets</Title>
                <Text type="secondary">CoinGecko market data with server-side pagination.</Text>
            </div>

            {isError ? (
                <Alert
                    type="error"
                    showIcon
                    message="Unable to load market data"
                    description={error.message}
                />
            ) : null}

            <CoinsTable coins={coins} loading={isLoading || isFetching} pagination={pagination} />
        </Space>
    );
}

export default CoinsPaged;
