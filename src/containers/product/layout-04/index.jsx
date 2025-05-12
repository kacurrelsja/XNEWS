// containers/product/layout-04/index.jsx
import PropTypes from "prop-types";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Product from "@components/product/layout-01";
import SectionTitle from "@components/section-title/layout-02";
import Anchor from "@ui/anchor";
import { SectionTitleType } from "@utils/types";
import NewsContextProvider from "src/context/NewsContext";

const NewsAreaContent = ({ space = 1, className, data: staticData, apiUrl }) => {
    const [fetchedData, setFetchedData] = useState(staticData);
    console.log(fetchedData);

    useEffect(() => {
        if (!apiUrl) return;
        (async () => {
            try {
                const res = await fetch(apiUrl);
                const json = await res.json();
                setFetchedData(json);
            } catch (err) {
                console.error("Failed to fetch news:", err);
            }
        })();
    }, [apiUrl]);

    const { section_title, products } = fetchedData || {};

    return (
        <div className={clsx("rn-new-items", space === 1 && "rn-section-gapTop", className)}>
            <div className="container">
                <div className="row mb--50 align-items-center">
                    {section_title && (
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <SectionTitle {...section_title} className="mb-0" />
                        </div>
                    )}
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt_mobile--15">
                        <div className="view-more-btn text-start text-sm-end">
                            <Anchor className="btn-transparent" path="/news">
                                VIEW ALL <i className="feather feather-arrow-right" />
                            </Anchor>
                        </div>
                    </div>
                </div>

                {products?.length > 0 && (
                    <div className="row g-5">
                        {products.map((news) => (
                            <div
                                key={news.id}
                                className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                data-sal="slide-up"
                                data-sal-delay="150"
                                data-sal-duration="800"
                            >
                                <Product
                                    title={news.title}
                                    slug={news.slug}
                                    likeCount={news.view}
                                    news_date={news.date}
                                    image={news.image}
                                    authors={news.authors}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

NewsAreaContent.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,
    data: PropTypes.shape({
        section_title: SectionTitleType,
        products: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                title: PropTypes.string.isRequired,
                slug: PropTypes.string.isRequired,
                image: PropTypes.shape({
                    src: PropTypes.string.isRequired,
                    alt: PropTypes.string,
                }).isRequired,
                view: PropTypes.number,
                date: PropTypes.string,
                authors: PropTypes.arrayOf(
                    PropTypes.shape({
                        name: PropTypes.string,
                        slug: PropTypes.string,
                        image: PropTypes.shape({
                            src: PropTypes.string,
                            alt: PropTypes.string,
                        }),
                    })
                ),
            })
        ),
    }),
    apiUrl: PropTypes.string,
};

const NewsArea = ({ space = 1, className, data, apiUrl }) => (
    <NewsContextProvider>
    <NewsAreaContent space={space} className={className} data={data} apiUrl={apiUrl} />
    </NewsContextProvider>
);

NewsArea.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,
    data: NewsAreaContent.propTypes.data,
    apiUrl: PropTypes.string,
};

export default NewsArea;
