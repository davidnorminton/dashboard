/* global chrome */
import './css/Bookmarks.css';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import BookmarksSearch from './Components/BookmarksSearch';
import UnsortedSection from './Components/UnsortedSection';
import SortedSection from './Components/SortedSection';
import SectionTitle from './Components/SectionTitle';



export default function Bookmarks () {

    const [ bookmarks, setBookmarks ] = useState([]);
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

            <div className='wrapper'>
                {
                    (bookmarks) ? (
                        bookmarks.map(
                            (sections) => (
                                <section>
                                    { /** Section title */ }
                                    <SectionTitle title={ section.title } hideFolderContents={ hideFolderContents } />

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