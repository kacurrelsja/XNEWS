/* eslint-disable no-console */
import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Web3 from "web3";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import i18n from "src/i18n";

import Logo from "@components/logo";
import MainMenu from "@components/menu/main-menu";
import MobileMenu from "@components/menu/mobile-menu";
import ColorSwitcher from "@components/color-switcher";
import BurgerButton from "@ui/burger-button";

import { useOffcanvas, useSticky, useFlyoutSearch } from "@hooks";
import headerData from "../../../data/general/header-01.json";
import menuData from "../../../data/general/menu-01.json";

const Header = ({ className }) => {
    const sticky = useSticky();
    const { offcanvas, offcanvasHandler } = useOffcanvas();
    const { t } = useTranslation();
    const router = useRouter();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [ethBalance, setEthBalance] = useState("");

    const detectCurrentProvider = () => {
        if (window.ethereum) return window.ethereum;
        if (window.web3) return window.web3.currentProvider;
        console.log("Non-ethereum browser detected. Please install Metamask.");
        return null;
    };

    const onConnect = async () => {
        try {
            const provider = detectCurrentProvider();
            if (provider) {
                await provider.request({ method: "eth_requestAccounts" });
                const web3 = new Web3(provider);
                const accounts = await web3.eth.getAccounts();
                const balance = await web3.eth.getBalance(accounts[0]);
                setEthBalance(balance);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onDisconnect = () => {
        setIsAuthenticated(false);
        setEthBalance("");
    };

    const handleLanguageChange = (e) => {
        const newLocale = e.target.value.toLowerCase();
        i18n.changeLanguage(newLocale);
        router.push(router.asPath, router.asPath, { locale: newLocale });
    };

    return (
        <>
            <header
                className={clsx(
                    "rn-header haeder-default black-logo-version header--fixed header--sticky",
                    sticky && "sticky",
                    className
                )}
            >
                <div className="container">
                    <div className="header-inner">
                        <div className="header-left">
                            <Logo logo={headerData.logo} />
                            <div className="mainmenu-wrapper">
                                <nav
                                    id="sideNav"
                                    className="mainmenu-nav d-none d-xl-block"
                                >
                                    <MainMenu menu={menuData} />
                                </nav>
                            </div>
                        </div>
                        <div className="header-right">
                            <div className="setting-option mobile-menu-bar d-block d-xl-none">
                                <div className="hamberger">
                                    <BurgerButton onClick={offcanvasHandler} />
                                </div>
                            </div>

                            <div className="setting-option language-switcher">
                                <select
                                    onChange={handleLanguageChange}
                                    value={i18n.language}
                                    aria-label={t("language_select_label")}
                                >
                                    <option value="en">{t("en")}</option>
                                    <option value="it">{t("it")}</option>
                                </select>
                            </div>

                            <div
                                id="my_switcher"
                                className="setting-option my_switcher"
                            >
                                <ColorSwitcher />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <MobileMenu
                isOpen={offcanvas}
                onClick={offcanvasHandler}
                menu={menuData}
                logo={headerData.logo}
            />
        </>
    );
};

Header.propTypes = {
    className: PropTypes.string,
};

export default Header;
