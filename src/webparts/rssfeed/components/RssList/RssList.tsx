import * as React from 'react';
import './rsslist.scss';


const RssList = (props: any) => {
    // console.log('props', props)
    function extractContent(s) {
        var span = document.createElement('span');
        span.innerHTML = s;
        return span.textContent || span.innerText;
      }
    return (
        <li className="rssList">
            <h1><a href={props.feed.FeedURL} target="_blank">{props.feed.FeedTitle}</a></h1>
            <p className="posted">Posted:<span>{props.feed.FeedPublished}</span></p>
            <div className="frontDescription">{extractContent(props.feed.FeedSummery)} </div>
            <div className="quickLinks">
            
            </div>
        </li>
    );
}

export default RssList;