import React from 'react'

const NewsItems = (props) => {
    let { title, desc, imgUrl, url, author, date, source } = props;
    return (
        <div>
            <div className="card">
                <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ zIndex: "1", left: "15%" }} >
                    {source}
                </span>
                <img src={imgUrl} className="card-img-top h-75" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{desc}...</p>
                    <p class="card-text"><small class="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()} </small></p>
                    <a href={url} target='_blank' className="btn btn-sm btn-primary">Read more</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItems