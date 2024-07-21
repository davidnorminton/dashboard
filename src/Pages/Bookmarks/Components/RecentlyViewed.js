/* global chrome */
import { useEffect, useState } from "react";
import '../css/RecentlyAdded.css';

export default function RecentlyViewed({ numberToList, getFavicon }) {

    const [ viewedList, setViewedList ] = useState([]);
    const [ count, setCount ] = useState(10)

    useEffect(function () {
        setCount(count)
        const tmp = [];
        chrome.bookmarks.getRecent(numberToList).then(function (bookmark) {
            console.log('get bookmark')
            //console.log(bookmark)
            bookmark.map((item) => {
                tmp.push(item)
            });
        });

        setViewedList(tmp);
        console.log(viewedList)
        console.log(viewedList.length)
        
        
    }, [numberToList]);

    return (
        <div className="recently-added">
            <h2>Recentlly Added</h2>
            <ul>
                {
                    viewedList.map(
                        (bookmark) => (
                            <li>
                                <a href={ bookmark.url } target="_blank" rel="noreferrer">
                                    <img class="favicon" src={ getFavicon(bookmark.url) } alt="F" />

                                    { bookmark.title }
                                </a>
                            </li>
                        )
                    )
                }
            </ul>
        </div>
        
    )
}