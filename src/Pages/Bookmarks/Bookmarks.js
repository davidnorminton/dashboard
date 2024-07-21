/* global chrome */
import './css/Bookmarks.css';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import BookmarksSearch from './Components/BookmarksSearch';
import UnsortedSection from './Components/UnsortedSection';
import SortedSection from './Components/SortedSection';
import SectionTitle from './Components/SectionTitle';
import RecentlyViewed from './Components/RecentlyViewed';


export default function Bookmarks () {

    const [ bookmarks, setBookmarks ] = useState([]);
    const [ numberOfItemsRecentlyViewed, setNumberOfItemsRecentlyViewed ] = useState(6)
    const params = useParams();
    const query = params.id;

    useEffect(function () {

        console.log('query: ' + query)
        chrome.bookmarks.getTree(function (result) {
            sortBookmarks(result);
        });

    }, []);

    function hideFolderContents(folder) {
        const contents = document.getElementsByClassName(folder);
        if (contents.length > 0) {
            if (contents[0].classList.contains('hide')) {
                contents[0].classList.remove('hide')
            } else {
                contents[0].classList.add('hide')
            }
        }
    }

    function getFavicon(url) {
        const favIconUrl = `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(url)}&size=16`;
        return favIconUrl
    }

    function sortBookmarks(result) {
        const bookmarksFound = [];

        if (result) {
                
            result.forEach(sections => {
                
                sections.children.forEach(function(topLevelFolder) {

                    const bookmarkSection = {
                        'title': topLevelFolder.title,
                        'folders' : [],
                        'unsorted': []
                    };

                    topLevelFolder.children.forEach(function (folders) {
                        if (!folders.children) {
                            bookmarkSection.unsorted.push(folders)
                        } else {
                            const tmp = {
                                title: folders.title,
                                bookmarks: []
                            }

                            folders.children.forEach(function (child) {
                                tmp.bookmarks.push(child)
                            });

                            bookmarkSection.folders.push(tmp);
                        }
                        
                    });

                    bookmarksFound.push(bookmarkSection);
                });

            });

            setBookmarks(bookmarksFound)
        }
    }

    return (
        <div className='page-bookmarks'>

            {/** Bookmark search **/}
            <BookmarksSearch />

            {/** Recently Viewed Bookmarks */}
            <RecentlyViewed numberToList={ numberOfItemsRecentlyViewed } getFavicon={ getFavicon } />

            <div className='wrapper'>
                {
                    (bookmarks) ? (
                        bookmarks.map(
                            (sections) => (
                                <section>
                                    { /** Section title */ }
                                    <SectionTitle title={ sections.title } hideFolderContents={ hideFolderContents } />

                                    { /** unsorted bookmark */ }
                                    <UnsortedSection sections={ sections } hideFolderContents={ hideFolderContents } />

                                    { /** folders with bookmark */ }
                                    <SortedSection sections={ sections } hideFolderContents={ hideFolderContents } />

                                </section>
                            )
                        )
                    ) : (
                        <h2>No bookmarks found </h2>
                    )
                }
            </div>
        </div>
    )
}