import React from 'react'
import { useNewsContext, NewsProvider } from 'src/context/NewsContext'
import NewsHomeCard from '@components/news-home-card/NewsHomeCard'

function NewsHomeContent() {
  const { articles, loading, error } = useNewsContext()

  const latestArticles = articles.slice(0, 5)

  return (
    <div className='rn-new-items rn-section-gapTop'>
        <div className='container'>
        
            <div className="row mb--50 align-items-center">
                <div className='col-lg-6 col-md-6 col-sm-6 col-12'>
                <h3 className='title mb-0 sal-animate'>Latest Sports News</h3>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-6 col-12 mt_mobile--15'>
                <div className='view-more-btn text-start text-sm-end sal-animate'>
                <a href='/news' className="btn-transparent view">VIEW ALL</a>
                </div>
                
                </div>
                
                

            </div>
        
        {loading ? (
            <p>Loading...</p>
        ) : error ? (
            <p>Error loading news: {error}</p>
        ) : (
            <div className='row g-5'>
            {latestArticles.map((article, index) => (
                <NewsHomeCard key={index} article={article} />
            ))}
            </div>
        )}
        </div>
    </div>
  )
}

function NewsHome() {
  return (
    <NewsProvider>
      <NewsHomeContent />
    </NewsProvider>
  )
}

export default NewsHome
