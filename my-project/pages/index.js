import { useState } from 'react';
import xml2js from 'xml2js';
import styles from "../styles/Home.module.scss";
import newsDummyImage from "../assets/images/newsDummy.png";
import Image from 'next/image';
import Header from '../components/Header';

export async function getStaticProps() {
  const res = await fetch('https://www.essentiallysports.com/feed/');
  const xmlData = await res.text();
  const jsonData = await xml2js.parseStringPromise(xmlData);
  const items = jsonData.rss.channel[0].item.map(item => {
    return {
      title: item.title[0],
      link: item.link[0],
      contentSnippet: item.description[0],
      pubDate: item.pubDate[0]
    }
  });

  return {
    props: {
      articles: items
    },
    revalidate: 60
  }
}

export default function Home({ articles }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = articles.filter(article => {
    return article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.contentSnippet.toLowerCase().includes(searchTerm.toLowerCase());
  });
  console.log(articles, 'article')
  return (
    <div className={styles.container}>
      <div className={styles.dividerLine} />
      <Header />
      <div className={styles.dividerLine} />
      <div className={styles.dividerLine} />
      <ul className={styles.articles}>
        {filteredArticles?.map((article) => (
          <li key={article.guid}>
            <a href={article.link} target="_blank">
              <Image src={newsDummyImage} />
              <p src={newsDummyImage} alt={article.title} />
              <h2>{article.title}</h2>
              <p>{article.pubDate}</p>
            </a>
            <div className={styles.dividerLine} />
          </li>

        ))}
      </ul>
      <div className={styles.dividerLine} />
    </div>
  );
}




