import React from 'react'

function NewsHomeCard({ article }) {
  return (
    <div className="col-5 col-lg-4 col-md-6 col-sm-6 col-12 sal-animate">
      <div className="product-style-one">
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="card-thumbnail"
          />
        )}
        <div>
          <h3 className="product-name">{article.title}</h3>
          <p className="latest-bid">
            {(article.description?.slice(0, 50) || 'No description available') +
              (article.description?.length > 50 ? '...' : '')}
          </p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#3b82f6', textDecoration: 'underline' }}
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  )
}

export default NewsHomeCard
