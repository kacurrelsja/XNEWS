import React from 'react'
import Wrapper from '@layout/wrapper'
import Header from '@layout/header/header-01'
import Footer from '@layout/footer/footer-01'
import NewsFeed from '@components/news-feed/NewsFeed'
import { useNewsContext, NewsProvider } from 'src/context/NewsContext';

function News() {
  return (
     <Wrapper>
        <Header/>
            <NewsFeed/>
        <Footer/>
      </Wrapper>
  )
}

export default News
