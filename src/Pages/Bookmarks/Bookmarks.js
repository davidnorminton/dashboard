/* global chrome */
import './css/Bookmarks.css';
import { useEffect, useState } from 'react';

export default function Bookmarks () {


    const [ bookmarks, setBookmarks ] = useState([]);

    useEffect(function () {

        const bookmarksFound = [];

        chrome.bookmarks.getTree(function (result) {
            if (result) {
                
                result.forEach(sections => {
                    
                    sections.children.forEach(function(topLevelFolder) {

                        const bookmarkSection = {
                            'title': topLevelFolder.title,
                            'folders' : [],
                            'unsorted': []
                        };

                        topLevelFolder.children.forEach(function (folders) {
                            console.log(folders)
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
                console.log(bookmarksFound)
                setBookmarks(bookmarksFound)

            }
        })

       // console.log(bookmarks)
    }, [])

    function getFavicon(url) {
        const favIconUrl = `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(url)}&size=16`;
        return favIconUrl
    }

    function hideFolderContents(folder) {
        console.log(folder)
        console.log(typeof folder)
        const contents = document.getElementsByClassName(folder);
        if (contents) {
            if (contents[0].classList.contains('hide')) {
                contents[0].classList.remove('hide')
            } else {
                contents[0].classList.add('hide')
            }
        }
    }

    return (
        <div className='page-bookmarks'>
            <h1>Bookmarks</h1>
            <div className='wrapper'>
                {
                    (bookmarks) ? (
                        bookmarks.map(
                            (sections) => (
                                <section>
                                    <h2>{ sections.title }</h2>
                                    { /** unsorted bookmark */ }
                                    {
                                        (sections.unsorted.length > 0) ? (
                                            <div>
                                                <h3 onClick={ () => hideFolderContents(sections.title.replace(' ', '-') + '-unsorted-list') }> 
                                                    <i class="fa-regular fa-folder bookmark-folder-icon"></i>
                                                    <span>Unsorted</span>
                                                </h3>
                                                <ul className={ sections.title.replace(' ', '-') + '-unsorted-list bookmarks-list'}>
                                                    {
                                                        sections.unsorted.map(
                                                            (folder) => (
                                                                <li>
                                                                    <a href={ folder.url }>
                                                                        <img class="favicon" src={ getFavicon(folder.url) } />
                                                                        <span>
                                                                        {
                                                                            (folder.title.length > 40) ?
                                                                            (
                                                                                <span>
                                                                                    { folder.title.substring(0, 40 ) + '...' }
                                                                                </span>

                                                                            ): (
                                                                                <span>
                                                                                    { folder.title }
                                                                                </span>
                                                                            )
                                                                        }                                                                        
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                            )
                                                        )
                                                    }
                                                </ul>
                                            </div>

                                        ) : ('')
                                    }
                                    { /** folders with bookmark */ }

{
                                        (sections.folders.length > 0) ? (
                                            <div>
                                            {
                                                sections.folders.map(
                                                    (folder) => (
                                                        <div>
                                                            <h3 onClick={ () => hideFolderContents(sections.title.replace(' ', '-') + '_' + folder.title.replace(' ', '-') + '-list') }>
                                                                <i class="fa-regular fa-folder bookmark-folder-icon"></i>
                                                                <span>{ folder.title }</span>
                                                            </h3>
                                                            {
                                                            (folder.bookmarks) 
                                                                ? (
                                                                    <ul className={ sections.title.replace(' ', '-') + '_' + folder.title.replace(' ', '-') + '-list bookmarks-list' }>
                                                                    {
                                                                        folder.bookmarks.map(
                                                                            (folder) => (
                                                                                <li title={ folder.title }>
                                                                                    <a href={ folder.url }>
                                                                                        <img class="favicon" src={ getFavicon(folder.url) } />
                                                                                        {
                                                                                            (folder.title.length > 40) ?
                                                                                            (
                                                                                                <span>
                                                                                                    { folder.title.substring(0, 40 ) + '...' }
                                                                                                </span>

                                                                                            ): (
                                                                                                <span>
                                                                                                    { folder.title }
                                                                                                </span>
                                                                                            )
                                                                                        }
                                                                                    </a>
                                                                                </li>
                                                                            )
                                                                        )
                                                                    }
                                                                    </ul>
                                                                ): ('')
                                                            }

                                                        </div>
                                                    )
                                                )
                                            }
                                            </div>

                                        ) : ('')
                                    }


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