// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect, useState } from "react"
import css from "./App.module.css"
import ArticleList from '../Article/ArticleList';
import SearchForm from "../../SearchForm/SearchForm";
import { fetchArticles } from "../../articles-api";
// import { fetchArticles } from "../../articles-api";
// import axios from 'axios';

export default function App() {

  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);


  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(999);

  useEffect(() => {
    if (topic === "") {
      return;
    }


    async function getArticles() {
      try {
        setloading(true);
        setError(false);
        const response = await fetchArticles(topic, page);
        setArticles((prevState) => [...prevState, ...response.articles]);
        setTotalPages(response.totalPages);
      } catch {
        setError(true);
      } finally {
        setloading(false);
      }
      console.log(topic, page);
    }
    getArticles();

    
   }, [topic, page]);

  const handleSearch = (newTopic) => { 
    setTopic(newTopic);
    setPage(1);
    setArticles([]);
  };
  const handleLoadMore = () => {
    setPage(page + 1);
  }; 
  

  return (
    <div className={css.container}>
      <h1>HTTP reguests in React</h1>
      <SearchForm onSearch={handleSearch}/>
      {articles.length > 0 && <ArticleList items={articles} />}
      { page >= totalPages && <b>END OF COLLECTION</b>}
       {loading && <b>LOADING...</b>}
       {error && <b>ERROR</b>}
      {articles.length > 0 && !loading && <button onClick={handleLoadMore}>Load more</button>}
    </div>
  )
}


// useEffect(() => { 
//     async function getArticels() {
//       try {
//         setloading(true);
//         setArticles([]);
//         setError(false);
//         const fetchedArticles = await fetchArticles;
//         setArticles(fetchedArticles);
//       } catch {
//         setError(true);
//       } finally {
//         setloading(false);
//       }
//     }
//     getArticels();
//   }, []);