import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import AboutArea from "@containers/about/layout-02";
import QuoteArea from "@containers/quote-area";
import CTAArea from "@containers/cta";
import { normalizedData } from "@utils/methods";
import { getAllPosts } from "../lib/api";
import i18n from "../i18n";

// Dynamically import content based on the selected language
import enContent from "../data/innerpages/about_en.json";
import itContent from "../data/innerpages/about_it.json";



const About = ({ posts, language }) => {
    // Choose content based on language
    const content = normalizedData(language === 'it' ? itContent?.content : enContent?.content || []);

    return (
        <Wrapper>
            <SEO pageTitle="About" />
            <Header />
            <main id="main-content">
            <img className="back5" src={"images/back5.png"}/>
                <AboutArea data={content["about-section"]} /> 
                <QuoteArea data={content["quote-section"]} /> 
                <img className="back6" src={"images/back5.png"}/>
                <CTAArea data={content["cta-section"]} />
            </main>
            <Footer />
        </Wrapper>
    );
};

// Fetch the language data and posts for static generation
export async function getStaticProps({ locale = "it" }) {
    const posts = getAllPosts([
        "title",
        "date",
        "slug",
        "image",
        "category",
        "timeToRead",
    ]);

    return {
        props: {
            posts: posts.slice(0, 4),
            language: locale, // Pass the current language (either "en" or "it")
            className: "template-color-1",
        },
    };
}

About.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({})),
    language: PropTypes.string.isRequired, // Add language prop
};

export default About;
