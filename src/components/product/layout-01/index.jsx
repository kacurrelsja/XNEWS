// components/product/layout-01.jsx (Product for News)
import PropTypes from "prop-types";
import Image from "next/image";
import Anchor from "@ui/anchor";
import ClientAvatar from "@ui/client-avatar";
import clsx from "clsx";

// Use default parameters instead of defaultProps
const Product = ({
  title,
  slug,
  likeCount,
  news_date = "",     // default parameter
  image,
  authors = [],       // default parameter
}) => (
  <div className="product-style-one no-overlay">
    <div className="card-thumbnail">
      <Anchor path={`/news/${slug}`}>
      {image?.src && (
  <Image
    src={image.src}
    alt={image.alt || title}
    width={533}
    height={533}
  />
)}

      </Anchor>
      {/* only render date if you actually have one */}
      {news_date && <div className="news-date">{news_date}</div>}
    </div>

    <div className="product-share-wrapper">
      <div className="profile-share">
        {authors.map((author, idx) => (
          <ClientAvatar
            key={idx}
            slug={author.slug}
            name={author.name}
            image={author.image}
          />
        ))}
      </div>
    </div>

    <Anchor path={`/news/${slug}`}>
      <span className="product-name">{title}</span>
    </Anchor>

    <div className="news-views">{likeCount} views</div>
  </div>
);

Product.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  news_date: PropTypes.string,               // no longer required
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
  }).isRequired,
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      image: PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string,
      }).isRequired,
    })
  ).isRequired,
};

export default Product;
