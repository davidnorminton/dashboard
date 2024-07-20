/* global chrome */
import './css/Bookmarks.css';
import { useEffect } from 'react';

export default function Bookmarks () {

    // useEffect(function () {
    //     chrome.bookmarks.getChildren(id, function(children) {
    //         children.forEach(function(bookmark) { 
    //           console.debug(bookmark.title);
    //         });
    //      });
    // })

    return (
        <div className='page-bookmarks'>
            <h1>Bookmarks</h1>
        </div>
    )
}