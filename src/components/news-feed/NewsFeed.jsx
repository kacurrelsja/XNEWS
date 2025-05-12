import React, { useState } from 'react'
import { useNewsContext } from 'src/context/NewsContext'
import NewsCard from 'src/components/news-card/NewsCard'
import { NewsProvider } from 'src/context/NewsContext'
import HeroArea from "@containers/hero/layout-14"
import en from "../../data/languages/en.json"
import it from "../../data/languages/it.json"
import { useRouter } from 'next/router' // ✅ Ensure this import exists
import { normalizedData } from '@utils/methods'

function NewsFeedContent() {
  const { articles, loading, error } = useNewsContext()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // 🌐 Detect current language from route or locale
  const { locale } = useRouter()
  const languageData = locale === 'it' ? it : en

  // ✅ Normalize the content section from the selected language
  const content = normalizedData(languageData.content || {})

  const totalPages = Math.ceil(articles.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentArticles = articles.slice(startIndex, startIndex + itemsPerPage)

  return (
     
    
    
    <div className='news-feed container'> 
      

      {/* 🔷 Introductory Description */}
      <div className="intro-section text-center my-5">
        <h1 className="mb-3">Sports News</h1>
        <p className="text-muted">
          Welcome to your daily dose of sports news, where every click brings you closer to the action.
          Our curated feed delivers the latest updates from the world of sports, covering everything from match results and player updates to betting odds and breaking headlines.
          Whether you're a casual fan or a seasoned bettor, staying informed gives you an edge—and we're here to keep you ahead.
          Each article is carefully selected to ensure relevance, accuracy, and real-time insight.
          Dive into the stories shaping the world of sports and make smarter decisions, both on and off the field.
        </p>
      </div>

      {/* 🔄 News Listing */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading news: {error}</p>
      ) : (
        <>
          <div className='row'>
            {currentArticles.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>

          {/* 🔁 Pagination */}
          <div className="pagination mt-4 d-flex justify-content-center gap-3">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn btn-outline-primary"
            >
              Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn btn-outline-primary"
            >
              Next
            </button>
          </div>

          {/* 🔻 Closing Description */}
          <div className="footer-description text-center my-5">
            <h4 className="mb-3">Stay Ahead with Real-Time Updates</h4>
            <p className="text-muted">
              Knowledge is power—especially in the fast-paced world of sports.
              Our news feed is updated regularly to ensure you're never out of the loop when it comes to crucial updates that impact betting, team dynamics, or fantasy league strategies.
              With each visit, you're not just catching up; you're gaining a competitive advantage.
              Be the first to know about injuries, lineup changes, and major announcements that could change the game.
              Trust our feed to keep your sports IQ as sharp and up-to-date as possible.
            </p>
          </div>
        </>
      )}
    </div>
  )
}

function NewsFeed() {
  return (
    <NewsProvider>
      <NewsFeedContent />
    </NewsProvider>
  )
}

export default NewsFeed
