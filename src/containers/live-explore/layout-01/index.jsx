import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitle from "@components/section-title/layout-01";
import Slider, { SliderItem } from "@ui/slider";
import LiveScoreCard from "@components/live-score-card";

const SliderOptions = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
        {
            breakpoint: 1399,
            settings: { slidesToShow: 3, slidesToScroll: 1 },
        },
        {
            breakpoint: 1200,
            settings: { slidesToShow: 2, slidesToScroll: 1 },
        },
        {
            breakpoint: 768,
            settings: { slidesToShow: 1, slidesToScroll: 1, dots: true, arrows: false },
        },
    ],
};

const LiveExploreArea = ({ data, className, space = 1 }) => {
    const { section_title, products: matches } = data || {};

    return (
        <div className={clsx("rn-live-bidding-area", space === 1 && "rn-section-gapTop", className)}>
            <div className="container">
                {section_title && (
                    <div className="row mb--50">
                        <div className="col-lg-12">
                            <SectionTitle {...section_title} />
                        </div>
                    </div>
                )}

                {Array.isArray(matches) && matches.length > 0 ? (
                    <div className="row g-5">
                        <h2 className="rn-service-area">Catch the latest live scores!</h2>
                        <div className="col-lg-12">
                            <Slider options={SliderOptions} className="banner-one-slick slick-arrow-style-one"> 
                                {matches.map((match, idx) => (
                                    <SliderItem key={idx} className="single-slide-product">
                                        <LiveScoreCard match={match} />
                                    </SliderItem>
                                ))} 
                            </Slider>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">No live scores available.</div>
                )}
            </div>
        </div>
    );
};

LiveExploreArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1, 2]),
    data: PropTypes.shape({
        section_title: PropTypes.object,
        products: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                subtitle: PropTypes.string,
                status: PropTypes.string,
                score: PropTypes.string,
                date: PropTypes.string,
            })
        ),
    }).isRequired,
};

export default LiveExploreArea;
