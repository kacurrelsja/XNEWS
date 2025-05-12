import axios from "axios";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import HeroArea from "@containers/hero/layout-01";
import CategoryArea from "@containers/category/layout-01";
import LiveExploreArea from "@containers/live-explore/layout-01";
import ServiceArea from "@containers/services/layout-01";
import NewsHome from "@components/news-home/NewsHome";
import CryptoHome from "@components/crypto-home/CryptoHome";

import productData from "../data/products.json";
import { normalizedData } from "@utils/methods";

// Format helper
const formatEsd = (esd) => {
    const raw = String(esd);
    if (!/^\d{14}$/.test(raw)) return "Unknown Time";
    return new Date(
        raw.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1-$2-$3T$4:$5:$6")
    ).toLocaleString();
};

const Home = ({ liveMatches, homepageContent }) => {
    const { t } = useTranslation("home");
    const content = normalizedData(homepageContent?.content || []);

    const newestData = productData
        .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
        .slice(0, 5);

    return (
        <Wrapper>
            <SEO pageTitle={t("page_title", { defaultValue: "Home " })} />
            <Header />
            <img className="back-img" src="images/back.png" alt="background" />
            <main id="main-content">
                <HeroArea data={{ ...content["hero-section"], product: productData[0] }} />
                <CategoryArea data={content["category-section"]} />
                <LiveExploreArea
                    data={{
                        section_title: content["live-explore-section"],
                        products: liveMatches,
                        title: content["catch_latest_score"]
                    }}
                    className="custom-live-explore-class"
                    space={2}
                />
                <ServiceArea data={content["service-section"]} />
                <NewsHome />
                <CryptoHome />
            </main>
            <Footer data={content["brand-section"]} space={3} />
        </Wrapper>
    );
};

export async function getServerSideProps({ locale }) {
    let liveMatches = [];
    let homepageContent = {};

    try {
        const today = new Date().toISOString().split("T")[0];
        const matchesUrl = `https://livescore6.p.rapidapi.com/matches/v2/list-by-date?Category=soccer&Date=${today}`;
        const headers = {
            "x-rapidapi-key": "fcc6cdc3b3mshd0eb8efb64aba6dp1eeb49jsn0790bb4191f8",
            "x-rapidapi-host": "livescore6.p.rapidapi.com",
        };

        const matchesResponse = await axios.get(matchesUrl, { headers });
        const stages = matchesResponse.data?.Stages || [];

        liveMatches = stages.flatMap((stage) =>
            (stage.Events || []).map((event) => ({
                title: `${event?.T1?.[0]?.Nm || "Unknown"} vs ${event?.T2?.[0]?.Nm || "Unknown"}`,
                subtitle: stage?.Snm || "Unknown League",
                status: event?.Eps || "N/A",
                score: `${event?.Tr1 ?? "-"} - ${event?.Tr2 ?? "-"}`,
                date: formatEsd(event?.Esd),
            }))
        );
    } catch (error) {
        console.error("Error fetching live matches:", error.message);
    }

    // Load translated home content from locale file
    const localeData = await import(`../data/languages/${locale}.json`);
    homepageContent = localeData.default;

    return {
        props: {
            ...(await serverSideTranslations(locale, ["home"])),
            liveMatches,
            homepageContent,
        },
    };
}

export default Home;
