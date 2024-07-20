import BookmarkItem from './BookmarkItem';
import FolderTitle from './FolderTitle';

export default function SortedSection({ sections, hideFolderContents }) {
    return (
        <div>
            {
                (sections.folders.length > 0) ? (
                    <div>
                    {
                        sections.folders.map(
                            (folder) => (
                                <div>
                                    <FolderTitle 
                                        title={ folder.title }
                                        hideFolderContents={ hideFolderContents }
                                    />
                                    {
                                    (folder.bookmarks) 
                                        ? (
                                            <ul className={ sections.title.replace(' ', '-') + '_' + folder.title.replace(' ', '-') + '-list bookmarks-list' }>
                                            {
                                                folder.bookmarks.map((folder) => (<BookmarkItem folder={ folder } />))
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
        </div>
    )
}