import React, { useState, useEffect } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setloading] = useState(true)
    const [totalResults, setTotalResults] = useState(0)

    useEffect(() => {
        async function componentDidMount() {
            props.setProgress(10)
            let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
            setloading(true)
            let response = await fetch(url);
            props.setProgress(30)
            let data = await response.json();
            props.setProgress(70)

            setArticles(data.articles)
            setPage(page + 1)
            setTotalResults(data.totalResults)
            setloading(false)
            props.setProgress(100)
        }
        componentDidMount()
        document.title = `${props.category} - NewsBuzz`
    }, [])

    const fetchMoreData = () => {
        setTimeout(async () => {
            let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
            setloading(true)
            let response = await fetch(url);
            let data = await response.json();

            setArticles(articles.concat(data.articles))
            setPage(page + 1)
            setloading(false)
        }, 1000);
    };

    return (
        <>
            <h1 className='text-center' style={{ margin: "5rem 0 2rem" }}>Top Headings {props.category === "general" ? "" : props.category}</h1>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={page !== 7}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row justify-content-between">
                        {articles.map((e) => {
                            return <div className="col-md-3 m-3" key={e.url}>
                                <NewsItems
                                    title={e.title ? e.title.slice(0, 45) : "No Title"}
                                    desc={e.description ? e.description.slice(0, 88) : "No Description"}
                                    imgUrl={e.urlToImage ? e.urlToImage : "https://www.reuters.com/resizer/v2/DGT2SKQZCRKDDDSTAAXUG3K2SY.jpg?auth=1bfe762dfa4f3a8cec4006cad9bf59c0a0103eb4b037d9ca584769ab9ac51884&height=1005&width=1920&quality=80&smart=true"}
                                    url={e.url} author={e.author} date={e.publishedAt} source={e.source.name} />
                            </div>
                        })}

                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

export default News

News.defaultProps = {
    country: "us",
    pageSize: 9,
    category: "General"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
}