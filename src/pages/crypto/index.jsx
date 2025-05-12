import React, { useContext, useEffect, useState } from 'react';
import Wrapper from '@layout/wrapper';
import Header from '@layout/header/header-01';
import CoinContextProvider, { CoinContext } from 'src/context/CoinContext';
import Footer from '@layout/footer/footer-01'; 
import Link from 'next/link';

const CryptoContent = () => {
    const { allCoin, currency, setCurrency } = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState([]);
    const [input, setInput] = useState('');

    // Handle input typing
    const inputHandler = (event) => {
        const value = event.target.value;
        setInput(value);
        if (value === "") {
            setDisplayCoin(allCoin);
        }
    };

    // Handle search submit
    const searchHandler = (event) => {
        event.preventDefault();
        const coins = allCoin.filter((item) =>
            item.name.toLowerCase().includes(input.toLowerCase())
        );
        setDisplayCoin(coins);
    };

    // Handle currency change
    const currencyHandler = (event) => {
        switch (event.target.value) {
            case "usd":
                setCurrency({ name: "usd", symbol: "$" });
                break;
            case "eur":
                setCurrency({ name: "eur", symbol: "€" });
                break;
            default:
                setCurrency({ name: "usd", symbol: "$" });
        }
    };

    // Sync display coins with all coins
    useEffect(() => {
        setDisplayCoin(allCoin);
    }, [allCoin]);

    return (
        <main className="crypto-page">
        <img className='background-image2' src="/images/back.png"/>
        <img className='background-image3' src="/images/back2.png"/>
            <section className="crypto-hero text-center py-10">
                <div className="hero">
                    <h1 className="title">Monitor <br /> Crypto Marketplace</h1>
                    <p className="text-lg mb-6">
                        Take a look at the real-time changes made in the cryptocurrency marketplace.
                    </p>
                    <form onSubmit={searchHandler} className="flex justify-center items-center gap-2">
                        <input
                            onChange={inputHandler}
                            list="coinlist"
                            type="text"
                            placeholder="Search Crypto"
                            value={input}
                            className="px-4 mb-6 py-2 border border-gray-300 rounded large-mobile-blog-search"
                        />
                        <datalist id="coinlist">
                            {allCoin.map((item) => (
                                <option key={item.id} value={item.name} />
                            ))}
                        </datalist>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded"
                        >
                            Search
                        </button>
                    </form>
                    <select onChange={currencyHandler} className="mt-2 px-3 py-2 border rounded">
                        <option value="eur">EUR €</option>
                        <option value="usd">USD $</option>
                    </select>
                </div>

                <div className="crypto-table mt-8">
                    <div className="table-layout font-semibold border-b pb-2 mb-2">
                        <p>#</p>
                        <p>Coins</p>
                        <p>Price</p>
                        <p className="text-center">24H Change</p>
                        <p className="market-cap">Market Cap</p>
                    </div>
                    {displayCoin.slice(0, 10).map((item) => (
                        <Link href={`/coin?id=${item.id}`} className="table-layout" key={item.id}>

                            <p>{item.market_cap_rank}</p>
                            <div className="flex items-center gap-2">
                                <img src={item.image} alt={item.name} className="w-6 h-6" />
                                <p>{item.name} - {item.symbol.toUpperCase()}</p>
                            </div>
                            <p>{currency.symbol}{item.current_price.toLocaleString()}</p>
                            <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
                                {(item.price_change_percentage_24h || 0).toFixed(2)}%
                            </p>
                            <p className="market-cap">{currency.symbol}{item.market_cap.toLocaleString()}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
};

const Crypto = () => (
    <Wrapper>
        <Header />
        <CoinContextProvider>
            <CryptoContent />
        </CoinContextProvider>  
        <Footer />
    </Wrapper>
);

export default Crypto;
