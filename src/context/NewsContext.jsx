// src/context/NewsContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const NewsContext = createContext();

export const useNewsContext = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
  const API_KEY = "cb17c6709b1a439284f6b3fbd0268e64";
  const BASE_URL = "https://newsapi.org/v2/";

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/top-headlines?category=sports`, {
        params: {
          apiKey: API_KEY,
          country: "us",
        },
      });
      setArticles(response.data.articles);
    } catch (error) {
      setError("Could not fetch the news, please try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <NewsContext.Provider value={{ articles, loading, error, fetchNews }}>
      {children}
    </NewsContext.Provider>
  );
};

export { NewsContext };
