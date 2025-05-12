import { useRouter } from 'next/router';
import { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import LineChart from '@components/line-chart/LineChart';
import CoinContextProvider, { CoinContext } from 'src/context/CoinContext';
import Wrapper from '@layout/wrapper';
import Header from '@layout/header/header-01';
import Footer from '@layout/footer/footer-01';

const CoinPageContent = () => {
    const router = useRouter();
    const { id } = router.query;
    const [coinData, setCoinData] = useState(null);
    const [historicalData, setHistoricalData] = useState(null);
    const { currency } = useContext(CoinContext);

    useEffect(() => {
        if (!id || !currency?.name) return;

        const fetchData = async () => {
            const headers = {
                accept: 'application/json',
                'x-cg-demo-api-key': 'CG-bF3sYpuF1L3TmzjGHGCRRDuT',
            };

            try {
                const coinRes = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
                    method: 'GET',
                    headers,
                });
                const coinJson = await coinRes.json();
                setCoinData(coinJson);
            } catch (err) {
                console.error('Error fetching coin data:', err);
            }

            try {
                const histRes = await fetch(
                    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency.name}&days=10`,
                    {
                        method: 'GET',
                        headers,
                    }
                );
                const histJson = await histRes.json();
                setHistoricalData(histJson);
            } catch (err) {
                console.error('Error fetching historical data:', err);
            }
        };

        fetchData();
    }, [id, currency?.name]);

    if (!coinData) return <p>Loading coin data...</p>;

    const marketData = coinData.market_data;

    return (
        <div className="coin">
            <div className="coin-name">
                {coinData.image?.large && (
                    <Image
                        src={coinData.image.large}
                        alt={coinData.name}
                        width={64}
                        height={64}
                    />
                )}
                <p>
                    <b>
                        {coinData.name} ({coinData.symbol?.toUpperCase()})
                    </b>
                </p>
            </div>

            <div className="coin-chart">
                <LineChart historicalData={historicalData} />
            </div>

            {marketData && (
                <div className="coinInfo">
                    <ul>
                        <li>Crypto Market Rank</li>
                        <li>{coinData.market_cap_rank}</li>
                    </ul>
                    <ul>
                        <li>Current Price</li>
                        <li>
                            {currency.symbol}{' '}
                            {marketData.current_price[currency.name]?.toLocaleString()}
                        </li>
                    </ul>
                    <ul>
                        <li>Market Cap</li>
                        <li>
                            {currency.symbol}{' '}
                            {marketData.market_cap[currency.name]?.toLocaleString()}
                        </li>
                    </ul>
                    <ul>
                        <li>24 Hour High</li>
                        <li>
                            {currency.symbol}{' '}
                            {marketData.high_24h[currency.name]?.toLocaleString()}
                        </li>
                    </ul>
                    <ul>
                        <li>24 Hour Low</li>
                        <li>
                            {currency.symbol}{' '}
                            {marketData.low_24h[currency.name]?.toLocaleString()}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

const CoinPage = () => (
    <Wrapper>
    <Header/>
    <CoinContextProvider>
        <CoinPageContent />
    </CoinContextProvider>
    <Footer/>
    </Wrapper>
);

export default CoinPage;
