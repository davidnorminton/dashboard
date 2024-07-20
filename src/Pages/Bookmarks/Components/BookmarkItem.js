/* global chrome */
export default function BookmarkItem({ folder }) {

    function getFavicon(url) {
        const favIconUrl = `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(url)}&size=16`;
        return favIconUrl
    }

    return (
        <li title={ folder.title }>
            <a href={ folder.url } target="_blank" rel="noreferrer">
                <img class="favicon" src={ getFavicon(folder.url) } alt="F" />
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
}