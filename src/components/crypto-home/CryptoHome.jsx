import React, { useContext, useEffect, useState } from "react";
import CoinContextProvider, { CoinContext } from "src/context/CoinContext";
import Link from "next/link";
import clsx from "clsx";
import SectionTitle from "@components/section-title/layout-02";

const CryptoHomeContent = () => {
    const { allCoin, currency, setCurrency } = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState([]);
    const [input, setInput] = useState("");

    const inputHandler = (event) => {
        const value = event.target.value;
        setInput(value);
        if (value === "") {
            setDisplayCoin(allCoin);
        }
    };

    const searchHandler = (event) => {
        event.preventDefault();
        const coins = allCoin.filter((item) =>
            item.name.toLowerCase().includes(input.toLowerCase())
        );
        setDisplayCoin(coins);
    };

    const currencyHandler = (event) => {
        const val = event.target.value;
        const options = {
            usd: { name: "usd", symbol: "$" },
            eur: { name: "eur", symbol: "€" }
        };
        setCurrency(options[val] || options.usd);
    };

    useEffect(() => {
        setDisplayCoin(allCoin);
    }, [allCoin]);

    return (
        <section
            className={clsx(
                "rn-top-top-seller-area nice-selector-transparent rn-section-gapTop"
            )}
        >
        <h3 className="title cr-title mb-0 sal-animate">Take a look at the highest trending cryptos</h3>
          <div className="row">
    <div className="col-12">
        <div className="top-crypto-grid d-flex flex-wrap justify-content-between">
            {displayCoin
                .sort((a, b) => a.market_cap_rank - b.market_cap_rank)
                .slice(0, 10)
                .map((item, index) => (
                    <div key={item.id} className="crypto-item position-relative text-center">
                        <span className="crypto-rank">{index + 1}</span>
                        <Link href={`/coin?id=${item.id}`} className="d-block text-decoration-none text-white">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="crypto-avatar rounded-circle mx-auto mb-2"
                            />
                            <h6 className="mb-0 fw-bold">{item.name}</h6>
                            <p className="mb-0 small text-muted">
                                {currency.symbol}{item.market_cap.toLocaleString()}
                            </p>
                        </Link>
                    </div>
                ))}
        </div>
    </div>
</div>

        </section>
    );
};

const CryptoHome = () => (
    <CoinContextProvider>
        <CryptoHomeContent />
    </CoinContextProvider>
);

export default CryptoHome;
